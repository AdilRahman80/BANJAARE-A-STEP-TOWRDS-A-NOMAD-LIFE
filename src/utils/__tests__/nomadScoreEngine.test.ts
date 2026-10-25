import { describe, it, expect } from 'vitest';
import { getDestinationNomadScore } from '../nomadScoreEngine';
import { SAMPLE_DESTINATIONS } from '../../data/destinations';

describe('nomadScoreEngine', () => {
  it('calculates a valid nomad score for known Indian destinations', () => {
    const manali = SAMPLE_DESTINATIONS.find((d) => d.id === 'manali-hp');
    if (!manali) return;

    const score = getDestinationNomadScore(manali, 'photographer');
    expect(score.finalScore).toBeGreaterThanOrEqual(70);
    expect(score.finalScore).toBeLessThanOrEqual(100);
    expect(['A+', 'A', 'B+']).toContain(score.grade);
    expect(score.professionMatchBonus).toBeGreaterThan(0);
    expect(score.topPerks.length).toBeGreaterThan(0);
  });

  it('provides reliable fallback scores for international destinations', () => {
    const bali = SAMPLE_DESTINATIONS.find((d) => d.id === 'bali-indonesia') ?? SAMPLE_DESTINATIONS[0];
    const score = getDestinationNomadScore(bali);
    expect(score.finalScore).toBeGreaterThan(50);
    expect(score.wifi).toBeGreaterThanOrEqual(1);
    expect(score.topPerks.length).toBeGreaterThan(0);
  });
});
