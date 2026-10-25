import { describe, it, expect } from 'vitest';
import {
  scoreDestination,
  getRecommendedDestinations,
  calculateDurationScore,
} from '../recommendationEngine';
import { SAMPLE_DESTINATIONS } from '../../data/destinations';
import { TripPreferences } from '../../types/trip';

describe('recommendationEngine - Duration Scoring', () => {
  it('gives a perfect 100 score when duration falls within recommended window', () => {
    const result = calculateDurationScore(7, { min: 5, max: 14 });
    expect(result.score).toBe(100);
    expect(result.reason).toContain('Ideal for your 7-day trip schedule');
  });

  it('penalizes trips that are too short for the destination', () => {
    // 2 days for a destination requiring at least 5 days (e.g. New Zealand or Peru)
    const result = calculateDurationScore(2, { min: 5, max: 12 });
    expect(result.score).toBeLessThan(100);
    expect(result.reason).toContain('Best enjoyed with 5+ days');
  });

  it('provides relaxed stay advice when duration exceeds destination window', () => {
    const result = calculateDurationScore(15, { min: 3, max: 7 });
    expect(result.score).toBeLessThanOrEqual(100);
    expect(result.reason).toContain('Recommended for 3–7 days');
  });
});

describe('recommendationEngine - Destination Scoring & Explanations', () => {
  const basePrefs: TripPreferences = {
    originCity: 'New York',
    targetBudget: 3500,
    durationDays: 7,
    travelersCount: 2,
    interests: ['Beaches', 'Relaxation'],
    accommodationTier: 'mid',
    selectedRegion: 'All',
  };

  it('scores destinations higher when interests closely align', () => {
    const bali = SAMPLE_DESTINATIONS.find((d) => d.id === 'bali-indonesia')!; // Tags: Beaches, Culture, Relaxation, Nature
    const banff = SAMPLE_DESTINATIONS.find((d) => d.id === 'banff-canada')!; // Tags: Nature, Adventure, Relaxation

    const matchBali = scoreDestination(bali, basePrefs);
    const matchBanff = scoreDestination(banff, basePrefs);

    // Bali has 2 interest matches (Beaches + Relaxation); Banff has 1 (Relaxation)
    expect(matchBali.matchScore).toBeGreaterThan(matchBanff.matchScore);
    expect(matchBali.reasons[0]).toContain('Matches 2 of your interests');
  });

  it('scores destinations higher when cost fits within the user budget', () => {
    const generousBudgetPrefs: TripPreferences = {
      ...basePrefs,
      targetBudget: 5000,
    };

    const tightBudgetPrefs: TripPreferences = {
      ...basePrefs,
      targetBudget: 1200,
    };

    const dest = SAMPLE_DESTINATIONS[0];
    const matchGenerous = scoreDestination(dest, generousBudgetPrefs);
    const matchTight = scoreDestination(dest, tightBudgetPrefs);

    expect(matchGenerous.isBudgetFit).toBe(true);
    expect(matchTight.isBudgetFit).toBe(false);
    expect(matchGenerous.matchScore).toBeGreaterThan(matchTight.matchScore);
  });

  it('generates transparent explanation reasons with budget remaining', () => {
    const dest = SAMPLE_DESTINATIONS[0];
    const match = scoreDestination(dest, basePrefs);

    expect(match.reasons.length).toBeGreaterThanOrEqual(3);
    // Should clearly mention budget status and buffer
    const hasBudgetMention = match.reasons.some((r) => r.includes('budget'));
    expect(hasBudgetMention).toBe(true);
    // Should mention duration compatibility
    const hasDurationMention = match.reasons.some((r) => r.includes('day'));
    expect(hasDurationMention).toBe(true);
  });
});

describe('recommendationEngine - Filtering & Sorting', () => {
  const defaultPrefs: TripPreferences = {
    originCity: 'London',
    targetBudget: 3000,
    durationDays: 7,
    travelersCount: 2,
    interests: [],
    accommodationTier: 'mid',
    selectedRegion: 'All',
  };

  it('filters destinations by region accurately', () => {
    const europePrefs: TripPreferences = { ...defaultPrefs, selectedRegion: 'Europe' };
    const results = getRecommendedDestinations(SAMPLE_DESTINATIONS, europePrefs);

    expect(results.length).toBeGreaterThan(0);
    results.forEach((r) => {
      expect(r.destination.region).toBe('Europe');
    });
  });

  it('filters destinations by search query in name, country, or vibe', () => {
    const resultsByName = getRecommendedDestinations(SAMPLE_DESTINATIONS, defaultPrefs, 'kyoto');
    expect(resultsByName.length).toBe(1);
    expect(resultsByName[0].destination.name).toBe('Kyoto');

    const resultsByCountry = getRecommendedDestinations(SAMPLE_DESTINATIONS, defaultPrefs, 'greece');
    expect(resultsByCountry.length).toBe(1);
    expect(resultsByCountry[0].destination.name).toBe('Santorini');

    const resultsByTag = getRecommendedDestinations(SAMPLE_DESTINATIONS, defaultPrefs, 'paragliding');
    expect(resultsByTag.length).toBeGreaterThan(0);
  });

  it('handles search queries that match nothing gracefully', () => {
    const results = getRecommendedDestinations(SAMPLE_DESTINATIONS, defaultPrefs, 'nonexistentcity12345');
    expect(results).toEqual([]);
    expect(results.length).toBe(0);
  });

  it('sorts by lowest price (price-asc) accurately', () => {
    const results = getRecommendedDestinations(SAMPLE_DESTINATIONS, defaultPrefs, '', 'price-asc');
    for (let i = 0; i < results.length - 1; i++) {
      expect(results[i].estimatedTripCost).toBeLessThanOrEqual(results[i + 1].estimatedTripCost);
    }
  });

  it('sorts by highest price (price-desc) accurately', () => {
    const results = getRecommendedDestinations(SAMPLE_DESTINATIONS, defaultPrefs, '', 'price-desc');
    for (let i = 0; i < results.length - 1; i++) {
      expect(results[i].estimatedTripCost).toBeGreaterThanOrEqual(results[i + 1].estimatedTripCost);
    }
  });

  it('sorts by highest rating accurately', () => {
    const results = getRecommendedDestinations(SAMPLE_DESTINATIONS, defaultPrefs, '', 'rating');
    for (let i = 0; i < results.length - 1; i++) {
      expect(results[i].destination.rating).toBeGreaterThanOrEqual(results[i + 1].destination.rating);
    }
  });

  it('handles empty destination arrays safely', () => {
    const results = getRecommendedDestinations([], defaultPrefs);
    expect(results).toEqual([]);
  });
});
