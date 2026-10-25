import React, { useState } from 'react';
import {
  Menu,
  X,
  Compass,
  Briefcase,
  TrendingUp,
  Building,
  Calendar,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { Currency } from '../../types/trip';
import { CURRENCIES } from '../../data/destinations';

export type NavTab = 'home' | 'gigs' | 'destinations' | 'planner' | 'coliving' | 'itinerary' | 'about';

interface NavbarProps {
  currentCurrency: Currency;
  onCurrencyChange: (currency: Currency) => void;
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentCurrency,
  onCurrencyChange,
  activeTab,
  onTabChange,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: NavTab; label: string; icon: React.ElementType }[] = [
    { id: 'home', label: 'Discovery', icon: Sparkles },
    { id: 'gigs', label: 'Remote Gigs', icon: Briefcase },
    { id: 'destinations', label: 'Destinations', icon: Compass },
    { id: 'planner', label: 'Trip Architect', icon: TrendingUp },
    { id: 'coliving', label: 'Coliving & Desks', icon: Building },
    { id: 'itinerary', label: 'Itinerary', icon: Calendar },
    { id: 'about', label: 'Our Story', icon: Compass },
  ];

  const handleSelectTab = (tab: NavTab) => {
    onTabChange(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#071317]/90 backdrop-blur-xl border-b border-[#1D4552]/70 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Logo & Brand (Bespoke Editorial Typography) */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => handleSelectTab('home')}
              className="flex items-center gap-3 text-left focus:outline-none group"
            >
              {/* Luxury Geometric Monogram */}
              <div className="relative w-10 h-10 rounded-xl bg-[#0F262E] border border-[#C98833]/40 flex items-center justify-center text-[#C98833] group-hover:border-[#C98833] group-hover:scale-105 transition-all shadow-md">
                <span className="text-xl font-serif font-extrabold tracking-tighter select-none">N</span>
                <div className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#C98833]" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-xl font-extrabold tracking-tight text-[#FAFDFD]">
                    Nomad<span className="text-[#C98833]">X</span>
                  </span>
                  <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-[#C98833]/15 text-[#C98833] border border-[#C98833]/30">
                    Bespoke Escapes
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 font-medium tracking-wide hidden sm:block">
                  Earn Where You Explore
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelectTab(item.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all relative flex items-center gap-1.5 ${
                    isActive
                      ? 'text-[#C98833] bg-[#0F262E] border border-[#1D4552]'
                      : 'text-slate-300 hover:text-[#FAFDFD] hover:bg-[#0F262E]/50'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#C98833]' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 inset-x-3 h-0.5 bg-[#C98833] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Actions: Currency & Start CTA */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Currency Selector */}
            <div className="relative">
              <label htmlFor="currency-select" className="sr-only">Select Currency</label>
              <select
                id="currency-select"
                value={currentCurrency}
                onChange={(e) => onCurrencyChange(e.target.value as Currency)}
                className="bg-[#0F262E] hover:bg-[#14313B] text-slate-200 text-xs font-semibold py-2 px-3 rounded-xl border border-[#1D4552] focus:outline-none focus:ring-1 focus:ring-[#C98833] cursor-pointer transition-colors"
                aria-label="Change Currency"
              >
                {(Object.keys(CURRENCIES) as Currency[]).map((cur) => (
                  <option key={cur} value={cur} className="bg-[#071317] text-slate-200">
                    {CURRENCIES[cur].label}
                  </option>
                ))}
              </select>
            </div>

            {/* CTA */}
            <button
              type="button"
              onClick={() => handleSelectTab('planner')}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-bold text-black bg-[#C98833] hover:bg-[#DE9F4D] rounded-xl shadow-md transition-all hover:scale-[1.02]"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Start Planning</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <select
              value={currentCurrency}
              onChange={(e) => onCurrencyChange(e.target.value as Currency)}
              className="bg-[#0F262E] text-slate-200 text-xs font-semibold py-1.5 px-2 rounded-lg border border-[#1D4552]"
              aria-label="Change Currency"
            >
              {(Object.keys(CURRENCIES) as Currency[]).map((cur) => (
                <option key={cur} value={cur} className="bg-[#071317]">{cur}</option>
              ))}
            </select>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-300 hover:text-white bg-[#0F262E] border border-[#1D4552]"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#1D4552] bg-[#071317] px-4 pt-3 pb-6 space-y-2">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelectTab(item.id)}
                className={`w-full flex items-center justify-between py-3 px-3.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-[#C98833] text-black font-bold'
                    : 'text-slate-300 hover:bg-[#0F262E]'
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </span>
                <ArrowRight className="w-3.5 h-3.5 opacity-60" />
              </button>
            );
          })}
          <div className="pt-2">
            <button
              type="button"
              onClick={() => handleSelectTab('planner')}
              className="w-full py-3 rounded-xl bg-[#C98833] text-black font-bold text-xs text-center"
            >
              Start Planning Workation
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
