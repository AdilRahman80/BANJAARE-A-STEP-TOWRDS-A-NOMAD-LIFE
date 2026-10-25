import { Destination, NomadProfession, NomadScore } from '../types/trip';
import { NOMAD_SCORES } from '../data/nomadScores';

export interface DetailedNomadScore extends NomadScore {
  finalScore: number;
  grade: 'A+' | 'A' | 'B+' | 'B' | 'C';
  professionMatchBonus: number;
  topPerks: string[];
}

export function getDestinationNomadScore(
  destination: Destination,
  profession?: NomadProfession
): DetailedNomadScore {
  const baseScore: NomadScore = NOMAD_SCORES[destination.id] ?? {
    overall: destination.rating > 4.5 ? 78 : 68,
    wifi: destination.country === 'India' ? 7 : 8,
    coworking: 6,
    costEfficiency: destination.costEstimates.nightlyLodgingUSD.budget < 25 ? 9 : 6,
    community: 7,
    naturalBeauty: 9,
  };

  let professionBonus = 0;
  if (profession && baseScore.professionBoost && baseScore.professionBoost[profession]) {
    professionBonus = baseScore.professionBoost[profession]!;
  }

  // Composite formula: weighted average + profession bonus
  const rawScore =
    baseScore.wifi * 3.5 +
    baseScore.coworking * 2.0 +
    baseScore.costEfficiency * 2.5 +
    baseScore.community * 1.0 +
    baseScore.naturalBeauty * 1.0 +
    professionBonus * 0.5;

  const finalScore = Math.min(99, Math.round(rawScore));

  let grade: 'A+' | 'A' | 'B+' | 'B' | 'C' = 'B';
  if (finalScore >= 88) grade = 'A+';
  else if (finalScore >= 78) grade = 'A';
  else if (finalScore >= 68) grade = 'B+';
  else if (finalScore >= 55) grade = 'B';
  else grade = 'C';

  const topPerks: string[] = [];
  if (baseScore.wifi >= 7) topPerks.push('High-speed Fiber (>100Mbps)');
  if (baseScore.coworking >= 6) topPerks.push('Active Coworking Cafes');
  if (baseScore.costEfficiency >= 8) topPerks.push('High Net Savings Index');
  if (baseScore.naturalBeauty >= 8) topPerks.push('Scenic Recharge Surroundings');
  if (baseScore.community >= 7) topPerks.push('Thriving Nomad Community');

  return {
    ...baseScore,
    finalScore,
    grade,
    professionMatchBonus: professionBonus,
    topPerks,
  };
}
