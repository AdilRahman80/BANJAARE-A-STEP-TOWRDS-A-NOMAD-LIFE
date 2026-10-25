import { describe, it, expect } from 'vitest';
import {
  calculateBudgetBreakdown,
  validateTripPreferences,
  sanitizeModifiers,
  convertFromUSD,
  formatCurrency,
} from '../budgetCalculator';
import { SAMPLE_DESTINATIONS } from '../../data/destinations';
import { TripPreferences } from '../../types/trip';

const mockDestination = SAMPLE_DESTINATIONS[0]; // Bali, Indonesia

describe('budgetCalculator - Input Validation & Sanitization', () => {
  it('passes valid trip preferences through unaltered', () => {
    const input: TripPreferences = {
      originCity: 'London',
      targetBudget: 4000,
      durationDays: 7,
      travelersCount: 2,
      interests: ['Beaches', 'Culture'],
      accommodationTier: 'mid',
      selectedRegion: 'Asia',
    };
    const validated = validateTripPreferences(input);
    expect(validated.travelersCount).toBe(2);
    expect(validated.durationDays).toBe(7);
    expect(validated.targetBudget).toBe(4000);
    expect(validated.accommodationTier).toBe('mid');
  });

  it('sanitizes zero, negative, and NaN travelersCount safely to 1', () => {
    expect(validateTripPreferences({ travelersCount: 0 }).travelersCount).toBe(1);
    expect(validateTripPreferences({ travelersCount: -4 }).travelersCount).toBe(1);
    expect(validateTripPreferences({ travelersCount: NaN }).travelersCount).toBe(1);
    expect(validateTripPreferences({ travelersCount: undefined }).travelersCount).toBe(1);
  });

  it('floors fractional travelers count to integer', () => {
    expect(validateTripPreferences({ travelersCount: 3.8 }).travelersCount).toBe(3);
  });

  it('caps unusually high traveler counts at 100', () => {
    expect(validateTripPreferences({ travelersCount: 250 }).travelersCount).toBe(100);
  });

  it('sanitizes zero, negative, and NaN durationDays safely to 1', () => {
    expect(validateTripPreferences({ durationDays: 0 }).durationDays).toBe(1);
    expect(validateTripPreferences({ durationDays: -10 }).durationDays).toBe(1);
    expect(validateTripPreferences({ durationDays: NaN }).durationDays).toBe(1);
  });

  it('caps durationDays at 365', () => {
    expect(validateTripPreferences({ durationDays: 1000 }).durationDays).toBe(365);
  });

  it('sanitizes negative or NaN targetBudget to 0', () => {
    expect(validateTripPreferences({ targetBudget: -500 }).targetBudget).toBe(0);
    expect(validateTripPreferences({ targetBudget: NaN }).targetBudget).toBe(0);
  });

  it('defaults invalid accommodation tiers to mid', () => {
    // @ts-expect-error testing invalid input
    expect(validateTripPreferences({ accommodationTier: 'ultra-luxury' }).accommodationTier).toBe('mid');
  });

  it('sanitizes category multipliers properly', () => {
    const sanitized = sanitizeModifiers({
      flightsMultiplier: -1,
      lodgingMultiplier: NaN,
      foodMultiplier: 1.5,
      activitiesMultiplier: 5.0,
    });
    expect(sanitized.flightsMultiplier).toBe(1.0);
    expect(sanitized.lodgingMultiplier).toBe(1.0);
    expect(sanitized.foodMultiplier).toBe(1.5);
    expect(sanitized.activitiesMultiplier).toBe(3.0); // capped at 3.0
  });
});

describe('budgetCalculator - Cost Calculations', () => {
  it('calculates correct itemized costs for a solo traveler on a 5-day trip', () => {
    const prefs: TripPreferences = {
      originCity: 'New York',
      targetBudget: 2500,
      durationDays: 5,
      travelersCount: 1,
      interests: ['Beaches'],
      accommodationTier: 'mid', // Bali mid lodging = $75/night
      selectedRegion: 'Asia',
    };

    const breakdown = calculateBudgetBreakdown(mockDestination, prefs);

    // Bali baseline:
    // Flight: 650 * 1 = 650
    // Nights: 5 - 1 = 4. Rooms: ceil(1/2) = 1. Lodging: 75 * 4 * 1 = 300
    // Food: 20 * 5 * 1 = 100
    // Activities: 25 * 5 * 1 = 125
    // Transit: 10 * 5 * 1 = 50
    // Subtotal: 650 + 300 + 100 + 125 + 50 = 1225
    // Contingency: 1225 * 0.1 = 123 (rounded)
    // Grand Total: 1225 + 123 = 1348
    expect(breakdown.flightsTotal).toBe(650);
    expect(breakdown.lodgingTotal).toBe(300);
    expect(breakdown.foodTotal).toBe(100);
    expect(breakdown.activitiesTotal).toBe(125);
    expect(breakdown.transitTotal).toBe(50);
    expect(breakdown.contingencyTotal).toBe(123);
    expect(breakdown.grandTotal).toBe(1348);
    expect(breakdown.perPersonTotal).toBe(1348);
    expect(breakdown.dailyPerPerson).toBe(Math.round(1348 / 5));
    expect(breakdown.isWithinBudget).toBe(true);
    expect(breakdown.surplusDeficit).toBe(2500 - 1348);
  });

  it('scales hotel rooms appropriately for different group sizes', () => {
    const basePrefs: TripPreferences = {
      originCity: 'New York',
      targetBudget: 5000,
      durationDays: 4,
      travelersCount: 1,
      interests: [],
      accommodationTier: 'mid', // 75/night, 3 nights
      selectedRegion: 'All',
    };

    // 1 traveler: 1 room -> 75 * 3 * 1 = 225
    const b1 = calculateBudgetBreakdown(mockDestination, { ...basePrefs, travelersCount: 1 });
    expect(b1.lodgingTotal).toBe(225);

    // 2 travelers: 1 room -> 75 * 3 * 1 = 225
    const b2 = calculateBudgetBreakdown(mockDestination, { ...basePrefs, travelersCount: 2 });
    expect(b2.lodgingTotal).toBe(225);

    // 3 travelers: ceil(3/2) = 2 rooms -> 75 * 3 * 2 = 450
    const b3 = calculateBudgetBreakdown(mockDestination, { ...basePrefs, travelersCount: 3 });
    expect(b3.lodgingTotal).toBe(450);

    // 4 travelers: ceil(4/2) = 2 rooms -> 75 * 3 * 2 = 450
    const b4 = calculateBudgetBreakdown(mockDestination, { ...basePrefs, travelersCount: 4 });
    expect(b4.lodgingTotal).toBe(450);
  });

  it('updates costs consistently when duration or traveler count changes', () => {
    const prefs7Days = {
      originCity: 'New York',
      targetBudget: 3000,
      durationDays: 7,
      travelersCount: 2,
      interests: [],
      accommodationTier: 'mid' as const,
      selectedRegion: 'All',
    };

    const prefs14Days = {
      ...prefs7Days,
      durationDays: 14,
    };

    const b7 = calculateBudgetBreakdown(mockDestination, prefs7Days);
    const b14 = calculateBudgetBreakdown(mockDestination, prefs14Days);

    // Flights should be identical since airfare does not scale with trip duration
    expect(b14.flightsTotal).toBe(b7.flightsTotal);

    // Food, transit, activities, and lodging must increase for a longer duration
    expect(b14.foodTotal).toBeGreaterThan(b7.foodTotal);
    expect(b14.activitiesTotal).toBeGreaterThan(b7.activitiesTotal);
    expect(b14.lodgingTotal).toBeGreaterThan(b7.lodgingTotal);
    expect(b14.grandTotal).toBeGreaterThan(b7.grandTotal);
  });

  it('accurately detects budget deficit when total exceeds target', () => {
    const prefs: TripPreferences = {
      originCity: 'New York',
      targetBudget: 1000, // Deliberately lower than minimum cost
      durationDays: 10,
      travelersCount: 2,
      interests: [],
      accommodationTier: 'luxury',
      selectedRegion: 'All',
    };

    const breakdown = calculateBudgetBreakdown(mockDestination, prefs);
    expect(breakdown.isWithinBudget).toBe(false);
    expect(breakdown.surplusDeficit).toBeLessThan(0);
    expect(breakdown.grandTotal).toBeGreaterThan(prefs.targetBudget);
  });

  it('handles zero and negative inputs without returning Infinity or NaN', () => {
    const invalidPrefs = {
      originCity: '',
      targetBudget: -500,
      durationDays: 0,
      travelersCount: -2,
      interests: [],
      accommodationTier: 'mid' as const,
      selectedRegion: 'All',
    };

    const breakdown = calculateBudgetBreakdown(mockDestination, invalidPrefs);

    expect(Number.isFinite(breakdown.grandTotal)).toBe(true);
    expect(Number.isFinite(breakdown.perPersonTotal)).toBe(true);
    expect(Number.isFinite(breakdown.dailyPerPerson)).toBe(true);
    expect(Number.isNaN(breakdown.grandTotal)).toBe(false);
    expect(breakdown.grandTotal).toBeGreaterThan(0);
    expect(breakdown.isWithinBudget).toBe(false);
  });

  it('handles unusually high inputs cleanly', () => {
    const extremePrefs: TripPreferences = {
      originCity: 'Sydney',
      targetBudget: 1000000,
      durationDays: 180,
      travelersCount: 50,
      interests: [],
      accommodationTier: 'luxury',
      selectedRegion: 'All',
    };

    const breakdown = calculateBudgetBreakdown(mockDestination, extremePrefs);
    expect(Number.isFinite(breakdown.grandTotal)).toBe(true);
    expect(breakdown.grandTotal).toBeGreaterThan(0);
    expect(breakdown.perPersonTotal).toBeGreaterThan(0);
    expect(breakdown.dailyPerPerson).toBeGreaterThan(0);
  });
});

describe('budgetCalculator - Multi-Currency Conversion', () => {
  it('converts USD to EUR, GBP, and INR accurately', () => {
    expect(convertFromUSD(100, 'USD')).toBe(100);
    expect(convertFromUSD(100, 'EUR')).toBe(92);
    expect(convertFromUSD(100, 'GBP')).toBe(79);
    expect(convertFromUSD(100, 'INR')).toBe(8350);
  });

  it('formats amounts with localized symbols', () => {
    expect(formatCurrency(1500, 'USD')).toBe('$1,500');
    expect(formatCurrency(1500, 'EUR')).toBe('€1,380');
    expect(formatCurrency(1500, 'GBP')).toBe('£1,185');
    expect(formatCurrency(1000, 'INR')).toBe('₹83,500');
  });

  it('formats NaN or negative values gracefully', () => {
    expect(formatCurrency(NaN, 'USD')).toBe('$0');
  });
});
