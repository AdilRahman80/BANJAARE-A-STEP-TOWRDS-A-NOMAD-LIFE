import React, { useState } from 'react';
import {
  Wallet,
  ShieldCheck,
  TrendingUp,
  Percent,
  Sparkles,
  Info,
  DollarSign,
  ArrowRight,
  Landmark,
  Calculator,
  CheckCircle2,
} from 'lucide-react';
import { calculateSection44ADATax, calculateEarnToTravelRatio } from '../utils/taxCalculator';
import { Currency } from '../types/trip';

interface FinancialPassportViewProps {
  currentCurrency: Currency;
  onShowToast: (msg: string) => void;
  onNavigateToPlanner: () => void;
}

export const FinancialPassportView: React.FC<FinancialPassportViewProps> = ({
  currentCurrency: _currentCurrency,
  onShowToast,
  onNavigateToPlanner,
}) => {
  // Annual Gross freelance income in INR
  const [annualGrossINR, setAnnualGrossINR] = useState<number>(1200000); // 12 Lakhs default
  const [activeMonthlyTripCostINR, setActiveMonthlyTripCostINR] = useState<number>(32000); // e.g. 1 month in Goa
  const [currencySymbol] = useState<string>('₹');

  const monthlyGrossINR = Math.round(annualGrossINR / 12);
  const taxResult = calculateSection44ADATax(annualGrossINR);
  const earnToTravel = calculateEarnToTravelRatio(monthlyGrossINR, activeMonthlyTripCostINR);

  const destinationBench = [
    { city: 'Goa (Assagao / Anjuna)', monthlyCost: 32000, daysToBreakEven: calculateEarnToTravelRatio(monthlyGrossINR, 32000).billableDaysNeeded },
    { city: 'Manali / Old Manali', monthlyCost: 24000, daysToBreakEven: calculateEarnToTravelRatio(monthlyGrossINR, 24000).billableDaysNeeded },
    { city: 'Varkala (North Cliff)', monthlyCost: 22000, daysToBreakEven: calculateEarnToTravelRatio(monthlyGrossINR, 22000).billableDaysNeeded },
    { city: 'Rishikesh (Tapovan)', monthlyCost: 20000, daysToBreakEven: calculateEarnToTravelRatio(monthlyGrossINR, 20000).billableDaysNeeded },
    { city: 'Bali (Canggu / Ubud)', monthlyCost: 65000, daysToBreakEven: calculateEarnToTravelRatio(monthlyGrossINR, 65000).billableDaysNeeded },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">

      {/* ─── 1. PAGE HEADER (Vita / Eloura Editorial Aesthetic) ─── */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0F262E] border border-[#1D4552] text-xs font-bold uppercase tracking-wider text-[#C98833]">
          <Wallet className="w-3.5 h-3.5" />
          <span>Nomad Financial Passport &amp; Tax Intelligence</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#FAFDFD] tracking-tight">
          Financial Freedom in Plain Numbers. <br />
          <span className="font-serif italic font-normal text-[#C98833]">Section 44ADA + Earn-to-Travel.</span>
        </h1>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          The traditional world tells you quitting the 9-to-5 loop is reckless.
          In reality, the Indian Income Tax Act offers massive presumptive benefits under Section 44ADA for freelance knowledge workers.
          See your exact tax savings, net in-hand surplus, and break-even metrics across workation destinations.
        </p>
      </div>

      {/* ─── 2. SECTION 44ADA PRESUMPTIVE TAX ENGINE ─── */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#0F262E] border border-[#1D4552] space-y-8 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#1D4552]/70">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C98833] uppercase tracking-wider mb-1">
              <Landmark className="w-4 h-4" />
              <span>Section 44ADA Presumptive Taxation Scheme</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#FAFDFD]">
              Freelance &amp; Remote Worker Tax Simulator
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Eligible for software engineers, designers, consultants, content creators earning up to ₹75 Lakhs/year.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-[#071317] border border-[#1D4552] px-4 py-2 rounded-2xl">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-bold text-slate-200">No Audit Required Under 44AA/AB</span>
          </div>
        </div>

        {/* Input Slider & Quick Presets */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <label className="text-xs sm:text-sm font-bold text-slate-200">
              Your Estimated Annual Gross Billing / Freelance Income:
            </label>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-extrabold text-[#C98833]">
                {currencySymbol}{annualGrossINR.toLocaleString('en-IN')}
              </span>
              <span className="text-xs text-slate-400">
                (~{currencySymbol}{monthlyGrossINR.toLocaleString('en-IN')}/mo)
              </span>
            </div>
          </div>

          <input
            type="range"
            min="300000"
            max="7500000"
            step="50000"
            value={annualGrossINR}
            onChange={(e) => setAnnualGrossINR(parseInt(e.target.value))}
            className="w-full h-2 bg-[#071317] rounded-lg appearance-none cursor-pointer accent-[#C98833]"
          />

          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-[11px] text-slate-400 mr-2">Presets:</span>
            {[600000, 900000, 1200000, 1800000, 2400000, 3600000, 5000000].map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => {
                  setAnnualGrossINR(preset);
                  onShowToast(`Adjusted annual income to ₹${(preset / 100000).toFixed(1)} Lakhs`);
                }}
                className={`text-xs px-3 py-1 rounded-xl transition-all ${
                  annualGrossINR === preset
                    ? 'bg-[#C98833] text-black font-bold'
                    : 'bg-[#071317] hover:bg-[#14313B] text-slate-300 border border-[#1D4552]'
                }`}
              >
                ₹{(preset / 100000).toFixed(0)}L
              </button>
            ))}
          </div>
        </div>

        {/* 4-Metric Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Card 1: 50% Presumed Expense Deduction */}
          <div className="p-5 rounded-2xl bg-[#071317] border border-[#1D4552] space-y-1">
            <div className="flex items-center justify-between text-slate-400 text-xs">
              <span>Presumed Expenses (50%)</span>
              <Percent className="w-3.5 h-3.5 text-[#C98833]" />
            </div>
            <div className="text-xl sm:text-2xl font-extrabold text-[#FAFDFD]">
              {currencySymbol}{taxResult.presumptiveExpenseDeductionINR.toLocaleString('en-IN')}
            </div>
            <p className="text-[11px] text-slate-400">
              Flat 50% automatically written off with no receipts needed.
            </p>
          </div>

          {/* Card 2: Presumptive Taxable Profit */}
          <div className="p-5 rounded-2xl bg-[#071317] border border-[#1D4552] space-y-1">
            <div className="flex items-center justify-between text-slate-400 text-xs">
              <span>Taxable Income (50%)</span>
              <TrendingUp className="w-3.5 h-3.5 text-blue-400" />
            </div>
            <div className="text-xl sm:text-2xl font-extrabold text-[#FAFDFD]">
              {currencySymbol}{taxResult.presumptiveTaxableIncomeINR.toLocaleString('en-IN')}
            </div>
            <p className="text-[11px] text-slate-400">
              The only portion evaluated for income tax slabs.
            </p>
          </div>

          {/* Card 3: Annual Tax Payable */}
          <div className="p-5 rounded-2xl bg-[#071317] border border-[#1D4552] space-y-1">
            <div className="flex items-center justify-between text-slate-400 text-xs">
              <span>Total Tax Payable</span>
              <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <div className="text-xl sm:text-2xl font-extrabold text-emerald-400">
              {currencySymbol}{taxResult.estimatedTaxPayableINR.toLocaleString('en-IN')}
            </div>
            <div className="text-[11px] font-semibold text-emerald-300">
              {taxResult.taxRebateEligible ? '100% Tax Rebate under 87A (₹0 Tax!)' : `Effective Rate: ${taxResult.effectiveTaxRatePercent}%`}
            </div>
          </div>

          {/* Card 4: Monthly In-Hand Cashflow */}
          <div className="p-5 rounded-2xl bg-[#071317] border border-[#1D4552] space-y-1">
            <div className="flex items-center justify-between text-slate-400 text-xs">
              <span>Monthly In-Hand Cash</span>
              <Sparkles className="w-3.5 h-3.5 text-[#C98833]" />
            </div>
            <div className="text-xl sm:text-2xl font-extrabold text-[#C98833]">
              {currencySymbol}{taxResult.monthlyNetInHandINR.toLocaleString('en-IN')}
            </div>
            <p className="text-[11px] text-slate-400">
              Clean post-tax liquidity for living &amp; workations.
            </p>
          </div>

        </div>

        {/* Section 44ADA Legal Note Banner */}
        <div className="p-4 rounded-2xl bg-[#14313B]/60 border border-[#1D4552] text-xs text-slate-300 flex items-start gap-3">
          <Info className="w-4 h-4 text-[#C98833] shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-bold text-[#FAFDFD]">Section 44ADA Superpower:</span>
            <p>
              Unlike salaried employees who pay high TDS with limited standard deductions, independent freelancers &amp; nomads can legally write off 50% of gross receipts as deemed business expenses (laptops, co-working desks, travel meals, fiber internet) under Section 44ADA of the Income Tax Act. Under the New Tax Regime, if your taxable portion is up to ₹7,00,000 (i.e. up to ₹14,00,000 gross annual billing), your income tax liability is ZERO thanks to Section 87A rebate!
            </p>
          </div>
        </div>
      </div>

      {/* ─── 3. EARN-TO-TRAVEL BREAK-EVEN METER ─── */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#0F262E] border border-[#1D4552] space-y-6 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C98833] uppercase tracking-wider mb-1">
              <Calculator className="w-4 h-4" />
              <span>Earn-to-Travel Feasibility Ratio</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#FAFDFD]">
              How Fast Does Your Workation Pay For Itself?
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Based on your monthly in-hand income of {currencySymbol}{taxResult.monthlyNetInHandINR.toLocaleString('en-IN')} (approx. {currencySymbol}{Math.round(taxResult.monthlyNetInHandINR / 22).toLocaleString('en-IN')}/billable day).
            </p>
          </div>

          <div className="text-right">
            <span className="text-xs text-slate-400 block">Monthly Living Budget:</span>
            <input
              type="number"
              value={activeMonthlyTripCostINR}
              onChange={(e) => setActiveMonthlyTripCostINR(parseInt(e.target.value) || 0)}
              className="text-right font-bold text-lg bg-[#071317] border border-[#1D4552] rounded-xl px-3 py-1.5 text-[#C98833] w-36 focus:outline-none focus:border-[#C98833]"
            />
          </div>
        </div>

        {/* Big Meter Highlight */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-[#071317] to-[#14313B] border border-[#C98833]/40 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="text-3xl sm:text-4xl font-extrabold text-[#C98833]">
              {earnToTravel.billableDaysNeeded} Billable Days
            </div>
            <p className="text-xs sm:text-sm text-slate-300">
              Only <span className="font-bold text-white">{earnToTravel.billableDaysNeeded} days</span> of freelance work in this month covers your entire 30-day stay, meals, transit &amp; coworking desks!
            </p>
            <p className="text-xs text-emerald-400 font-semibold flex items-center justify-center md:justify-start gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>You save {currencySymbol}{earnToTravel.monthlySurplusINR.toLocaleString('en-IN')} ({earnToTravel.savingsRatePercent}% of your income) this month.</span>
            </p>
          </div>

          <button
            type="button"
            onClick={onNavigateToPlanner}
            className="px-6 py-3 rounded-xl bg-[#C98833] hover:bg-[#DE9F4D] text-black font-bold text-xs tracking-wide shrink-0 transition-all shadow-md flex items-center gap-2"
          >
            <span>Architect Custom Trip</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Destination Benchmarks Table */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-slate-200">
            Workation Break-Even Benchmarks (at your income level)
          </h3>
          <div className="overflow-x-auto rounded-2xl border border-[#1D4552]">
            <table className="w-full text-xs text-left text-slate-300">
              <thead className="bg-[#071317] text-slate-400 uppercase font-semibold">
                <tr>
                  <th className="px-4 py-3">Destination</th>
                  <th className="px-4 py-3">Estimated Monthly Living Cost</th>
                  <th className="px-4 py-3">Billable Days to Break Even</th>
                  <th className="px-4 py-3 text-right">Net Monthly Surplus</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1D4552]/60 bg-[#0F262E]">
                {destinationBench.map((row) => {
                  const surplus = monthlyGrossINR - row.monthlyCost;
                  return (
                    <tr key={row.city} className="hover:bg-[#14313B]/50 transition-colors">
                      <td className="px-4 py-3 font-bold text-white">{row.city}</td>
                      <td className="px-4 py-3">{currencySymbol}{row.monthlyCost.toLocaleString('en-IN')}</td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-[#C98833]/15 text-[#C98833] font-bold">
                          {row.daysToBreakEven} days
                        </span>
                      </td>
                      <td className={`px-4 py-3 text-right font-bold ${surplus >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                        {surplus >= 0 ? '+' : ''}{currencySymbol}{surplus.toLocaleString('en-IN')}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

      </div>

    </div>
  );
};
