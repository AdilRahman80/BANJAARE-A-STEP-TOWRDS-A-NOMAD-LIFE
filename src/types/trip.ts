export type Currency = 'USD' | 'EUR' | 'GBP' | 'INR';

export interface CurrencyConfig {
  code: Currency;
  symbol: string;
  rateToUSD: number; // 1 USD in this currency
  label: string;
}

export type AccommodationTier = 'budget' | 'mid' | 'luxury';

export type BudgetTier = 'all' | 'ultra_budget' | 'budget' | 'student' | 'comfortable' | 'premium';

export type NomadProfession =
  | 'software_engineer'
  | 'frontend_developer'
  | 'devops_engineer'
  | 'data_scientist'
  | 'ai_ml_engineer'
  | 'technical_writer'
  | 'ui_ux_designer'
  | 'video_editor'
  | 'content_writer'
  | 'social_media_manager'
  | 'photographer'
  | 'digital_marketer'
  | 'seo_specialist'
  | 'virtual_assistant'
  | 'project_manager'
  | 'financial_analyst'
  | 'online_tutor'
  | 'career_coach'
  | 'web3_developer'
  | 'travel_blogger'
  | 'other';

export interface NomadScore {
  overall: number;        // 0–100 composite score
  wifi: number;           // 0–10: connectivity reliability
  coworking: number;      // 0–10: spaces available & quality
  costEfficiency: number; // 0–10: low cost of living relative to income potential
  community: number;      // 0–10: nomad meetups, expats, co-travellers
  naturalBeauty: number;  // 0–10: scenery, air, surroundings
  professionBoost?: Partial<Record<NomadProfession, number>>; // profession-specific score bonus
}

export interface NetSurplusResult {
  monthlyIncomeINR: number;
  monthlyAccommodationINR: number;
  monthlyFoodINR: number;
  monthlyTransitINR: number;
  monthlyActivitiesINR: number;
  monthlyTotalCostINR: number;
  monthlySurplusINR: number;  // positive = saving money, negative = spending more than earning
  weeksToBreakEven: number;   // how many weeks at income level to cover a single trip
  isSurplus: boolean;
}


export type TransportPreference = 'any' | 'train_sleeper_bus' | 'train_ac' | 'flight' | 'road_cab';

export type AccommodationPreference =
  | 'any'
  | 'hostel_dorm'
  | 'hostel_private'
  | 'guesthouse_homestay'
  | 'hotel_budget'
  | 'hotel_mid_luxury';

export type TravelStyle =
  | 'Adventure'
  | 'Culture'
  | 'Beaches'
  | 'Cuisine'
  | 'Relaxation'
  | 'Nature'
  | 'City';

export type AccommodationType =
  | 'dorm_hostel'
  | 'backpacker_hostel'
  | 'guesthouse'
  | 'homestay'
  | 'budget_hotel'
  | 'mid_hotel'
  | 'premium_resort';

export interface AccommodationOption {
  id: string;
  name: string;
  type: AccommodationType;
  roomType: 'dormitory' | 'private_room';
  estPriceINRPerPerson: number; // Illustrative benchmark rate per person per night
  neighborhood?: string;
  facilities: string[];
  suitableFor: string;
  isSampleEstimate: true; // Explicitly labeled as illustrative benchmark
}

export interface TransitEstimate {
  origin: string;
  destinationName: string;
  primaryMode: 'train_sleeper' | 'train_ac' | 'bus' | 'flight' | 'road_cab';
  distanceKm: number;
  estCostPerPersonINR: number;
  estDurationHours: number;
  isProvisional: boolean; // True if origin is missing or generalized
  modeOptions: Array<{
    mode: TransportPreference;
    label: string;
    estCostINR: number;
    durationHours: number;
  }>;
}

export interface TripPreferences {
  originCity: string;
  targetBudget: number; // Stored in USD base for universal math
  budgetPerPerson?: number; // In active currency or USD
  budgetType?: 'total' | 'per_person';
  budgetTier?: BudgetTier;
  durationDays: number;
  travelersCount: number;
  interests: TravelStyle[];
  accommodationTier: AccommodationTier;
  selectedRegion: string;
  selectedState?: string;
  travelMonth?: string;
  transportPreference?: TransportPreference;
  accommodationPreference?: AccommodationPreference;
  isStudentBackpackerMode?: boolean;
  hostelOnlyFilter?: boolean;
  roomTypePreference?: 'any' | 'dormitory' | 'private_room';
  // Phase 5 — NomadX fields
  profession?: NomadProfession;
  monthlyIncomeINR?: number; // Self-declared monthly income for net surplus calculation
  isNomadMode?: boolean;     // When true, UI pivots to nomad-first layout
}

export interface DestinationCosts {
  flightBaseUSD: number; // Base roundtrip flight per traveler from major hubs
  nightlyLodgingUSD: {
    budget: number; // Hostel / Guesthouse
    mid: number;    // 3-4 star boutique hotel / modern Airbnb
    luxury: number; // 5-star resort / luxury suite
  };
  dailyFoodUSD: number;      // Per person per day
  dailyActivitiesUSD: number; // Tours, entries, experiences
  dailyTransitUSD: number;   // Metro, cabs, local ferries
}

export interface Destination {
  id: string;
  name: string;
  country: string;
  state?: string;
  region: 'North India' | 'South India' | 'West India' | 'East & Northeast India' | 'Central India' | 'Asia' | 'Europe' | 'Americas' | 'Africa' | 'Oceania';
  imageUrl: string;
  description: string;
  tags: TravelStyle[];
  bestSeason: string;
  bestMonths?: string[]; // e.g. ['October', 'November', 'December', 'January', 'February', 'March']
  rating: number;
  reviewsCount: number;
  costEstimates: DestinationCosts;
  highlights: string[];
  recommendedDurationDays: {
    min: number;
    max: number;
  };
  isDayTripEligible?: boolean;
  accommodationOptions?: AccommodationOption[];
  freeActivities?: string[];
  safetyTips?: string[];
  sampleItinerary: Array<{
    day: number;
    title: string;
    activities: string[];
  }>;
}

export interface BudgetBreakdown {
  flightsTotal: number;
  lodgingTotal: number;
  foodTotal: number;
  activitiesTotal: number;
  transitTotal: number;
  contingencyTotal: number;
  grandTotal: number;
  perPersonTotal: number;
  dailyPerPerson: number;
  surplusDeficit: number; // Positive = savings remaining; Negative = over budget
  isWithinBudget: boolean;
  transitEstimate?: TransitEstimate;
}

export interface GroupCostSplit {
  travelersCount: number;
  totalCost: number;
  costPerPerson: number;
  savingsVsSoloPerPerson: number; // Savings realized by sharing rooms/cabs
}

export interface HostelHotelComparison {
  hostelDormNightly: number;
  budgetHotelNightly: number;
  midHotelNightly: number;
  potentialTripSavingsHostel: number;
}

export interface CategoryAllocationModifiers {
  flightsMultiplier: number;
  lodgingMultiplier: number;
  foodMultiplier: number;
  activitiesMultiplier: number;
}

export interface RecommendationMatch {
  destination: Destination;
  matchScore: number; // 0 to 100 percentage
  reasons: string[];
  estimatedTripCost: number;
  isBudgetFit: boolean;
  budgetDifference: number; // targetBudget - estimatedTripCost
  transitEstimate?: TransitEstimate;
  isDayTrip?: boolean;
  isStudentRecommended?: boolean;
  hostelAvailable?: boolean;
  freeActivitiesCount?: number;
  isTransportOverBudget?: boolean;
}
