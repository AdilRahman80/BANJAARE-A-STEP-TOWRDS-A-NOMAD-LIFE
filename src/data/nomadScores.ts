import { NomadScore, NomadProfession } from '../types/trip';

/**
 * Illustrative NomadX scores for destinations.
 * Keyed by destination ID (matches ids in indiaDestinationsData.ts and destinations.ts).
 * All scores are indicative benchmarks — not live verified data.
 */
export const NOMAD_SCORES: Record<string, NomadScore> = {
  // ─── North India ───────────────────────────────────────────────
  'manali-hp': {
    overall: 82,
    wifi: 6,
    coworking: 5,
    costEfficiency: 9,
    community: 8,
    naturalBeauty: 10,
    professionBoost: { content_writer: 9, photographer: 10, travel_blogger: 10, ui_ux_designer: 8 },
  },
  'rishikesh-uttarakhand': {
    overall: 85,
    wifi: 7,
    coworking: 6,
    costEfficiency: 9,
    community: 9,
    naturalBeauty: 9,
    professionBoost: { content_writer: 10, career_coach: 9, online_tutor: 8, travel_blogger: 9 },
  },
  'mcleod-ganj-hp': {
    overall: 80,
    wifi: 6,
    coworking: 5,
    costEfficiency: 9,
    community: 8,
    naturalBeauty: 9,
    professionBoost: { content_writer: 10, travel_blogger: 9, career_coach: 9 },
  },
  'kasol-hp': {
    overall: 72,
    wifi: 4,
    coworking: 3,
    costEfficiency: 10,
    community: 7,
    naturalBeauty: 10,
    professionBoost: { travel_blogger: 10, photographer: 10, content_writer: 8 },
  },
  'mussoorie-uttarakhand': {
    overall: 74,
    wifi: 6,
    coworking: 4,
    costEfficiency: 8,
    community: 6,
    naturalBeauty: 9,
    professionBoost: { content_writer: 8, online_tutor: 7 },
  },
  'agra-up': {
    overall: 65,
    wifi: 7,
    coworking: 4,
    costEfficiency: 8,
    community: 5,
    naturalBeauty: 7,
  },
  'varanasi-up': {
    overall: 78,
    wifi: 7,
    coworking: 5,
    costEfficiency: 9,
    community: 7,
    naturalBeauty: 8,
    professionBoost: { photographer: 10, travel_blogger: 9, content_writer: 9 },
  },
  'jaipur-rajasthan': {
    overall: 80,
    wifi: 8,
    coworking: 6,
    costEfficiency: 8,
    community: 7,
    naturalBeauty: 7,
    professionBoost: { digital_marketer: 8, ui_ux_designer: 7, photographer: 8 },
  },

  // ─── South India ───────────────────────────────────────────────
  'coorg-karnataka': {
    overall: 83,
    wifi: 7,
    coworking: 5,
    costEfficiency: 9,
    community: 7,
    naturalBeauty: 10,
    professionBoost: { software_engineer: 9, frontend_developer: 9, content_writer: 9, photographer: 9 },
  },
  'pondicherry-tn': {
    overall: 86,
    wifi: 8,
    coworking: 7,
    costEfficiency: 8,
    community: 9,
    naturalBeauty: 8,
    professionBoost: { ui_ux_designer: 9, content_writer: 9, career_coach: 8, social_media_manager: 8 },
  },
  'hampi-karnataka': {
    overall: 76,
    wifi: 5,
    coworking: 3,
    costEfficiency: 10,
    community: 7,
    naturalBeauty: 10,
    professionBoost: { photographer: 10, travel_blogger: 10, content_writer: 8 },
  },
  'mysuru-karnataka': {
    overall: 78,
    wifi: 8,
    coworking: 5,
    costEfficiency: 8,
    community: 6,
    naturalBeauty: 8,
  },
  'munnar-kerala': {
    overall: 79,
    wifi: 6,
    coworking: 4,
    costEfficiency: 8,
    community: 6,
    naturalBeauty: 10,
    professionBoost: { photographer: 9, travel_blogger: 9, content_writer: 8 },
  },
  'ooty-tn': {
    overall: 75,
    wifi: 6,
    coworking: 4,
    costEfficiency: 8,
    community: 6,
    naturalBeauty: 9,
  },
  'varkala-kerala': {
    overall: 81,
    wifi: 7,
    coworking: 5,
    costEfficiency: 8,
    community: 8,
    naturalBeauty: 9,
    professionBoost: { travel_blogger: 9, photographer: 8, content_writer: 8 },
  },

  // ─── West India ────────────────────────────────────────────────
  'goa': {
    overall: 92,
    wifi: 9,
    coworking: 9,
    costEfficiency: 7,
    community: 10,
    naturalBeauty: 9,
    professionBoost: {
      software_engineer: 10, frontend_developer: 10, ui_ux_designer: 10,
      digital_marketer: 10, social_media_manager: 9, travel_blogger: 9,
      video_editor: 8, web3_developer: 9,
    },
  },
  'lonavala-maharashtra': {
    overall: 72,
    wifi: 7,
    coworking: 4,
    costEfficiency: 7,
    community: 6,
    naturalBeauty: 8,
  },
  'nashik-maharashtra': {
    overall: 70,
    wifi: 8,
    coworking: 5,
    costEfficiency: 8,
    community: 5,
    naturalBeauty: 7,
  },
  'udaipur-rajasthan': {
    overall: 82,
    wifi: 8,
    coworking: 6,
    costEfficiency: 8,
    community: 7,
    naturalBeauty: 9,
    professionBoost: { photographer: 9, ui_ux_designer: 8, content_writer: 8 },
  },
  'pushkar-rajasthan': {
    overall: 74,
    wifi: 6,
    coworking: 4,
    costEfficiency: 9,
    community: 7,
    naturalBeauty: 8,
    professionBoost: { travel_blogger: 9, photographer: 9 },
  },

  // ─── East & Northeast ──────────────────────────────────────────
  'darjeeling-wb': {
    overall: 78,
    wifi: 5,
    coworking: 4,
    costEfficiency: 9,
    community: 6,
    naturalBeauty: 10,
    professionBoost: { content_writer: 9, photographer: 9, travel_blogger: 8 },
  },
  'puri-odisha': {
    overall: 72,
    wifi: 6,
    coworking: 3,
    costEfficiency: 9,
    community: 5,
    naturalBeauty: 8,
  },

  // ─── Central India ─────────────────────────────────────────────
  'khajuraho-mp': {
    overall: 68,
    wifi: 6,
    coworking: 3,
    costEfficiency: 9,
    community: 4,
    naturalBeauty: 8,
    professionBoost: { photographer: 9, travel_blogger: 8 },
  },
  'pachmarhi-mp': {
    overall: 73,
    wifi: 5,
    coworking: 3,
    costEfficiency: 9,
    community: 5,
    naturalBeauty: 9,
  },

  // ─── International ─────────────────────────────────────────────
  'bali-indonesia': {
    overall: 95,
    wifi: 9,
    coworking: 10,
    costEfficiency: 9,
    community: 10,
    naturalBeauty: 10,
    professionBoost: {
      software_engineer: 10, ui_ux_designer: 10, digital_marketer: 10,
      content_writer: 10, travel_blogger: 10, web3_developer: 10,
    },
  },
  'chiang-mai-thailand': {
    overall: 93,
    wifi: 9,
    coworking: 9,
    costEfficiency: 10,
    community: 10,
    naturalBeauty: 8,
    professionBoost: { software_engineer: 10, frontend_developer: 10, digital_marketer: 9 },
  },
  'lisbon-portugal': {
    overall: 91,
    wifi: 9,
    coworking: 9,
    costEfficiency: 7,
    community: 9,
    naturalBeauty: 8,
    professionBoost: { web3_developer: 10, financial_analyst: 9, ui_ux_designer: 9 },
  },
  'medellin-colombia': {
    overall: 89,
    wifi: 8,
    coworking: 9,
    costEfficiency: 9,
    community: 9,
    naturalBeauty: 8,
    professionBoost: { software_engineer: 9, content_writer: 9, digital_marketer: 9 },
  },
};

/**
 * Returns the NomadScore for a destination ID, or a default low score if not found.
 */
export function getNomadScore(destinationId: string): NomadScore | null {
  return NOMAD_SCORES[destinationId] ?? null;
}

/**
 * Get a profession-boosted overall score for a destination.
 * If profession is provided, adds the professionBoost value (if any) to overall.
 */
export function getBoostedNomadScore(
  destinationId: string,
  profession?: NomadProfession
): number | null {
  const score = NOMAD_SCORES[destinationId];
  if (!score) return null;
  if (!profession || !score.professionBoost) return score.overall;
  const boost = score.professionBoost[profession] ?? 0;
  return Math.min(100, score.overall + boost);
}

/**
 * Wifi label for nomad score wifi value (0-10)
 */
export function getWifiLabel(wifiScore: number): string {
  if (wifiScore >= 9) return 'Excellent';
  if (wifiScore >= 7) return 'Good';
  if (wifiScore >= 5) return 'Moderate';
  return 'Spotty';
}
