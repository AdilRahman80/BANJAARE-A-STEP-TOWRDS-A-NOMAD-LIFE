import { Destination, NetSurplusResult, TripPreferences, AccommodationTier } from '../types/trip';

const INR_RATE = 83.5;

/**
 * Calculates Net Monthly Surplus for a nomad living at a destination on their declared income.
 * All costs are illustrative benchmarks.
 *
 * @param destination - The destination being evaluated
 * @param monthlyIncomeINR - Nomad's self-declared monthly income in INR
 * @param accommodationTier - Budget tier for lodging
 * @param durationDays - Planned stay in days (used for daily cost projections)
 */
export function calculateNetSurplus(
  destination: Destination,
  monthlyIncomeINR: number,
  accommodationTier: AccommodationTier,
  durationDays: number = 30,
  preferences?: Partial<TripPreferences>
): NetSurplusResult {
  const safeIncome = Math.max(0, monthlyIncomeINR);

  // Monthly days
  const monthDays = 30;

  // Accommodation — per person per night in INR
  const nightlyUSD = destination.costEstimates.nightlyLodgingUSD[accommodationTier];
  const nightlyINR = nightlyUSD * INR_RATE;

  // For hostel mode, use lowest available accommodation option if present
  let effectiveNightlyINR = nightlyINR;
  if (
    (accommodationTier === 'budget' || preferences?.hostelOnlyFilter) &&
    destination.accommodationOptions &&
    destination.accommodationOptions.length > 0
  ) {
    const dormOption = destination.accommodationOptions.find((a) => a.roomType === 'dormitory');
    if (dormOption) {
      effectiveNightlyINR = dormOption.estPriceINRPerPerson;
    }
  }

  const monthlyAccommodationINR = Math.round(effectiveNightlyINR * monthDays);

  // Food — per person per day → monthly
  const dailyFoodINR = (destination.costEstimates.dailyFoodUSD * INR_RATE);
  const monthlyFoodINR = Math.round(dailyFoodINR * monthDays);

  // Daily transit (local — metro, autos, cabs within city) → monthly
  const dailyTransitINR = (destination.costEstimates.dailyTransitUSD * INR_RATE);
  const monthlyTransitINR = Math.round(dailyTransitINR * monthDays);

  // Activities — 50% of daily estimate (nomads don't sightsee every day)
  const dailyActivitiesINR = (destination.costEstimates.dailyActivitiesUSD * INR_RATE) * 0.5;
  const monthlyActivitiesINR = Math.round(dailyActivitiesINR * monthDays);

  const monthlyTotalCostINR = monthlyAccommodationINR + monthlyFoodINR + monthlyTransitINR + monthlyActivitiesINR;
  const monthlySurplusINR = safeIncome - monthlyTotalCostINR;
  const isSurplus = monthlySurplusINR > 0;

  // Weeks to earn enough to pay for the trip (based on daily projected income)
  const tripCostINR = Math.round((monthlyTotalCostINR / monthDays) * Math.min(durationDays, monthDays));
  const weeklyIncomeINR = safeIncome / 4.33;
  const weeksToBreakEven = weeklyIncomeINR > 0 ? Math.ceil(tripCostINR / weeklyIncomeINR) : 999;

  return {
    monthlyIncomeINR: safeIncome,
    monthlyAccommodationINR,
    monthlyFoodINR,
    monthlyTransitINR,
    monthlyActivitiesINR,
    monthlyTotalCostINR,
    monthlySurplusINR,
    weeksToBreakEven,
    isSurplus,
  };
}

/**
 * Returns a human-friendly summary string for the surplus result.
 */
export function getSurplusSummary(result: NetSurplusResult, destinationName: string): string {
  if (result.isSurplus) {
    return `Living in ${destinationName} you save ₹${result.monthlySurplusINR.toLocaleString()} per month on your current income.`;
  }
  return `Living in ${destinationName} costs ₹${Math.abs(result.monthlySurplusINR).toLocaleString()} more than your monthly income. Consider a higher income source or cheaper accommodation.`;
}
