import React from 'react';
import {
  Destination,
  TripPreferences,
  CategoryAllocationModifiers,
  Currency,
} from '../../types/trip';
import {
  calculateBudgetBreakdown,
  calculateGroupCostSplit,
  calculateHostelHotelComparison,
  formatCurrency,
} from '../../utils/budgetCalculator';
import { CostBreakdownCard } from './CostBreakdownCard';
import { BudgetSummaryExport } from './BudgetSummaryExport';
import {
  Calculator,
  Plane,
  Hotel,
  Utensils,
  Compass,
  Bus,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  Users,
  Bed,
} from 'lucide-react';

interface BudgetOverviewProps {
  destination: Destination;
  allDestinations: Destination[];
  onSelectDestination: (dest: Destination) => void;
  preferences: TripPreferences;
  categoryModifiers: CategoryAllocationModifiers;
  onUpdateModifier: (key: keyof CategoryAllocationModifiers, val: number) => void;
  onResetModifiers: () => void;
  currentCurrency: Currency;
  onShowToast: (msg: string) => void;
}

export const BudgetOverview: React.FC<BudgetOverviewProps> = ({
  destination,
  allDestinations,
  onSelectDestination,
  preferences,
  categoryModifiers,
  onUpdateModifier,
  onResetModifiers,
  currentCurrency,
  onShowToast,
}) => {
  const breakdown = calculateBudgetBreakdown(destination, preferences, categoryModifiers);

  // Compute percentages
  const calcPercent = (val: number) =>
    breakdown.grandTotal > 0 ? Math.round((val / breakdown.grandTotal) * 100) : 0;

  const budgetUsagePercent = Math.min(
    150,
    Math.round((breakdown.grandTotal / Math.max(1, preferences.targetBudget)) * 100)
  );

  const groupSplits = calculateGroupCostSplit(destination, preferences, categoryModifiers);

  const isIndiaWithAccommodations =
    destination.country === 'India' &&
    Boolean(destination.accommodationOptions && destination.accommodationOptions.length > 0);

  const hostelComparison = isIndiaWithAccommodations
    ? calculateHostelHotelComparison(destination, preferences.durationDays)
    : null;

  const nights = Math.max(1, preferences.durationDays > 1 ? preferences.durationDays - 1 : 1);
  const tripSavingsVsMid = hostelComparison
    ? (hostelComparison.midHotelNightly - hostelComparison.hostelDormNightly) *
      nights *
      preferences.travelersCount
    : 0;

  return (
    <section id="budget-calculator" className="py-16 sm:py-24 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 mb-2">
              <Calculator className="w-3.5 h-3.5" /> Step 3: Interactive Cost Estimator
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              Travel Budget Breakdown
            </h2>
            <p className="mt-1 text-sm sm:text-base text-slate-600">
              Real-time expense projection for <strong>{destination.name}, {destination.country}</strong> across all core spending categories.
            </p>
          </div>

          {/* Destination Selector & Action */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5">
              <span className="text-xs font-medium text-slate-500">Destination:</span>
              <select
                value={destination.id}
                onChange={(e) => {
                  const found = allDestinations.find((d) => d.id === e.target.value);
                  if (found) onSelectDestination(found);
                }}
                className="bg-transparent text-xs font-bold text-slate-900 focus:outline-none cursor-pointer"
                aria-label="Switch active destination"
              >
                {allDestinations.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name}, {d.country}
                  </option>
                ))}
              </select>
            </div>

            <BudgetSummaryExport
              destination={destination}
              preferences={preferences}
              breakdown={breakdown}
              currentCurrency={currentCurrency}
              onShowToast={onShowToast}
            />
          </div>
        </div>

        {/* Status Comparison Card */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-3xl p-6 sm:p-8 shadow-xl mb-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            
            {/* Left: Target vs Total */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 text-slate-300">
                  {preferences.durationDays} Days • {preferences.travelersCount} Traveler{preferences.travelersCount > 1 ? 's' : ''} • {preferences.accommodationTier} Stay
                </span>

                {breakdown.isWithinBudget ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Within Target (+{formatCurrency(breakdown.surplusDeficit, currentCurrency)} surplus)
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    Exceeds Target by {formatCurrency(Math.abs(breakdown.surplusDeficit), currentCurrency)}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <div className="text-xs uppercase tracking-wider text-slate-400 font-medium">
                    Total Estimated Trip Cost
                  </div>
                  <div className="text-3xl sm:text-4xl font-extrabold text-white mt-1">
                    {formatCurrency(breakdown.grandTotal, currentCurrency)}
                  </div>
                </div>

                <div>
                  <div className="text-xs uppercase tracking-wider text-slate-400 font-medium">
                    Your Target Budget
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold text-slate-300 mt-1">
                    {formatCurrency(preferences.targetBudget, currentCurrency)}
                  </div>
                </div>
              </div>

              {/* Budget Progress Bar */}
              <div className="space-y-1.5 pt-2">
                <div className="flex justify-between text-xs text-slate-400 font-medium">
                  <span>Budget Utilization</span>
                  <span className={breakdown.isWithinBudget ? 'text-emerald-400' : 'text-amber-400'}>
                    {budgetUsagePercent}% of target
                  </span>
                </div>
                <div className="w-full h-3 bg-slate-700/80 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 rounded-full ${
                      breakdown.isWithinBudget
                        ? 'bg-gradient-to-r from-emerald-500 to-teal-400'
                        : 'bg-gradient-to-r from-amber-500 to-rose-500'
                    }`}
                    style={{ width: `${Math.min(100, budgetUsagePercent)}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Right: Key Per-Person Metrics */}
            <div className="bg-white/10 rounded-2xl p-5 border border-white/10 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-blue-400" /> Per-Traveler Economics
              </h4>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-300">Total Per Person:</span>
                  <span className="text-base font-bold text-white">
                    {formatCurrency(breakdown.perPersonTotal, currentCurrency)}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-300">Daily Spend / Person:</span>
                  <span className="text-base font-bold text-white">
                    {formatCurrency(breakdown.dailyPerPerson, currentCurrency)} / day
                  </span>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-white/10">
                  <span className="text-xs text-slate-300">Safety Buffer (10%):</span>
                  <span className="text-xs font-semibold text-emerald-300">
                    {formatCurrency(breakdown.contingencyTotal, currentCurrency)}
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Category Breakdown Grid with Interactive Sliders */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-slate-900">
              Itemized Cost Categories
            </h3>
            <button
              type="button"
              onClick={onResetModifiers}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-slate-800 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset Spending Adjustments
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* 1. Flights */}
            <CostBreakdownCard
              title="Flights & Transport"
              icon={Plane}
              amountUSD={breakdown.flightsTotal}
              percentage={calcPercent(breakdown.flightsTotal)}
              currentCurrency={currentCurrency}
              colorClass="text-blue-600"
              bgClass="bg-blue-50"
              description={`Roundtrip airfare estimates for ${preferences.travelersCount} traveler(s) from ${preferences.originCity || 'major international hub'}.`}
              multiplier={categoryModifiers.flightsMultiplier}
              onMultiplierChange={(val) => onUpdateModifier('flightsMultiplier', val)}
            />

            {/* 2. Lodging */}
            <CostBreakdownCard
              title="Lodging & Stays"
              icon={Hotel}
              amountUSD={breakdown.lodgingTotal}
              percentage={calcPercent(breakdown.lodgingTotal)}
              currentCurrency={currentCurrency}
              colorClass="text-indigo-600"
              bgClass="bg-indigo-50"
              description={`${Math.max(1, preferences.durationDays - 1)} nights in ${preferences.accommodationTier} accommodations (${Math.max(1, Math.ceil(preferences.travelersCount / 2))} room/unit needed).`}
              multiplier={categoryModifiers.lodgingMultiplier}
              onMultiplierChange={(val) => onUpdateModifier('lodgingMultiplier', val)}
            />

            {/* 3. Food & Dining */}
            <CostBreakdownCard
              title="Food & Dining"
              icon={Utensils}
              amountUSD={breakdown.foodTotal}
              percentage={calcPercent(breakdown.foodTotal)}
              currentCurrency={currentCurrency}
              colorClass="text-amber-600"
              bgClass="bg-amber-50"
              description={`Covers breakfast, lunch, cafe breaks, and dinners for ${preferences.durationDays} days.`}
              multiplier={categoryModifiers.foodMultiplier}
              onMultiplierChange={(val) => onUpdateModifier('foodMultiplier', val)}
            />

            {/* 4. Activities & Tours */}
            <CostBreakdownCard
              title="Activities & Experiences"
              icon={Compass}
              amountUSD={breakdown.activitiesTotal}
              percentage={calcPercent(breakdown.activitiesTotal)}
              currentCurrency={currentCurrency}
              colorClass="text-emerald-600"
              bgClass="bg-emerald-50"
              description="Guided expeditions, national park permits, museum passes, and water sports."
              multiplier={categoryModifiers.activitiesMultiplier}
              onMultiplierChange={(val) => onUpdateModifier('activitiesMultiplier', val)}
            />

            {/* 5. Local Transit */}
            <CostBreakdownCard
              title="Local Transit"
              icon={Bus}
              amountUSD={breakdown.transitTotal}
              percentage={calcPercent(breakdown.transitTotal)}
              currentCurrency={currentCurrency}
              colorClass="text-sky-600"
              bgClass="bg-sky-50"
              description="Subways, airport rail transfers, ferries, and on-demand ride shares."
            />

            {/* 6. Contingency Buffer */}
            <CostBreakdownCard
              title="Contingency Fund (10%)"
              icon={ShieldCheck}
              amountUSD={breakdown.contingencyTotal}
              percentage={calcPercent(breakdown.contingencyTotal)}
              currentCurrency={currentCurrency}
              colorClass="text-teal-600"
              bgClass="bg-teal-50"
              description="Recommended 10% safety margin for unexpected delays, medical needs, or impulse shopping."
            />
          </div>
        </div>

        {/* Interactive Analytics Widgets: Group Cost Split & Hostel Savings */}
        <div className={`mt-8 grid grid-cols-1 ${destination.country === 'India' && destination.accommodationOptions && destination.accommodationOptions.length > 0 ? 'lg:grid-cols-2' : ''} gap-6`}>
          
          {/* Widget 1: Group Cost Split */}
          <div className="bg-slate-50/80 rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <span>👥 Group Cost Split</span>
                </h3>
                <span className="text-xs text-slate-500 font-medium">Per-person cost by group size</span>
              </div>
              <p className="text-xs text-slate-600 mb-4">
                See how sharing rooms, cabs, and transit reduces individual expenses compared to solo travel.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {groupSplits.map((split) => {
                  const isCurrent = preferences.travelersCount === split.travelersCount;
                  return (
                    <div
                      key={split.travelersCount}
                      className={`p-3 rounded-xl border text-center transition-all ${
                        isCurrent
                          ? 'bg-blue-50/90 border-blue-500 ring-2 ring-blue-500/20 shadow-xs'
                          : 'bg-white border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-center gap-1 text-xs font-semibold text-slate-700 mb-1">
                        <Users className={`w-3.5 h-3.5 ${isCurrent ? 'text-blue-600' : 'text-slate-500'}`} />
                        <span>{split.travelersCount} {split.travelersCount === 1 ? 'Traveler' : 'Travelers'}</span>
                      </div>
                      <div className="text-base font-extrabold text-slate-900">
                        {formatCurrency(split.costPerPerson, currentCurrency)}
                      </div>
                      <div className="text-[10px] text-slate-500">per person</div>
                      <div className="mt-2 pt-2 border-t border-slate-100">
                        {split.savingsVsSoloPerPerson > 0 ? (
                          <span className="text-[11px] font-bold text-emerald-600">
                            Save {formatCurrency(split.savingsVsSoloPerPerson, currentCurrency)}
                          </span>
                        ) : (
                          <span className="text-[11px] text-slate-400">Solo baseline</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-200/60 text-[11px] text-slate-500 text-center">
              Current selection: <strong className="text-slate-800">{preferences.travelersCount} traveler{preferences.travelersCount > 1 ? 's' : ''}</strong> ({formatCurrency(breakdown.perPersonTotal, currentCurrency)} / person)
            </div>
          </div>

          {/* Widget 2: Hostel vs Hotel Savings (Only for India destinations with accommodation options) */}
          {destination.country === 'India' && destination.accommodationOptions && destination.accommodationOptions.length > 0 && (
            <div className="bg-slate-50/80 rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <Bed className="w-4 h-4 text-[#C98833]" />
                    <span>Hostel vs Hotel Savings</span>
                  </h3>
                  <span className="text-[11px] font-semibold text-slate-500 bg-slate-200/60 px-2 py-0.5 rounded">
                    Illustrative estimate
                  </span>
                </div>
                <p className="text-xs text-slate-600 mb-4">
                  Compare estimated per-person lodging costs for {nights} night{nights > 1 ? 's' : ''} in {destination.name}.
                </p>

                {hostelComparison && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-2.5">
                      {/* Hostel Dorm */}
                      <div className="p-3 rounded-xl bg-teal-50/80 border border-teal-200 text-center">
                        <div className="text-xs font-bold text-teal-900 mb-0.5">Hostel Dorm</div>
                        <div className="text-base font-extrabold text-teal-700">
                          ₹{hostelComparison.hostelDormNightly.toLocaleString()}
                        </div>
                        <div className="text-[10px] text-teal-800/80 mt-0.5">/ person / night</div>
                      </div>

                      {/* Budget Hotel */}
                      <div className="p-3 rounded-xl bg-amber-50/80 border border-amber-200 text-center">
                        <div className="text-xs font-bold text-amber-900 mb-0.5">Budget Hotel</div>
                        <div className="text-base font-extrabold text-amber-700">
                          ₹{hostelComparison.budgetHotelNightly.toLocaleString()}
                        </div>
                        <div className="text-[10px] text-amber-800/80 mt-0.5">/ person / night</div>
                      </div>

                      {/* Mid Hotel */}
                      <div className="p-3 rounded-xl bg-indigo-50/80 border border-indigo-200 text-center">
                        <div className="text-xs font-bold text-indigo-900 mb-0.5">Mid Hotel</div>
                        <div className="text-base font-extrabold text-indigo-700">
                          ₹{hostelComparison.midHotelNightly.toLocaleString()}
                        </div>
                        <div className="text-[10px] text-indigo-800/80 mt-0.5">/ person / night</div>
                      </div>
                    </div>

                    {/* Total Trip Savings Banner */}
                    <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-center text-xs font-bold text-emerald-800 flex items-center justify-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>You save ₹{tripSavingsVsMid.toLocaleString()} by choosing hostel over mid hotel for this trip</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200/60 text-[11px] text-slate-500 text-center">
                Illustrative estimate — rates may vary based on seasonal demand and booking lead time.
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
