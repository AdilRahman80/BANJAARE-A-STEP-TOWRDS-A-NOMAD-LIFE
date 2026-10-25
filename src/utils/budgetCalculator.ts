import {
  Destination,
  TripPreferences,
  BudgetBreakdown,
  CategoryAllocationModifiers,
  Currency,
  AccommodationTier,
  GroupCostSplit,
  HostelHotelComparison,
} from '../types/trip';
import { CURRENCIES } from '../data/destinations';
import { estimateTransportCost } from './transitEstimator';

export const DEFAULT_CATEGORY_MODIFIERS: CategoryAllocationModifiers = {
  flightsMultiplier: 1.0,
  lodgingMultiplier: 1.0,
  foodMultiplier: 1.0,
  activitiesMultiplier: 1.0,
};

/**
 * Validates and sanitizes trip preferences to prevent invalid, zero, or negative calculations.
 */
export function validateTripPreferences(preferences: Partial<TripPreferences>): TripPreferences {
  // Travelers: must be an integer >= 1, capped at 100 to prevent overflow
  let travelersCount = Math.floor(Number(preferences.travelersCount));
  if (isNaN(travelersCount) || travelersCount < 1) {
    travelersCount = 1;
  } else if (travelersCount > 100) {
    travelersCount = 100;
  }

  // Duration: must be an integer >= 1, capped at 365 days
  let durationDays = Math.floor(Number(preferences.durationDays));
  if (isNaN(durationDays) || durationDays < 1) {
    durationDays = 1;
  } else if (durationDays > 365) {
    durationDays = 365;
  }

  // Target Budget: must be non-negative
  let targetBudget = Number(preferences.targetBudget);
  if (isNaN(targetBudget) || targetBudget < 0) {
    targetBudget = 0;
  } else if (targetBudget > 10000000) {
    targetBudget = 10000000;
  }

  // Budget Type & Per-Person Budget synchronization
  const budgetType = preferences.budgetType === 'per_person' ? 'per_person' : 'total';
  let budgetPerPerson = Number(preferences.budgetPerPerson);
  if (isNaN(budgetPerPerson) || budgetPerPerson < 0) {
    budgetPerPerson = travelersCount > 0 ? targetBudget / travelersCount : targetBudget;
  }

  // If user selected per_person budget, sync targetBudget = budgetPerPerson * travelersCount
  if (preferences.budgetType === 'per_person' && budgetPerPerson > 0) {
    targetBudget = budgetPerPerson * travelersCount;
  }

  // Accommodation Tier: guard against invalid strings
  let accommodationTier: AccommodationTier = 'mid';
  if (
    preferences.accommodationTier === 'budget' ||
    preferences.accommodationTier === 'mid' ||
    preferences.accommodationTier === 'luxury'
  ) {
    accommodationTier = preferences.accommodationTier;
  }

  // Origin City: string sanitization
  const originCity = typeof preferences.originCity === 'string' ? preferences.originCity.trim() : '';

  // Interests: ensure array
  const interests = Array.isArray(preferences.interests) ? preferences.interests : [];

  // Region: ensure string
  const selectedRegion = typeof preferences.selectedRegion === 'string' ? preferences.selectedRegion : 'All';

  return {
    originCity,
    targetBudget,
    budgetPerPerson,
    budgetType,
    budgetTier: preferences.budgetTier || 'all',
    durationDays,
    travelersCount,
    interests,
    accommodationTier,
    selectedRegion,
    selectedState: preferences.selectedState || 'All',
    travelMonth: preferences.travelMonth || 'Any',
    transportPreference: preferences.transportPreference || 'any',
    accommodationPreference: preferences.accommodationPreference || 'any',
    isStudentBackpackerMode: Boolean(preferences.isStudentBackpackerMode),
    hostelOnlyFilter: Boolean(preferences.hostelOnlyFilter),
    roomTypePreference: preferences.roomTypePreference || 'any',
  };
}

/**
 * Sanitizes category multipliers to prevent negative, NaN, or extreme multipliers.
 */
export function sanitizeModifiers(
  modifiers?: Partial<CategoryAllocationModifiers>
): CategoryAllocationModifiers {
  if (!modifiers) return { ...DEFAULT_CATEGORY_MODIFIERS };

  const clampMultiplier = (val: unknown): number => {
    const num = Number(val);
    if (isNaN(num) || num < 0.1) return 1.0;
    if (num > 3.0) return 3.0;
    return num;
  };

  return {
    flightsMultiplier: clampMultiplier(modifiers.flightsMultiplier),
    lodgingMultiplier: clampMultiplier(modifiers.lodgingMultiplier),
    foodMultiplier: clampMultiplier(modifiers.foodMultiplier),
    activitiesMultiplier: clampMultiplier(modifiers.activitiesMultiplier),
  };
}

/**
 * Calculates a detailed, realistic travel budget breakdown with India transit & accommodation options
 */
export function calculateBudgetBreakdown(
  destination: Destination,
  preferences: TripPreferences,
  modifiers: CategoryAllocationModifiers = DEFAULT_CATEGORY_MODIFIERS
): BudgetBreakdown {
  const safePrefs = validateTripPreferences(preferences);
  const safeMods = sanitizeModifiers(modifiers);

  const { durationDays, travelersCount, accommodationTier, targetBudget, isStudentBackpackerMode, accommodationPreference } = safePrefs;

  // Transit estimation:
  // For Indian destinations, compute realistic origin-to-destination transit cost
  let transitEstimate;
  let flightBaseUSD = destination?.costEstimates?.flightBaseUSD ?? 30;

  if (destination?.country === 'India') {
    transitEstimate = estimateTransportCost(
      safePrefs.originCity,
      destination,
      safePrefs.transportPreference,
      isStudentBackpackerMode
    );
    // Convert INR transit cost to internal USD base for uniform arithmetic (1 USD ~ ₹83.5)
    flightBaseUSD = transitEstimate.estCostPerPersonINR / 83.5;
  }

  // Flights / Inter-city Transport Total
  const flightsTotal = Math.round(flightBaseUSD * travelersCount * safeMods.flightsMultiplier);

  // Lodging:
  // Day trips (durationDays === 1) have 0 nights lodging!
  let lodgingTotal = 0;
  if (durationDays > 1) {
    const nights = durationDays - 1;
    const nightlyTierCosts = destination?.costEstimates?.nightlyLodgingUSD ?? { budget: 10, mid: 30, luxury: 100 };
    let nightlyBase = Math.max(0, nightlyTierCosts[accommodationTier] ?? nightlyTierCosts.mid ?? 25);

    // If Student Backpacker mode is enabled or dorm preference selected, favor hostel dorm rates
    if (isStudentBackpackerMode || accommodationPreference === 'hostel_dorm') {
      const dormOption = destination?.accommodationOptions?.find((a) => a.roomType === 'dormitory');
      if (dormOption) {
        nightlyBase = dormOption.estPriceINRPerPerson / 83.5; // Convert ₹ to USD
      } else {
        nightlyBase = Math.min(nightlyBase, nightlyTierCosts.budget * 0.75);
      }
      // In hostels/dorms, lodging is priced per person directly
      lodgingTotal = Math.round(nightlyBase * nights * travelersCount * safeMods.lodgingMultiplier);
    } else {
      // Hotel room model: rooms needed = Math.ceil(travelersCount / 2)
      const roomsNeeded = Math.max(1, Math.ceil(travelersCount / 2));
      lodgingTotal = Math.round(nightlyBase * nights * roomsNeeded * safeMods.lodgingMultiplier);
    }
  }

  // Food & Dining:
  let dailyFoodUSD = destination?.costEstimates?.dailyFoodUSD ?? 6;
  if (isStudentBackpackerMode) {
    dailyFoodUSD = Math.max(3, dailyFoodUSD * 0.75); // Dhaba & street food budget
  }
  const foodTotal = Math.round(dailyFoodUSD * durationDays * travelersCount * safeMods.foodMultiplier);

  // Activities, experiences, passes
  let dailyActivitiesUSD = destination?.costEstimates?.dailyActivitiesUSD ?? 4;
  if (isStudentBackpackerMode) {
    dailyActivitiesUSD = Math.max(1.5, dailyActivitiesUSD * 0.6); // Prioritize free walks/ghats/nature
  }
  const activitiesTotal = Math.round(dailyActivitiesUSD * durationDays * travelersCount * safeMods.activitiesMultiplier);

  // Local transit (shared autos, metros, local buses)
  const dailyTransitUSD = destination?.costEstimates?.dailyTransitUSD ?? 2;
  const transitTotal = Math.round(dailyTransitUSD * durationDays * travelersCount);

  // Subtotal before emergency safety buffer
  const subtotal = flightsTotal + lodgingTotal + foodTotal + activitiesTotal + transitTotal;

  // 10% contingency buffer recommended for safe travel forecasting (or 7% in ultra-student mode)
  const contingencyBufferPct = isStudentBackpackerMode ? 0.08 : 0.10;
  const contingencyTotal = Math.round(subtotal * contingencyBufferPct);

  const grandTotal = subtotal + contingencyTotal;

  // Safe division to prevent Infinity or NaN
  const safeTravelers = Math.max(1, travelersCount);
  const safePersonDays = Math.max(1, durationDays * safeTravelers);

  const perPersonTotal = Math.round(grandTotal / safeTravelers);
  const dailyPerPerson = Math.round(grandTotal / safePersonDays);

  const surplusDeficit = Math.round(targetBudget - grandTotal);
  const isWithinBudget = surplusDeficit >= 0;

  return {
    flightsTotal,
    lodgingTotal,
    foodTotal,
    activitiesTotal,
    transitTotal,
    contingencyTotal,
    grandTotal,
    perPersonTotal,
    dailyPerPerson,
    surplusDeficit,
    isWithinBudget,
    transitEstimate,
  };
}

/**
 * Calculates group cost splitting across 1, 2, 4, and 6 travelers
 */
export function calculateGroupCostSplit(
  destination: Destination,
  preferences: TripPreferences,
  modifiers: CategoryAllocationModifiers = DEFAULT_CATEGORY_MODIFIERS
): GroupCostSplit[] {
  const partySizes = [1, 2, 4, 6];
  const soloResult = calculateBudgetBreakdown(destination, { ...preferences, travelersCount: 1 }, modifiers);
  const soloPerPerson = soloResult.grandTotal;

  return partySizes.map((size) => {
    const result = calculateBudgetBreakdown(destination, { ...preferences, travelersCount: size }, modifiers);
    const costPerPerson = result.perPersonTotal;
    const savingsVsSoloPerPerson = Math.max(0, soloPerPerson - costPerPerson);

    return {
      travelersCount: size,
      totalCost: result.grandTotal,
      costPerPerson,
      savingsVsSoloPerPerson,
    };
  });
}

/**
 * Compares hostel dorm vs. budget hotel vs. mid hotel costs with potential trip savings
 */
export function calculateHostelHotelComparison(
  destination: Destination,
  durationDays: number
): HostelHotelComparison {
  const nights = Math.max(1, durationDays > 1 ? durationDays - 1 : 1);

  // Look for hostel dorm option in destination data or use benchmark
  const dormOption = destination?.accommodationOptions?.find((a) => a.roomType === 'dormitory');
  const hostelDormNightly = dormOption ? dormOption.estPriceINRPerPerson : 450;

  // Budget hotel private room baseline in INR (typically 2x-3x of a dorm bed or from tier)
  const budgetTierINR = Math.round((destination?.costEstimates?.nightlyLodgingUSD?.budget ?? 12) * 83.5);
  const budgetHotelNightly = Math.max(Math.round(hostelDormNightly * 2.2), Math.max(950, budgetTierINR));

  // Mid hotel baseline
  const midTierINR = Math.round((destination?.costEstimates?.nightlyLodgingUSD?.mid ?? 25) * 83.5);
  const midHotelNightly = Math.max(Math.round(hostelDormNightly * 4.5), Math.max(2200, midTierINR));

  // Total savings by choosing hostel dorm over a budget hotel
  const potentialTripSavingsHostel = Math.max(0, (budgetHotelNightly - hostelDormNightly) * nights);

  return {
    hostelDormNightly,
    budgetHotelNightly,
    midHotelNightly,
    potentialTripSavingsHostel,
  };
}

/**
 * Convert USD value to selected target currency.
 */
export function convertFromUSD(amountUSD: number, currency: Currency): number {
  if (isNaN(amountUSD)) return 0;
  const config = CURRENCIES[currency] || CURRENCIES.USD;
  return Math.round(amountUSD * config.rateToUSD);
}

/**
 * Format numerical amount with currency symbol and localized number formatting.
 */
export function formatCurrency(amountUSD: number, currency: Currency = 'INR'): string {
  const config = CURRENCIES[currency] || CURRENCIES.INR;
  if (isNaN(amountUSD)) return `${config.symbol}0`;
  const converted = convertFromUSD(amountUSD, currency);

  return `${config.symbol}${converted.toLocaleString()}`;
}
