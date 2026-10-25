import { Destination, TripPreferences, RecommendationMatch } from '../types/trip';
import { calculateBudgetBreakdown, validateTripPreferences } from './budgetCalculator';
import { estimateTransportCost, isTransportExceedingBudget } from './transitEstimator';

import { getDestinationNomadScore } from './nomadScoreEngine';

export type SortOption = 'match' | 'nomad-score' | 'price-asc' | 'price-desc' | 'rating';

/**
 * Calculates a duration compatibility score (0 - 100) based on how well the
 * user's planned duration aligns with the destination's recommended stay window.
 */
export function calculateDurationScore(
  durationDays: number,
  recommended: { min: number; max: number }
): { score: number; reason: string } {
  const { min, max } = recommended;

  if (durationDays >= min && durationDays <= max) {
    return {
      score: 100,
      reason: `Ideal for your ${durationDays}-day trip schedule (${min}–${max} days recommended)`,
    };
  }

  if (durationDays < min) {
    const diff = min - durationDays;
    const score = Math.max(25, 100 - diff * 20);
    return {
      score,
      reason: `Best enjoyed with ${min}+ days due to travel distance (currently ${durationDays} days planned)`,
    };
  }

  // durationDays > max
  const diff = durationDays - max;
  const score = Math.max(50, 100 - diff * 8);
  return {
    score,
    reason: `Recommended for ${min}–${max} days; great for a relaxed in-depth visit`,
  };
}

/**
 * Rule-based multi-factor destination recommendation scorer.
 * Evaluates interest alignment, budget feasibility, transit costs from origin,
 * student/hostel compatibility, and trip duration suitability.
 */
export function scoreDestination(
  destination: Destination,
  preferences: TripPreferences
): RecommendationMatch {
  const safePrefs = validateTripPreferences(preferences);
  const breakdown = calculateBudgetBreakdown(destination, safePrefs);
  const estimatedCost = breakdown.grandTotal;
  const targetBudget = safePrefs.targetBudget;
  const budgetDiff = targetBudget - estimatedCost;

  // Transit estimation
  const transitEstimate = estimateTransportCost(
    safePrefs.originCity,
    destination,
    safePrefs.transportPreference,
    safePrefs.isStudentBackpackerMode
  );

  // Check if transport alone consumes or exceeds the user budget
  const targetBudgetPerPersonINR = (targetBudget * 83.5) / safePrefs.travelersCount;
  const isTransportOverBudget = isTransportExceedingBudget(
    transitEstimate.estCostPerPersonINR,
    targetBudgetPerPersonINR
  );

  // 1. Interest Matching Score (0 - 100, 35% weight)
  let interestScore = 75; // Baseline when no specific interests selected
  const matchedTags: string[] = [];

  if (safePrefs.interests.length > 0) {
    safePrefs.interests.forEach((pref) => {
      if (destination.tags.includes(pref)) {
        matchedTags.push(pref);
      }
    });

    const matchRatio = matchedTags.length / safePrefs.interests.length;
    interestScore = Math.min(100, Math.round(matchRatio * 90) + (matchedTags.length > 0 ? 10 : 0));
  }

  // 2. Budget Compatibility Score (0 - 100, 35% weight)
  let budgetScore = 60;
  if (targetBudget > 0) {
    const costRatio = estimatedCost / targetBudget;

    if (costRatio <= 1.0) {
      // Within budget: optimal range is 70% - 100% of target budget
      budgetScore = Math.round(85 + (1 - Math.abs(costRatio - 0.85)) * 15);
    } else if (costRatio <= 1.2) {
      // Slightly over budget (up to 20% over)
      budgetScore = Math.max(35, Math.round(70 - (costRatio - 1.0) * 175));
    } else {
      // Significantly over budget
      budgetScore = Math.max(15, Math.round(40 - (costRatio - 1.2) * 50));
    }

    // Heavy penalty if transportation alone exceeds the budget
    if (isTransportOverBudget) {
      budgetScore = Math.min(25, budgetScore * 0.4);
    }
  }

  // 3. Trip Duration Fit Score (0 - 100, 20% weight)
  const durationResult = calculateDurationScore(
    safePrefs.durationDays,
    destination.recommendedDurationDays ?? { min: 3, max: 10 }
  );
  let durationScore = durationResult.score;

  // Ultra-budget / 1-day trip adjustments
  const isUltraBudget = safePrefs.budgetTier === 'ultra_budget' || (targetBudgetPerPersonINR > 0 && targetBudgetPerPersonINR <= 1000);
  if (isUltraBudget || safePrefs.durationDays === 1) {
    if (destination.isDayTripEligible && transitEstimate.distanceKm <= 350) {
      durationScore = Math.min(100, durationScore + 15);
      budgetScore = Math.min(100, budgetScore + 10);
    } else if (transitEstimate.distanceKm > 400) {
      // Distant destination cannot be recommended as affordable for ultra-budget / 1-day
      durationScore = Math.max(15, durationScore - 40);
      budgetScore = Math.max(15, budgetScore - 30);
    }
  }

  // 4. Destination Rating & Quality Score (0 - 100, 10% weight)
  const safeRating = Math.max(1, Math.min(5, destination.rating ?? 4.5));
  const ratingScore = Math.round((safeRating / 5) * 100);

  // Student & Backpacker Mode adjustments
  let studentBonus = 0;
  const hasHostel = Boolean(destination.accommodationOptions?.some((a) => a.roomType === 'dormitory'));
  if (safePrefs.isStudentBackpackerMode) {
    if (hasHostel) studentBonus += 5;
    if ((destination.freeActivities?.length || 0) >= 3) studentBonus += 5;
    if (transitEstimate.primaryMode === 'train_sleeper' || transitEstimate.primaryMode === 'bus') studentBonus += 5;
  }

  // Weighted Combination: 35% Interests, 35% Budget, 20% Duration, 10% Rating + Student Bonus
  const rawScore = Math.round(
    interestScore * 0.35 +
    budgetScore * 0.35 +
    durationScore * 0.20 +
    ratingScore * 0.10 +
    studentBonus
  );
  const matchScore = Math.min(99, Math.max(20, rawScore));

  // Generate transparent, explainable reason bullets
  const reasons: string[] = [];

  // 1. Interest match reason
  if (matchedTags.length > 0) {
    reasons.push(`Matches ${matchedTags.length} of your interests: ${matchedTags.slice(0, 3).join(', ')}`);
  } else {
    reasons.push(`Popular choice for ${destination.tags.slice(0, 2).join(' & ')}`);
  }

  // 2. Budget & Transit status
  if (isTransportOverBudget) {
    reasons.push(
      `Transport alone (~₹${transitEstimate.estCostPerPersonINR.toLocaleString()}) consumes most of your budget from ${transitEstimate.origin}`
    );
  } else if (budgetDiff >= 0) {
    const surplusINR = Math.round(budgetDiff * 83.5);
    reasons.push(`Within budget: ₹${surplusINR.toLocaleString()} remaining buffer`);
  } else {
    const deficitINR = Math.round(Math.abs(budgetDiff) * 83.5);
    reasons.push(`Exceeds budget target by ₹${deficitINR.toLocaleString()}`);
  }

  // 3. Duration & Day-trip suitability
  if (safePrefs.durationDays === 1 && destination.isDayTripEligible) {
    reasons.push(`Ideal day-trip corridor (~${transitEstimate.estDurationHours}h by ${transitEstimate.primaryMode.replace('_', ' ')})`);
  } else {
    reasons.push(durationResult.reason);
  }

  // 4. Student mode highlight if active
  if (safePrefs.isStudentBackpackerMode && hasHostel) {
    const dorm = destination.accommodationOptions?.find((a) => a.roomType === 'dormitory');
    reasons.push(`Student perk: Dorm beds from ~₹${dorm?.estPriceINRPerPerson || 400}/night`);
  }

  // 5. Provisional origin notice if departure city missing
  if (transitEstimate.isProvisional && destination.country === 'India') {
    reasons.push(`Provisional transport fare. Specify your departure city for exact origin-based pricing.`);
  }

  return {
    destination,
    matchScore,
    reasons,
    estimatedTripCost: estimatedCost,
    isBudgetFit: budgetDiff >= 0,
    budgetDifference: budgetDiff,
    transitEstimate,
    isDayTrip: destination.isDayTripEligible && safePrefs.durationDays === 1,
    isStudentRecommended: hasHostel && safePrefs.isStudentBackpackerMode,
    hostelAvailable: hasHostel,
    freeActivitiesCount: destination.freeActivities?.length || 0,
    isTransportOverBudget,
  };
}

/**
 * Filter, score, and sort destination recommendations based on search input and user preferences.
 */
export function getRecommendedDestinations(
  destinations: Destination[],
  preferences: TripPreferences,
  searchQuery: string = '',
  sortBy: SortOption = 'match'
): RecommendationMatch[] {
  if (!Array.isArray(destinations) || destinations.length === 0) {
    return [];
  }

  const query = typeof searchQuery === 'string' ? searchQuery.trim().toLowerCase() : '';
  const safePrefs = validateTripPreferences(preferences);

  // 1. Filter by region, state, hostel, and search query
  const filtered = destinations.filter((dest) => {
    // Region check
    if (safePrefs.selectedRegion && safePrefs.selectedRegion !== 'All') {
      if (safePrefs.selectedRegion === 'All India') {
        if (dest.country !== 'India') return false;
      } else if (safePrefs.selectedRegion === 'Global') {
        if (dest.country === 'India') return false;
      } else if (dest.region !== safePrefs.selectedRegion) {
        return false;
      }
    }

    // State filter check
    if (safePrefs.selectedState && safePrefs.selectedState !== 'All') {
      if (dest.state !== safePrefs.selectedState) {
        return false;
      }
    }

    // Hostel-only filter check
    if (safePrefs.hostelOnlyFilter) {
      const hasDorm = dest.accommodationOptions?.some((a) => a.roomType === 'dormitory');
      if (!hasDorm) return false;
    }

    // Travel Month check (if specified)
    if (safePrefs.travelMonth && safePrefs.travelMonth !== 'Any') {
      if (dest.bestMonths && dest.bestMonths.length > 0) {
        if (!dest.bestMonths.includes(safePrefs.travelMonth)) {
          // Soft filter or pass
        }
      }
    }

    // Search query check (Destination name, country, state, tags, highlights)
    if (query) {
      const matchName = dest.name?.toLowerCase().includes(query) ?? false;
      const matchCountry = dest.country?.toLowerCase().includes(query) ?? false;
      const matchState = dest.state?.toLowerCase().includes(query) ?? false;
      const matchTag = dest.tags?.some((t) => t.toLowerCase().includes(query)) ?? false;
      const matchHighlight = dest.highlights?.some((h) => h.toLowerCase().includes(query)) ?? false;
      return matchName || matchCountry || matchState || matchTag || matchHighlight;
    }

    return true;
  });

  // 2. Score each candidate
  const scored = filtered.map((dest) => scoreDestination(dest, safePrefs));

  // 3. Sort results
  return scored.sort((a, b) => {
    switch (sortBy) {
      case 'nomad-score':
        return (
          getDestinationNomadScore(b.destination, safePrefs.profession).finalScore -
          getDestinationNomadScore(a.destination, safePrefs.profession).finalScore
        );
      case 'price-asc':
        return a.estimatedTripCost - b.estimatedTripCost;
      case 'price-desc':
        return b.estimatedTripCost - a.estimatedTripCost;
      case 'rating':
        return (b.destination.rating ?? 0) - (a.destination.rating ?? 0);
      case 'match':
      default:
        return b.matchScore - a.matchScore;
    }
  });
}
