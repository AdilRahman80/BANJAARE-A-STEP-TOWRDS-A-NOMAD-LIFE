import { Destination, TransitEstimate, TransportPreference } from '../types/trip';
import { INDIAN_ORIGINS } from '../data/indianOrigins';

/**
 * Approximate geographical distance and zone lookup between Indian origins and destinations
 */
function getEstimatedDistance(originName: string, destination: Destination): number {
  const normOrigin = originName.trim().toLowerCase();
  const destName = destination.name.toLowerCase();
  const destRegion = destination.region;

  // Find origin profile
  const originProfile = INDIAN_ORIGINS.find((o) =>
    o.name.toLowerCase().includes(normOrigin) || normOrigin.includes(o.name.toLowerCase().split(' ')[0])
  );

  // 1. Same city / direct vicinity (Day-trip range)
  if (normOrigin.includes(destName) || destName.includes(normOrigin)) {
    return 30;
  }

  // Known quick corridor pairings (Day trips & weekend getaways)
  if (
    (normOrigin.includes('delhi') && ['agra', 'haridwar', 'rishikesh', 'jaipur', 'mussoorie', 'dehradun'].includes(destName)) ||
    (normOrigin.includes('mumbai') && ['lonavala', 'pune', 'nashik'].includes(destName)) ||
    (normOrigin.includes('pune') && ['lonavala', 'mumbai', 'nashik', 'goa'].includes(destName)) ||
    (normOrigin.includes('bengaluru') && ['mysuru', 'coorg', 'hampi', 'ooty'].includes(destName)) ||
    (normOrigin.includes('chennai') && ['pondicherry', 'bengaluru', 'mysuru'].includes(destName)) ||
    (normOrigin.includes('kolkata') && ['puri', 'bhubaneswar', 'darjeeling'].includes(destName)) ||
    (normOrigin.includes('chandigarh') && ['manali', 'kasol', 'mcleod ganj', 'dharamshala', 'mussoorie', 'dehradun'].includes(destName)) ||
    (normOrigin.includes('jaipur') && ['pushkar', 'agra', 'delhi', 'udaipur', 'jodhpur'].includes(destName)) ||
    (normOrigin.includes('bhopal') && ['indore', 'pachmarhi', 'orchha', 'khajuraho'].includes(destName))
  ) {
    if (['lonavala', 'agra', 'haridwar', 'rishikesh', 'mysuru', 'pondicherry'].includes(destName)) {
      return 150; // Short corridor (~100-200 km)
    }
    return 280; // Medium corridor (~200-350 km)
  }

  // 2. Same region
  if (originProfile && originProfile.region === destRegion) {
    return 450;
  }

  // 3. Adjacent regions (e.g. North and Central, West and Central, South and West)
  if (
    (destRegion === 'Central India' && ['North India', 'West India'].includes(originProfile?.region || '')) ||
    (destRegion === 'West India' && originProfile?.region === 'South India') ||
    (destRegion === 'South India' && originProfile?.region === 'West India')
  ) {
    return 850;
  }

  // 4. Cross-country long distance (e.g., Delhi to Kerala/Goa, Mumbai to Northeast)
  if (destRegion === 'East & Northeast India' || originProfile?.region === 'East & Northeast India') {
    return 1800;
  }

  // General cross-country baseline
  return 1400;
}

/**
 * Estimates realistic, illustrative travel fares between an Indian origin and destination
 */
export function estimateTransportCost(
  origin: string,
  destination: Destination,
  transportPreference: TransportPreference = 'any',
  isStudentMode: boolean = false
): TransitEstimate {
  const isOriginMissing = !origin || origin.trim().length === 0;
  const distanceKm = isOriginMissing ? 500 : getEstimatedDistance(origin, destination);

  // Baseline unit economics for Indian transit:
  // Sleeper train / ordinary state bus: ~₹0.60 per km (min ₹150)
  // AC 3-Tier Train / AC Bus: ~₹1.40 per km (min ₹450)
  // Flight: Base ~₹2,500 + ₹2.5 per km (only for > 400km)
  // Cab / Road: ~₹12 per km (shared among travelers)

  const sleeperTrainCost = Math.max(150, Math.round(distanceKm * 0.65));
  const acTrainCost = Math.max(450, Math.round(distanceKm * 1.45));
  const flightCost = distanceKm < 350 ? acTrainCost * 2 : Math.round(2600 + distanceKm * 2.2);
  const roadCabCost = Math.max(400, Math.round(distanceKm * 3.5)); // Shared/cab per person equivalent

  // Duration in hours
  const trainHours = Math.max(2, Math.round(distanceKm / 55));
  const flightHours = Math.max(1.5, Math.round(distanceKm / 450 + 2.5)); // includes airport check-in
  const roadHours = Math.max(2, Math.round(distanceKm / 50));

  const modeOptions = [
    {
      mode: 'train_sleeper_bus' as TransportPreference,
      label: 'Sleeper Train / State Bus',
      estCostINR: sleeperTrainCost,
      durationHours: trainHours,
    },
    {
      mode: 'train_ac' as TransportPreference,
      label: 'AC 3-Tier Train / AC Volvo',
      estCostINR: acTrainCost,
      durationHours: trainHours,
    },
    {
      mode: 'flight' as TransportPreference,
      label: 'Economy Flight',
      estCostINR: flightCost,
      durationHours: flightHours,
    },
    {
      mode: 'road_cab' as TransportPreference,
      label: 'Shared Road Trip / Cab',
      estCostINR: roadCabCost,
      durationHours: roadHours,
    },
  ];

  // Determine primary mode based on preference, distance, and student mode
  let primaryMode: 'train_sleeper' | 'train_ac' | 'bus' | 'flight' | 'road_cab' = 'train_sleeper';
  let estCostPerPersonINR = sleeperTrainCost;
  let estDurationHours = trainHours;

  if (isStudentMode || transportPreference === 'train_sleeper_bus') {
    primaryMode = distanceKm < 200 ? 'bus' : 'train_sleeper';
    estCostPerPersonINR = sleeperTrainCost;
    estDurationHours = trainHours;
  } else if (transportPreference === 'train_ac') {
    primaryMode = 'train_ac';
    estCostPerPersonINR = acTrainCost;
    estDurationHours = trainHours;
  } else if (transportPreference === 'flight' && distanceKm >= 350) {
    primaryMode = 'flight';
    estCostPerPersonINR = flightCost;
    estDurationHours = flightHours;
  } else if (transportPreference === 'road_cab') {
    primaryMode = 'road_cab';
    estCostPerPersonINR = roadCabCost;
    estDurationHours = roadHours;
  } else {
    // Default: choose sensible mode by distance
    if (distanceKm <= 200) {
      primaryMode = 'bus';
      estCostPerPersonINR = sleeperTrainCost;
      estDurationHours = roadHours;
    } else if (distanceKm <= 800) {
      primaryMode = 'train_sleeper';
      estCostPerPersonINR = sleeperTrainCost;
      estDurationHours = trainHours;
    } else {
      primaryMode = 'train_ac';
      estCostPerPersonINR = acTrainCost;
      estDurationHours = trainHours;
    }
  }

  return {
    origin: isOriginMissing ? 'Provisional Origin' : origin.trim(),
    destinationName: destination.name,
    primaryMode,
    distanceKm,
    estCostPerPersonINR,
    estDurationHours,
    isProvisional: isOriginMissing,
    modeOptions,
  };
}

/**
 * Checks whether transportation alone consumes or exceeds the user's per-person budget
 */
export function isTransportExceedingBudget(
  transportCostPerPersonINR: number,
  targetBudgetPerPersonINR: number
): boolean {
  if (targetBudgetPerPersonINR <= 0) return false;
  // If transport consumes > 65% of the total budget per person, it is deemed out-of-budget
  return transportCostPerPersonINR >= targetBudgetPerPersonINR * 0.65;
}
