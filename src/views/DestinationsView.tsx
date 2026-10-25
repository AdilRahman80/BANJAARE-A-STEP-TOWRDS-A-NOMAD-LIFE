import React from 'react';
import {
  Compass,
  Search,
  SlidersHorizontal,
  MapPin,
  Globe,
  Bed,
  RotateCcw,
} from 'lucide-react';
import { Destination, RecommendationMatch, Currency } from '../types/trip';
import { DestinationCard } from '../components/destinations/DestinationCard';
import { SortOption } from '../utils/recommendationEngine';

interface DestinationsViewProps {
  matches: RecommendationMatch[];
  currentCurrency: Currency;
  selectedDestinationId: string;
  onSelectForCalculator: (dest: Destination) => void;
  onQuickPreview: (dest: Destination) => void;
  selectedRegion: string;
  onRegionChange: (region: string) => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onClearFilters: () => void;
  hostelOnlyFilter: boolean;
  onHostelFilterChange: (val: boolean) => void;
}

const INDIA_REGIONS = [
  'All India',
  'North India',
  'South India',
  'Western Ghats & Coasts',
  'Northeast & East',
];

const GLOBAL_REGIONS = [
  'All Global',
  'Southeast Asia',
  'Europe',
  'Middle East & East Asia',
];

export const DestinationsView: React.FC<DestinationsViewProps> = ({
  matches,
  currentCurrency,
  selectedDestinationId,
  onSelectForCalculator,
  onQuickPreview,
  selectedRegion,
  onRegionChange,
  sortBy,
  onSortChange,
  searchQuery,
  onSearchChange,
  onClearFilters,
  hostelOnlyFilter,
  onHostelFilterChange,
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">

      {/* ─── 1. PAGE HEADER (Vita / Eloura Editorial Aesthetic) ─── */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0F262E] border border-[#1D4552] text-xs font-bold uppercase tracking-wider text-[#C98833]">
          <Compass className="w-3.5 h-3.5" />
          <span>Destination Explorer</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#FAFDFD] tracking-tight">
          54 Curated Workation Hubs. <br />
          <span className="font-serif italic font-normal text-[#C98833]">Audited Wi-Fi &amp; Infrastructure.</span>
        </h1>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          From the pine-scented valleys of Himachal to the cliffside cafes of Varkala and the tropical coworking hubs of Bali.
          Explore destinations matching your budget tier, travel style, and connectivity requirements.
        </p>
      </div>

      {/* ─── 2. SEARCH & CONTROLS TOOLBAR ─── */}
      <div className="p-6 rounded-3xl bg-[#0F262E] border border-[#1D4552] space-y-6">
        
        {/* Top Search & Sorters */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Search Box */}
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search by city, state, mountains, beach, quiet…"
              className="w-full pl-10 pr-4 py-2.5 bg-[#071317] border border-[#1D4552] text-xs text-[#FAFDFD] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#C98833] placeholder-slate-500"
            />
          </div>

          {/* Right Controls: Hostel Toggle & Sort By */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
            <label className="inline-flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-200 bg-[#071317] border border-[#1D4552] px-3.5 py-2.5 rounded-xl hover:border-[#C98833] transition-colors">
              <input
                type="checkbox"
                checked={hostelOnlyFilter}
                onChange={(e) => onHostelFilterChange(e.target.checked)}
                className="w-4 h-4 rounded text-[#C98833] focus:ring-[#C98833] border-slate-600 bg-slate-900 accent-[#C98833] cursor-pointer"
              />
              <Bed className="w-3.5 h-3.5 text-[#C98833]" />
              <span>Hostels Only</span>
            </label>

            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-slate-400" />
              <select
                value={sortBy}
                onChange={(e) => onSortChange(e.target.value as SortOption)}
                className="bg-[#071317] border border-[#1D4552] text-slate-200 text-xs font-semibold rounded-xl px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-[#C98833] cursor-pointer"
              >
                <option value="match">Highest Match Score</option>
                <option value="nomad-score">Top Nomad Score (Wi-Fi &amp; Desks)</option>
                <option value="price-asc">Trip Cost: Low to High</option>
                <option value="price-desc">Trip Cost: High to Low</option>
                <option value="rating">Top Rated (Stars)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Region Filter Bar */}
        <div className="space-y-3 pt-4 border-t border-[#1D4552]/60">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-[#C98833] bg-[#C98833]/15 border border-[#C98833]/30 px-2.5 py-1 rounded-full mr-1">
              <MapPin className="w-3 h-3 text-[#C98833]" /> India
            </span>
            {INDIA_REGIONS.map((region) => {
              const isSelected = selectedRegion === region;
              return (
                <button
                  key={region}
                  type="button"
                  onClick={() => onRegionChange(region)}
                  className={`text-xs px-3.5 py-1.5 rounded-full transition-all font-medium ${
                    isSelected
                      ? 'bg-[#C98833] text-black shadow-md font-semibold'
                      : 'bg-[#071317] hover:bg-[#14313B] text-slate-300 border border-[#1D4552]'
                  }`}
                >
                  {region}
                </button>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-1 rounded-full mr-1">
              <Globe className="w-3 h-3 text-emerald-400" /> Global
            </span>
            {GLOBAL_REGIONS.map((region) => {
              const isSelected = selectedRegion === region;
              return (
                <button
                  key={region}
                  type="button"
                  onClick={() => onRegionChange(region)}
                  className={`text-xs px-3.5 py-1.5 rounded-full transition-all font-medium ${
                    isSelected
                      ? 'bg-slate-200 text-slate-950 shadow-md font-semibold'
                      : 'bg-[#071317] hover:bg-[#14313B] text-slate-300 border border-[#1D4552]'
                  }`}
                >
                  {region}
                </button>
              );
            })}
          </div>
        </div>

      </div>

      {/* ─── 3. RESULTS STATUS ─── */}
      <div className="flex items-center justify-between text-xs text-slate-400">
        <div>
          Showing <strong className="text-[#FAFDFD]">{matches.length}</strong> matching workation destinations
        </div>
        {(searchQuery || selectedRegion !== 'All India' || hostelOnlyFilter) && (
          <button
            type="button"
            onClick={onClearFilters}
            className="inline-flex items-center gap-1 text-slate-400 hover:text-[#C98833] transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset filters</span>
          </button>
        )}
      </div>

      {/* ─── 4. DESTINATION CARDS GRID ─── */}
      {matches.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {matches.map((match) => (
            <DestinationCard
              key={match.destination.id}
              match={match}
              currentCurrency={currentCurrency}
              isSelectedForCalculator={match.destination.id === selectedDestinationId}
              onSelectForCalculator={onSelectForCalculator}
              onQuickPreview={onQuickPreview}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 px-4 rounded-3xl bg-[#0F262E] border border-[#1D4552] space-y-4">
          <Compass className="w-10 h-10 text-slate-500 mx-auto" />
          <h3 className="text-lg font-bold text-[#FAFDFD]">No destinations match your exact criteria</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Try adjusting your search terms, broadening your region, or turning off the hostel filter.
          </p>
          <button
            type="button"
            onClick={onClearFilters}
            className="px-5 py-2.5 rounded-xl bg-[#C98833] text-black font-bold text-xs"
          >
            Reset Filters
          </button>
        </div>
      )}

    </div>
  );
};
