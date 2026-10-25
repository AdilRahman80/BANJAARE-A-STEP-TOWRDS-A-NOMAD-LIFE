import React, { useState } from 'react';
import { Search, X, Zap, Briefcase, ChevronDown, TrendingUp } from 'lucide-react';
import { TravelStyle, BudgetTier, NomadProfession } from '../../types/trip';
import { PROFESSION_LIST, PROFESSION_CATEGORIES } from '../../data/professions';

interface HeroSectionProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedInterests: TravelStyle[];
  onToggleInterest: (style: TravelStyle) => void;
  onExploreClick: () => void;
  isStudentMode?: boolean;
  onToggleStudentMode?: () => void;
  selectedBudgetTier?: BudgetTier;
  onSelectBudgetTier?: (tier: BudgetTier) => void;
  selectedProfession?: NomadProfession;
  onSelectProfession?: (profession: NomadProfession) => void;
  monthlyIncomeINR?: number;
  onSetMonthlyIncome?: (income: number) => void;
}

const STATS = [
  { value: '44+', label: 'Nomad Destinations', color: 'text-indigo-400' },
  { value: '21', label: 'Remote Professions', color: 'text-violet-400' },
  { value: '₹0', label: 'Platform Fee', color: 'text-emerald-400' },
  { value: '100%', label: 'Browser-Private', color: 'text-amber-400' },
];

const INCOME_PRESETS = [
  { label: '₹30k', value: 30000 },
  { label: '₹50k', value: 50000 },
  { label: '₹75k', value: 75000 },
  { label: '₹1L', value: 100000 },
  { label: '₹1.5L', value: 150000 },
];

export const HeroSection: React.FC<HeroSectionProps> = ({
  searchQuery,
  onSearchChange,
  onExploreClick,
  selectedProfession,
  onSelectProfession,
  monthlyIncomeINR = 60000,
  onSetMonthlyIncome,
}) => {
  const [professionOpen, setProfessionOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('Tech');

  const selectedMeta = selectedProfession
    ? PROFESSION_LIST.find((p) => p.id === selectedProfession)
    : null;

  const filteredProfessions = PROFESSION_LIST.filter((p) => p.category === activeCategory);

  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-slate-950">

      {/* Ambient background blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-indigo-700/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-[500px] h-[500px] bg-violet-700/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-amber-600/5 rounded-full blur-3xl" />
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center">

        {/* Problem Statement Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs sm:text-sm font-semibold mb-6 animate-pulse">
          <span className="w-2 h-2 rounded-full bg-red-400 inline-block"></span>
          93 million desk jobs in India. Zero of them were your dream.
        </div>

        {/* Hero Headline */}
        <h1
          className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white leading-[1.05] mb-6"
          style={{ fontFamily: "'Outfit', sans-serif" }}
        >
          Quit the Loop.{' '}
          <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-amber-400 bg-clip-text text-transparent">
            Earn & Explore.
          </span>
        </h1>

        {/* Sub-headline */}
        <p className="text-base sm:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed mb-4">
          Your career is portable. NomadX calculates your{' '}
          <span className="text-emerald-400 font-semibold">net monthly surplus</span> at any destination,
          matches you to{' '}
          <span className="text-indigo-400 font-semibold">remote gigs</span>, and builds your
          free-hours itinerary — all in the browser, no data shared.
        </p>

        {/* Problem → Solution micro-bar */}
        <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-semibold mb-10">
          <span className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-400 border border-slate-700 line-through decoration-red-500">
            9–5 Office Loop
          </span>
          <span className="text-amber-400">→</span>
          <span className="px-3 py-1.5 rounded-lg bg-indigo-950 text-indigo-300 border border-indigo-800">
            Remote Gig Matching
          </span>
          <span className="text-amber-400">→</span>
          <span className="px-3 py-1.5 rounded-lg bg-emerald-950 text-emerald-300 border border-emerald-800">
            Net Surplus Life
          </span>
        </div>

        {/* ─── Profession + Income Setup Card ─────────────────────── */}
        <div className="max-w-3xl mx-auto mb-8">
          <div className="bg-slate-900/80 backdrop-blur-md rounded-3xl border border-slate-700/60 p-6 shadow-2xl shadow-indigo-950/40">

            <div className="text-left mb-4">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                Step 1 — Tell us who you are
              </div>
              <div className="text-sm text-slate-300 font-medium">
                We'll match destinations where <em>your profession thrives</em> and your <em>income covers costs</em>.
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              {/* Profession Selector */}
              <div className="relative">
                <label className="block text-xs font-semibold text-slate-400 mb-1.5 text-left">
                  <Briefcase className="w-3.5 h-3.5 inline mr-1 text-indigo-400" />
                  Your Profession
                </label>
                <button
                  type="button"
                  onClick={() => setProfessionOpen((v) => !v)}
                  className="w-full flex items-center justify-between gap-2 bg-slate-800 hover:bg-slate-700 border border-slate-600 text-left px-4 py-3 rounded-xl text-sm font-medium text-slate-200 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <span className="flex items-center gap-2">
                    {selectedMeta ? (
                      <>
                        <span>{selectedMeta.emoji}</span>
                        <span>{selectedMeta.label}</span>
                      </>
                    ) : (
                      <span className="text-slate-500">Select your profession…</span>
                    )}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${professionOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown */}
                {professionOpen && (
                  <div className="absolute z-50 mt-2 w-full left-0 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden">
                    {/* Category tabs */}
                    <div className="flex overflow-x-auto scrollbar-none bg-slate-950 border-b border-slate-800 p-1 gap-1">
                      {PROFESSION_CATEGORIES.map((cat) => (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => setActiveCategory(cat)}
                          className={`shrink-0 px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                            activeCategory === cat
                              ? 'bg-indigo-600 text-white'
                              : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                    {/* Profession list */}
                    <div className="max-h-52 overflow-y-auto p-1">
                      {filteredProfessions.map((prof) => (
                        <button
                          key={prof.id}
                          type="button"
                          onClick={() => {
                            onSelectProfession && onSelectProfession(prof.id);
                            setProfessionOpen(false);
                          }}
                          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left text-sm transition-colors ${
                            selectedProfession === prof.id
                              ? 'bg-indigo-600 text-white'
                              : 'text-slate-300 hover:bg-slate-800'
                          }`}
                        >
                          <span className="text-base shrink-0">{prof.emoji}</span>
                          <div>
                            <div className="font-semibold text-xs">{prof.label}</div>
                            <div className="text-[11px] text-slate-500">{prof.tagline}</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Monthly Income */}
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5 text-left">
                  <TrendingUp className="w-3.5 h-3.5 inline mr-1 text-emerald-400" />
                  Monthly Income (INR)
                </label>
                <div className="flex items-center gap-2 bg-slate-800 border border-slate-600 rounded-xl px-4 py-3">
                  <span className="text-slate-400 text-sm font-bold">₹</span>
                  <input
                    type="number"
                    min={5000}
                    max={1000000}
                    step={5000}
                    value={monthlyIncomeINR}
                    onChange={(e) => onSetMonthlyIncome && onSetMonthlyIncome(Number(e.target.value))}
                    className="w-full bg-transparent text-sm font-bold text-slate-100 focus:outline-none placeholder-slate-600"
                    placeholder="60000"
                  />
                </div>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {INCOME_PRESETS.map((p) => (
                    <button
                      key={p.value}
                      type="button"
                      onClick={() => onSetMonthlyIncome && onSetMonthlyIncome(p.value)}
                      className={`text-[11px] px-2 py-0.5 rounded border font-semibold transition-colors ${
                        monthlyIncomeINR === p.value
                          ? 'bg-emerald-600 text-white border-emerald-600'
                          : 'bg-slate-800 text-slate-400 border-slate-700 hover:border-emerald-600 hover:text-emerald-400'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Profession tagline if selected */}
            {selectedMeta && (
              <div className="mt-4 p-3 rounded-xl bg-indigo-950/60 border border-indigo-800/60 flex items-center gap-3 text-left">
                <span className="text-2xl">{selectedMeta.emoji}</span>
                <div>
                  <div className="text-xs font-bold text-indigo-300">{selectedMeta.label}</div>
                  <div className="text-xs text-slate-400">
                    Avg income: <strong className="text-emerald-400">₹{selectedMeta.avgMonthlyINR.toLocaleString()}/mo</strong>
                    {' · '}Min WiFi: <strong className="text-indigo-400">{selectedMeta.minWifiBandwidth}</strong>
                    {' · '}{selectedMeta.tagline}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ─── Destination Search ──────────────────────────────────── */}
        <div className="max-w-2xl mx-auto mb-10">
          <div className="relative flex items-center bg-slate-800/80 backdrop-blur-md rounded-2xl border border-slate-700/80 p-2 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500 transition-all shadow-xl shadow-indigo-950/30">
            <div className="pl-3 text-slate-500">
              <Search className="w-5 h-5" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search destinations — Goa, Manali, Rishikesh, Coorg, Bali…"
              className="w-full px-3 py-2 text-sm sm:text-base text-slate-200 placeholder-slate-600 bg-transparent focus:outline-none"
              aria-label="Search nomad destinations"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="p-1.5 text-slate-500 hover:text-slate-300 rounded-full hover:bg-slate-700 mr-1 transition-colors"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={onExploreClick}
              className="hidden sm:inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-sm font-bold rounded-xl shadow-md shadow-indigo-500/25 transition-all shrink-0"
            >
              <Zap className="w-4 h-4" /> Find Destinations
            </button>
          </div>
        </div>

        {/* ─── Stats Row ───────────────────────────────────────────── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto mb-10">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="bg-slate-900/60 backdrop-blur-sm border border-slate-800/60 rounded-2xl p-4 text-center"
            >
              <div className={`text-2xl sm:text-3xl font-black ${stat.color} mb-1`} style={{ fontFamily: "'Outfit', sans-serif" }}>
                {stat.value}
              </div>
              <div className="text-xs text-slate-500 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* ─── Explore CTA ─────────────────────────────────────────── */}
        <button
          onClick={onExploreClick}
          className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 hover:from-indigo-500 hover:via-violet-500 hover:to-purple-500 text-white font-black text-base sm:text-lg rounded-2xl shadow-xl shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-950"
          style={{ fontFamily: "'Outfit', sans-serif" }}
        >
          <Zap className="w-5 h-5" />
          Explore Nomad Destinations
        </button>

        <p className="mt-4 text-xs text-slate-600">
          No account required · No data stored · 100% browser-side calculation
        </p>
      </div>
    </section>
  );
};
