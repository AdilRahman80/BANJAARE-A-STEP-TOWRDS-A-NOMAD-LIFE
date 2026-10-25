import React, { useState } from 'react';
import {
  TrendingUp,
  Bookmark,
} from 'lucide-react';
import {
  Destination,
  TripPreferences,
  CategoryAllocationModifiers,
  Currency,
} from '../types/trip';
import { BudgetOverview } from '../components/budget/BudgetOverview';
import { TripPreferencesForm } from '../components/preferences/TripPreferencesForm';

interface PlannerViewProps {
  selectedDestination: Destination;
  allDestinations: Destination[];
  onSelectDestination: (dest: Destination) => void;
  preferences: TripPreferences;
  onUpdatePreferences: (updates: Partial<TripPreferences>) => void;
  onResetPreferences: () => void;
  categoryModifiers: CategoryAllocationModifiers;
  onUpdateModifier: (key: keyof CategoryAllocationModifiers, val: number) => void;
  onResetModifiers: () => void;
  currentCurrency: Currency;
  onShowToast: (msg: string) => void;
}

export const PlannerView: React.FC<PlannerViewProps> = ({
  selectedDestination,
  allDestinations,
  onSelectDestination,
  preferences,
  onUpdatePreferences,
  onResetPreferences,
  categoryModifiers,
  onUpdateModifier,
  onResetModifiers,
  currentCurrency,
  onShowToast,
}) => {
  const [activeStudioTab, setActiveStudioTab] = useState<'budget' | 'preferences'>('budget');

  const handleSaveToLocalStorage = () => {
    try {
      const payload = {
        preferences,
        destinationId: selectedDestination.id,
        savedAt: new Date().toISOString(),
      };
      localStorage.setItem('smart_trip_planner_saved_v1', JSON.stringify(payload));
      onShowToast(`Itinerary for ${selectedDestination.name} saved to local storage!`);
    } catch {
      onShowToast('Could not save to browser local storage.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">

      {/* ─── 1. PAGE HEADER (Vita / Eloura Editorial Aesthetic) ─── */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#1D4552]/60">
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0F262E] border border-[#1D4552] text-xs font-bold uppercase tracking-wider text-[#C98833]">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Trip &amp; Budget Architect</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#FAFDFD] tracking-tight">
            Design your workation budget. <br />
            <span className="font-serif italic font-normal text-[#C98833]">Precision cost &amp; net surplus.</span>
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Calculate exact accommodation rates, daily cafe spending, transit estimates, and see your projected monthly savings.
          </p>
        </div>

        {/* Header Actions */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleSaveToLocalStorage}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0F262E] hover:bg-[#14313B] text-slate-200 border border-[#1D4552] hover:border-[#C98833] text-xs font-bold transition-all shadow-sm"
          >
            <Bookmark className="w-4 h-4 text-[#C98833]" />
            <span>Save Itinerary</span>
          </button>
        </div>
      </div>

      {/* ─── 2. QUICK DESTINATION SWITCHER BAR ─── */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#0F262E] border border-[#1D4552] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-900 shrink-0 border border-[#1D4552]">
            <img
              src={selectedDestination.imageUrl}
              alt={selectedDestination.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-[#C98833] tracking-wider block">
              Active Destination in Studio
            </span>
            <div className="text-lg font-extrabold text-[#FAFDFD]">
              {selectedDestination.name}, {selectedDestination.country}
            </div>
          </div>
        </div>

        {/* Dropdown to change destination right from planner */}
        <div className="w-full sm:w-auto flex items-center gap-2">
          <span className="text-xs text-slate-400 whitespace-nowrap">Switch City:</span>
          <select
            value={selectedDestination.id}
            onChange={(e) => {
              const match = allDestinations.find((d) => d.id === e.target.value);
              if (match) onSelectDestination(match);
            }}
            className="w-full sm:w-64 bg-[#071317] border border-[#1D4552] text-xs font-semibold text-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-[#C98833] cursor-pointer"
          >
            {allDestinations.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name} ({d.state ? `${d.state}, ` : ''}{d.country})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* ─── 3. STUDIO TAB CONTROLS (Setup vs Detailed Breakdown) ─── */}
      <div className="flex items-center gap-3 border-b border-[#1D4552]/60 pb-1">
        <button
          type="button"
          onClick={() => setActiveStudioTab('budget')}
          className={`pb-3 px-3 text-sm font-bold transition-all relative ${
            activeStudioTab === 'budget'
              ? 'text-[#C98833]'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <span>Budget &amp; Transit Cost Breakdown</span>
          {activeStudioTab === 'budget' && (
            <span className="absolute bottom-0 inset-x-0 h-0.5 bg-[#C98833]" />
          )}
        </button>

        <button
          type="button"
          onClick={() => setActiveStudioTab('preferences')}
          className={`pb-3 px-3 text-sm font-bold transition-all relative ${
            activeStudioTab === 'preferences'
              ? 'text-[#C98833]'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <span>Nomad Setup &amp; Travel Preferences</span>
          {activeStudioTab === 'preferences' && (
            <span className="absolute bottom-0 inset-x-0 h-0.5 bg-[#C98833]" />
          )}
        </button>
      </div>

      {/* ─── 4. ACTIVE STUDIO CONTENT ─── */}
      {activeStudioTab === 'budget' ? (
        <div className="space-y-10">
          <BudgetOverview
            destination={selectedDestination}
            allDestinations={allDestinations}
            onSelectDestination={onSelectDestination}
            preferences={preferences}
            categoryModifiers={categoryModifiers}
            onUpdateModifier={onUpdateModifier}
            onResetModifiers={onResetModifiers}
            currentCurrency={currentCurrency}
            onShowToast={onShowToast}
          />
        </div>
      ) : (
        <div className="space-y-10">
          <TripPreferencesForm
            preferences={preferences}
            onUpdatePreferences={onUpdatePreferences}
            onResetPreferences={onResetPreferences}
            currentCurrency={currentCurrency}
            onFindTrips={() => setActiveStudioTab('budget')}
          />
        </div>
      )}

    </div>
  );
};
