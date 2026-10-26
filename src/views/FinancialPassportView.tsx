import React, { useState, useEffect } from 'react';
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
  Plus,
  Trash2,
  Calendar,
  Globe2,
  Clock,
  AlertTriangle,
} from 'lucide-react';
import { calculateSection44ADATax, calculateEarnToTravelRatio } from '../utils/taxCalculator';
import { Currency } from '../types/trip';
import { useAuth } from '../context/AuthContext';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

interface FinancialPassportViewProps {
  currentCurrency: Currency;
  onShowToast: (msg: string) => void;
  onNavigateToPlanner: () => void;
}

interface ExpenseLog {
  id: string;
  category: 'Stay' | 'Coworking' | 'Food' | 'Transit' | 'Leisure';
  title: string;
  amountINR: number;
  date: string;
}

const DEFAULT_EXPENSES: ExpenseLog[] = [
  { id: 'exp-1', category: 'Stay', title: 'Assagao Garden Villa (1 Week)', amountINR: 8500, date: 'Today' },
  { id: 'exp-2', category: 'Coworking', title: 'Clay Cafe 100Mbps Weekly Pass', amountINR: 2200, date: 'Yesterday' },
  { id: 'exp-3', category: 'Transit', title: 'Activa Scooter 7-Day Rental', amountINR: 2100, date: '2 days ago' },
  { id: 'exp-4', category: 'Food', title: 'Grounded Cafe Pour-Over & Brunch', amountINR: 750, date: '3 days ago' },
];

export const FinancialPassportView: React.FC<FinancialPassportViewProps> = ({
  currentCurrency: _currentCurrency,
  onShowToast,
  onNavigateToPlanner,
}) => {
  const { user } = useAuth();
  // Annual Gross freelance income in INR
  const [annualGrossINR, setAnnualGrossINR] = useState<number>(1200000); // 12 Lakhs default
  const [activeMonthlyTripCostINR, setActiveMonthlyTripCostINR] = useState<number>(32000); // e.g. 1 month in Goa
  const [currencySymbol] = useState<string>('₹');

  // Real-time expense tracker
  const [expenses, setExpenses] = useState<ExpenseLog[]>(DEFAULT_EXPENSES);
  const [newExpenseTitle, setNewExpenseTitle] = useState<string>('');
  const [newExpenseCategory, setNewExpenseCategory] = useState<'Stay' | 'Coworking' | 'Food' | 'Transit' | 'Leisure'>('Food');
  const [newExpenseAmount, setNewExpenseAmount] = useState<number>(500);

  // Tax Residency Days counter (182 days rule)
  const [daysOutsideHome, setDaysOutsideHome] = useState<number>(75);

  useEffect(() => {
    if (!isSupabaseConfigured || !user) return;
    
    async function fetchExpenses() {
      try {
        const { data, error } = await supabase
          .from('user_expenses')
          .select('*')
          .eq('user_id', user!.id)
          .order('created_at', { ascending: false });

        if (!error && data && data.length > 0) {
          const mapped: ExpenseLog[] = data.map((d: any) => ({
            id: d.id,
            category: d.category as ExpenseLog['category'],
            title: d.title,
            amountINR: d.amount_inr,
            date: new Date(d.created_at).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }),
          }));
          setExpenses(mapped);
        }
      } catch (err) {
        console.warn('Failed to fetch expenses from Supabase:', err);
      }
    }

    fetchExpenses();
  }, [user]);

  const monthlyGrossINR = Math.round(annualGrossINR / 12);
  const taxResult = calculateSection44ADATax(annualGrossINR);
  const earnToTravel = calculateEarnToTravelRatio(monthlyGrossINR, activeMonthlyTripCostINR);

  const totalSpentSoFar = expenses.reduce((sum, e) => sum + e.amountINR, 0);
  const remainingBudget = Math.max(0, activeMonthlyTripCostINR - totalSpentSoFar);
  const liveNetSurplus = monthlyGrossINR - totalSpentSoFar;

  const destinationBench = [
    { city: 'Goa (Assagao / Anjuna)', monthlyCost: 32000, daysToBreakEven: calculateEarnToTravelRatio(monthlyGrossINR, 32000).billableDaysNeeded },
    { city: 'Manali / Old Manali', monthlyCost: 24000, daysToBreakEven: calculateEarnToTravelRatio(monthlyGrossINR, 24000).billableDaysNeeded },
    { city: 'Varkala (North Cliff)', monthlyCost: 22000, daysToBreakEven: calculateEarnToTravelRatio(monthlyGrossINR, 22000).billableDaysNeeded },
    { city: 'Rishikesh (Tapovan)', monthlyCost: 20000, daysToBreakEven: calculateEarnToTravelRatio(monthlyGrossINR, 20000).billableDaysNeeded },
    { city: 'Bali (Canggu / Ubud)', monthlyCost: 65000, daysToBreakEven: calculateEarnToTravelRatio(monthlyGrossINR, 65000).billableDaysNeeded },
  ];

  const handleAddExpense = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newExpenseTitle.trim()) return;

    const tempId = `exp-${Date.now()}`;
    const created: ExpenseLog = {
      id: tempId,
      category: newExpenseCategory,
      title: newExpenseTitle,
      amountINR: newExpenseAmount,
      date: 'Just now',
    };

    setExpenses([created, ...expenses]);
    setNewExpenseTitle('');
    onShowToast(`Logged expense: ${currencySymbol}${newExpenseAmount} for ${newExpenseTitle}`);

    if (isSupabaseConfigured && user) {
      try {
        const { data } = await supabase
          .from('user_expenses')
          .insert({
            user_id: user.id,
            category: newExpenseCategory,
            title: newExpenseTitle,
            amount_inr: newExpenseAmount,
          })
          .select()
          .single();

        if (data) {
          setExpenses((prev) => prev.map((exp) => (exp.id === tempId ? { ...exp, id: data.id } : exp)));
        }
      } catch (err) {
        console.warn('Failed to sync expense to Supabase:', err);
      }
    }
  };

  const handleDeleteExpense = async (id: string) => {
    setExpenses(expenses.filter((e) => e.id !== id));
    if (isSupabaseConfigured && user && !id.startsWith('exp-')) {
      try {
        await supabase.from('user_expenses').delete().eq('id', id);
      } catch (err) {
        console.warn('Failed to delete expense from Supabase:', err);
      }
    }
  };

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
          See your exact tax savings, net in-hand surplus, stay duration rules, and live daily expense tracking.
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

      {/* ─── 4. LIVE EXPENSE & SURPLUS MICRO-LEDGER (Novel Value-Add Feature) ─── */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#0F262E] border border-[#1D4552] space-y-6 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#1D4552]/70">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C98833] uppercase tracking-wider mb-1">
              <Calendar className="w-4 h-4" />
              <span>Live Workation Micro-Ledger</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#FAFDFD]">
              Track Real-Time On-Ground Spending
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Log your daily coffees, coworking passes, and stay costs. See if your projected surplus holds true.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="px-3.5 py-2 rounded-xl bg-[#071317] border border-[#1D4552] text-xs">
              <span className="text-slate-400 block text-[10px]">Total Spent:</span>
              <span className="text-base font-bold text-[#FAFDFD]">{currencySymbol}{totalSpentSoFar.toLocaleString('en-IN')}</span>
            </div>
            <div className="px-3.5 py-2 rounded-xl bg-[#071317] border border-[#1D4552] text-xs">
              <span className="text-slate-400 block text-[10px]">Budget Remaining:</span>
              <span className="text-base font-bold text-[#C98833]">{currencySymbol}{remainingBudget.toLocaleString('en-IN')}</span>
            </div>
            <div className="px-3.5 py-2 rounded-xl bg-[#071317] border border-[#1D4552] text-xs">
              <span className="text-slate-400 block text-[10px]">Net Surplus Left:</span>
              <span className="text-base font-bold text-emerald-400">+{currencySymbol}{liveNetSurplus.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>

        {/* Log New Expense Bar */}
        <form onSubmit={handleAddExpense} className="grid grid-cols-1 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-[#071317] border border-[#1D4552]">
          <div className="sm:col-span-2">
            <input
              type="text"
              required
              value={newExpenseTitle}
              onChange={(e) => setNewExpenseTitle(e.target.value)}
              placeholder="Expense description (e.g. Clay Coworking Pass, Sunset Dinner)"
              className="w-full px-3 py-2 bg-[#0F262E] border border-[#1D4552] rounded-xl text-xs text-white focus:outline-none focus:border-[#C98833]"
            />
          </div>
          <div>
            <select
              value={newExpenseCategory}
              onChange={(e) => setNewExpenseCategory(e.target.value as any)}
              className="w-full px-3 py-2 bg-[#0F262E] border border-[#1D4552] rounded-xl text-xs text-white focus:outline-none focus:border-[#C98833]"
            >
              <option value="Stay">Stay</option>
              <option value="Coworking">Coworking Pass</option>
              <option value="Food">Food &amp; Dining</option>
              <option value="Transit">Transit &amp; Scooter</option>
              <option value="Leisure">Leisure &amp; Treks</option>
            </select>
          </div>
          <div className="flex gap-2">
            <input
              type="number"
              required
              value={newExpenseAmount}
              onChange={(e) => setNewExpenseAmount(parseInt(e.target.value) || 0)}
              className="w-24 px-3 py-2 bg-[#0F262E] border border-[#1D4552] rounded-xl text-xs text-[#C98833] font-bold focus:outline-none focus:border-[#C98833]"
            />
            <button
              type="submit"
              className="flex-1 py-2 px-3 rounded-xl bg-[#C98833] hover:bg-[#DE9F4D] text-black font-bold text-xs flex items-center justify-center gap-1 shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Log</span>
            </button>
          </div>
        </form>

        {/* Expenses List */}
        <div className="space-y-2">
          {expenses.map((exp) => (
            <div
              key={exp.id}
              className="p-3.5 rounded-xl bg-[#071317]/80 border border-[#1D4552] flex items-center justify-between text-xs"
            >
              <div className="flex items-center gap-3">
                <span className="px-2 py-0.5 rounded-md bg-[#14313B] text-[10px] font-bold text-[#C98833] border border-[#1D4552]">
                  {exp.category}
                </span>
                <span className="font-semibold text-white">{exp.title}</span>
                <span className="text-slate-400 text-[11px] hidden sm:inline">• {exp.date}</span>
              </div>

              <div className="flex items-center gap-3">
                <span className="font-bold text-[#C98833]">{currencySymbol}{exp.amountINR.toLocaleString('en-IN')}</span>
                <button
                  type="button"
                  onClick={() => handleDeleteExpense(exp.id)}
                  className="text-slate-500 hover:text-red-400 p-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ─── 5. STAY DURATION & PERMIT INTELLIGENCE (Novel Value-Add Feature) ─── */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#0F262E] border border-[#1D4552] space-y-6 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#1D4552]/70">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C98833] uppercase tracking-wider mb-1">
              <Globe2 className="w-4 h-4" />
              <span>Stay Duration &amp; Legal Residency Intelligence</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#FAFDFD]">
              Permit Limits &amp; 182-Day Tax Residency Safe Zone
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Know exactly how long you can remain in specific Indian restricted zones and international digital nomad havens.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-[#071317] border border-[#1D4552] px-3.5 py-1.5 rounded-xl text-xs">
            <Clock className="w-4 h-4 text-[#C98833]" />
            <span className="font-bold text-slate-200">Days Travelled:</span>
            <input
              type="number"
              min="0"
              max="365"
              value={daysOutsideHome}
              onChange={(e) => setDaysOutsideHome(parseInt(e.target.value) || 0)}
              className="w-14 bg-[#0F262E] border border-[#1D4552] text-[#C98833] font-bold rounded-lg px-2 py-0.5 text-center text-xs focus:outline-none focus:border-[#C98833]"
            />
            <span className="text-slate-400 text-[11px]">/ 182</span>
          </div>
        </div>

        {/* 182-Day Tax Residency Meter */}
        <div className="p-5 rounded-2xl bg-[#071317] border border-[#1D4552] space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-200">Indian 182-Day Resident/Non-Resident Safe Zone</span>
            <span className="text-[#C98833] font-bold">{182 - daysOutsideHome} days remaining before status shift</span>
          </div>
          <div className="w-full h-2.5 bg-[#0F262E] rounded-full overflow-hidden border border-[#1D4552]">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-[#C98833] rounded-full"
              style={{ width: `${Math.min(100, Math.round((daysOutsideHome / 182) * 100))}%` }}
            />
          </div>
          <div className="flex items-center gap-2 text-[11px] text-slate-400">
            <AlertTriangle className="w-3.5 h-3.5 text-[#C98833] shrink-0" />
            <span>If spending 182+ days outside India, you may qualify for Non-Resident Indian (NRI) tax treatment on foreign freelance clients.</span>
          </div>
        </div>

        {/* Global & Domestic Permit Rules Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-[#071317] border border-[#1D4552] space-y-1.5">
            <div className="font-bold text-[#C98833]">Ladakh / Spiti (ILP/PAP)</div>
            <div className="text-slate-200 font-semibold">15 Days Renewable</div>
            <p className="text-[11px] text-slate-400">
              Inner Line Permits required for Nubra Valley, Pangong Tso, Hanle dark sky reserve.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#071317] border border-[#1D4552] space-y-1.5">
            <div className="font-bold text-emerald-400">Bali / Indonesia (B211A)</div>
            <div className="text-slate-200 font-semibold">60 Days (Ext. up to 180 Days)</div>
            <p className="text-[11px] text-slate-400">
              Remote worker visa allows working for clients outside Indonesia tax-free.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#071317] border border-[#1D4552] space-y-1.5">
            <div className="font-bold text-purple-400">Thailand DTV Nomad Visa</div>
            <div className="text-slate-200 font-semibold">180 Days Multiple Entry (5 Yrs)</div>
            <p className="text-[11px] text-slate-400">
              Requires 500,000 THB savings proof; permits full remote digital employment.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#071317] border border-[#1D4552] space-y-1.5">
            <div className="font-bold text-blue-400">Goa &amp; Coastal States</div>
            <div className="text-slate-200 font-semibold">Unlimited (Domestic Nomads)</div>
            <p className="text-[11px] text-slate-400">
              Rent agreements over 11 months require local tenant police verification.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};
