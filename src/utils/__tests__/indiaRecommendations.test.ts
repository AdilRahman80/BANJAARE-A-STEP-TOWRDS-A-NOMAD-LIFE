import { describe, it, expect } from 'vitest';
import {
  getRecommendedDestinations,
  scoreDestination,
} from '../recommendationEngine';
import {
  calculateGroupCostSplit,
  calculateHostelHotelComparison,
  calculateBudgetBreakdown,
} from '../budgetCalculator';
import { INDIA_DESTINATIONS } from '../../data/destinations';
import { TripPreferences } from '../../types/trip';

describe('India Recommendations - Budget Ranking & Transit Awareness', () => {
  const baseIndiaPrefs: TripPreferences = {
    originCity: 'New Delhi (NCR)',
    targetBudget: 15000 / 83.5, // ~₹15,000 in USD
    durationDays: 3,
    travelersCount: 2,
    interests: ['Adventure', 'Culture'],
    accommodationTier: 'budget',
    selectedRegion: 'North India',
    isStudentBackpackerMode: true,
  };

  it('ranks cheapest suitable destinations first when sorting by price-asc', () => {
    const results = getRecommendedDestinations(
      INDIA_DESTINATIONS,
      baseIndiaPrefs,
      '',
      'price-asc'
    );

    expect(results.length).toBeGreaterThan(0);
    for (let i = 0; i < results.length - 1; i++) {
      expect(results[i].estimatedTripCost).toBeLessThanOrEqual(results[i + 1].estimatedTripCost);
    }
  });

  it('flags distant destinations when transport alone exceeds user budget', () => {
    // Ultra-low budget of ₹800 from Delhi
    const tightPrefs: TripPreferences = {
      originCity: 'New Delhi (NCR)',
      targetBudget: 800 / 83.5, // ₹800 total budget
      durationDays: 1,
      travelersCount: 1,
      interests: [],
      accommodationTier: 'budget',
      selectedRegion: 'All India',
      budgetTier: 'ultra_budget',
    };

    // Distant South India destination from Delhi
    const kochi = INDIA_DESTINATIONS.find((d) => d.id === 'kochi-kerala')!;
    const scoredKochi = scoreDestination(kochi, tightPrefs);

    expect(scoredKochi.isTransportOverBudget).toBe(true);
    expect(scoredKochi.reasons.some((r) => r.includes('Transport alone'))).toBe(true);
    expect(scoredKochi.matchScore).toBeLessThan(50);

    // Nearby destination like Haridwar or Agra should have viable transport
    const haridwar = INDIA_DESTINATIONS.find((d) => d.id === 'haridwar-uttarakhand')!;
    const scoredHaridwar = scoreDestination(haridwar, tightPrefs);
    expect(scoredHaridwar.isTransportOverBudget).toBe(false);
    expect(scoredHaridwar.matchScore).toBeGreaterThan(scoredKochi.matchScore);
  });

  it('gracefully handles missing origin city with a provisional transport notice', () => {
    const missingOriginPrefs: TripPreferences = {
      ...baseIndiaPrefs,
      originCity: '', // Missing origin
    };

    const dest = INDIA_DESTINATIONS[0];
    const scored = scoreDestination(dest, missingOriginPrefs);

    expect(scored.transitEstimate?.isProvisional).toBe(true);
    expect(Number.isFinite(scored.estimatedTripCost)).toBe(true);
    expect(scored.reasons.some((r) => r.includes('Provisional transport fare'))).toBe(true);
  });
});

describe('Student & Backpacker Mode - Hostels & Cost Comparisons', () => {
  it('filters only destinations with hostel dorm availability when hostelOnlyFilter is true', () => {
    const hostelPrefs: TripPreferences = {
      originCity: 'Bengaluru',
      targetBudget: 8000 / 83.5,
      durationDays: 3,
      travelersCount: 1,
      interests: [],
      accommodationTier: 'budget',
      selectedRegion: 'South India',
      hostelOnlyFilter: true,
    };

    const results = getRecommendedDestinations(INDIA_DESTINATIONS, hostelPrefs);

    expect(results.length).toBeGreaterThan(0);
    results.forEach((match) => {
      const hasDorm = match.destination.accommodationOptions?.some((a) => a.roomType === 'dormitory');
      expect(hasDorm).toBe(true);
    });
  });

  it('calculates group cost splitting showing per-person savings', () => {
    const dest = INDIA_DESTINATIONS.find((d) => d.id === 'rishikesh-uttarakhand')!;
    const prefs: TripPreferences = {
      originCity: 'New Delhi (NCR)',
      targetBudget: 20000 / 83.5,
      durationDays: 4,
      travelersCount: 4,
      interests: ['Adventure'],
      accommodationTier: 'mid',
      selectedRegion: 'North India',
    };

    const splits = calculateGroupCostSplit(dest, prefs);

    expect(splits.length).toBe(4); // [1, 2, 4, 6]
    expect(splits[0].travelersCount).toBe(1);
    expect(splits[1].travelersCount).toBe(2);
    expect(splits[2].travelersCount).toBe(4);
    expect(splits[3].travelersCount).toBe(6);

    // Cost per person should reduce or remain equal for groups due to shared hotel rooms & cabs
    expect(splits[2].costPerPerson).toBeLessThanOrEqual(splits[0].costPerPerson);
    expect(splits[2].savingsVsSoloPerPerson).toBeGreaterThanOrEqual(0);
  });

  it('calculates hostel vs hotel savings comparison accurately', () => {
    const dest = INDIA_DESTINATIONS.find((d) => d.id === 'goa-india')!;
    const comparison = calculateHostelHotelComparison(dest, 4); // 4 days = 3 nights

    expect(comparison.hostelDormNightly).toBeGreaterThan(0);
    expect(comparison.budgetHotelNightly).toBeGreaterThan(comparison.hostelDormNightly);
    expect(comparison.potentialTripSavingsHostel).toBe(
      (comparison.budgetHotelNightly - comparison.hostelDormNightly) * 3
    );
  });

  it('eliminates lodging cost for 1-day trips', () => {
    const dest = INDIA_DESTINATIONS.find((d) => d.id === 'lonavala-maharashtra')!;
    const dayTripPrefs: TripPreferences = {
      originCity: 'Mumbai',
      targetBudget: 1500 / 83.5,
      durationDays: 1, // 1 Day Trip
      travelersCount: 2,
      interests: [],
      accommodationTier: 'budget',
      selectedRegion: 'West India',
    };

    const breakdown = calculateBudgetBreakdown(dest, dayTripPrefs);
    expect(breakdown.lodgingTotal).toBe(0);
    expect(breakdown.grandTotal).toBeGreaterThan(0);
  });
});
