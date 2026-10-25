import React from 'react';
import { RecommendationMatch, Currency, Destination } from '../../types/trip';
import { DestinationCard } from './DestinationCard';
import { SortOption } from '../../utils/recommendationEngine';
import { Sparkles, SlidersHorizontal, MapPinOff, RotateCcw, Bed, MapPin, Globe } from 'lucide-react';

interface DestinationGridProps {
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
  onClearFilters: () => void;
  hostelOnlyFilter?: boolean;
  onHostelFilterChange?: (val: boolean) => void;
}

const INDIA_REGIONS = [
  'All India',
  'North India',
  'South India',
  'West India',
  'East & Northeast India',
  'Central India',
];

const GLOBAL_REGIONS = ['All', 'Asia', 'Europe', 'Americas', 'Africa', 'Oceania'];

export const DestinationGrid: React.FC<DestinationGridProps> = ({
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
  onClearFilters,
  hostelOnlyFilter = false,
  onHostelFilterChange,
}) => {
  const indiaCount = matches.filter((m) => m.destination.country === 'India').length;
  const globalCount = matches.length - indiaCount;

  return (
    <section id="destinations" className="py-16 sm:py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" /> Step 2: Intelligent Match Results
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              Recommended Destinations
            </h2>
            <p className="mt-1 text-sm sm:text-base text-slate-600">
              Ranked dynamically by your travel style, budget fit, transit fare estimations, and lodging options.
            </p>
          </div>

          {/* Controls: Hostel Toggle & Sort Controls */}
          <div className="flex flex-wrap items-center gap-3 self-start md:self-auto">
            {onHostelFilterChange && (
              <label className="inline-flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-200 bg-[#0F262E] border border-[#1D4552] px-3.5 py-2 rounded-xl shadow-xs hover:border-[#C98833] transition-colors">
                <input
                  type="checkbox"
                  checked={hostelOnlyFilter}
                  onChange={(e) => onHostelFilterChange(e.target.checked)}
                  className="w-4 h-4 rounded text-[#C98833] focus:ring-[#C98833] border-slate-600 bg-slate-900 accent-[#C98833] cursor-pointer"
                />
                <Bed className="w-3.5 h-3.5 text-[#C98833]" />
                <span>Hostel Only</span>
              </label>
            )}

            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-slate-400" />
              <label htmlFor="sort-select" className="text-xs font-semibold text-slate-300">
                Sort By:
              </label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => onSortChange(e.target.value as SortOption)}
                className="bg-[#0F262E] border border-[#1D4552] text-slate-200 text-xs font-semibold rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#C98833] shadow-xs cursor-pointer"
              >
                <option value="match">Highest Match Score</option>
                <option value="price-asc">Trip Cost: Low to High</option>
                <option value="price-desc">Trip Cost: High to Low</option>
                <option value="rating">Top Rated (Stars)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Region Filter Bar & Count */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-[#1D4552]/60 mb-8">
          <div className="space-y-3">
            {/* India Regions */}
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
                        : 'bg-[#0F262E] hover:bg-[#14313B] text-slate-300 border border-[#1D4552]'
                    }`}
                    aria-pressed={isSelected}
                  >
                    {region}
                  </button>
                );
              })}
            </div>

            {/* Global Regions */}
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
                        : 'bg-[#0F262E] hover:bg-[#14313B] text-slate-300 border border-[#1D4552]'
                    }`}
                    aria-pressed={isSelected}
                  >
                    {region}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Counts & Status */}
          <div className="text-xs font-medium text-slate-500 flex flex-wrap items-center gap-2 shrink-0">
            <span>
              Showing <strong className="text-slate-800">{matches.length}</strong> destination{matches.length === 1 ? '' : 's'} ·{' '}
              <strong className="text-orange-700">{indiaCount} India</strong> +{' '}
              <strong className="text-slate-700">{globalCount} Global</strong>
            </span>
            {hostelOnlyFilter && (
              <span className="text-teal-700 font-semibold bg-teal-50 border border-teal-200 px-2 py-0.5 rounded-full">
                • Hostel filter active
              </span>
            )}
            {searchQuery && (
              <span className="text-blue-600">
                matching &ldquo;{searchQuery}&rdquo;
              </span>
            )}
          </div>
        </div>

        {/* Grid or Empty State */}
        {matches.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {matches.map((match) => (
              <DestinationCard
                key={match.destination.id}
                match={match}
                currentCurrency={currentCurrency}
                isSelectedForCalculator={selectedDestinationId === match.destination.id}
                onSelectForCalculator={onSelectForCalculator}
                onQuickPreview={onQuickPreview}
              />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="py-16 px-4 text-center max-w-md mx-auto bg-white rounded-3xl border border-slate-200 shadow-xs">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 mb-4">
              <MapPinOff className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">No Destinations Found</h3>
            <p className="mt-1.5 text-xs text-slate-500 leading-relaxed">
              We couldn&apos;t find any destinations matching your current filter criteria. Try clearing search keywords, turning off the hostel filter, or selecting a broader region.
            </p>
            <button
              type="button"
              onClick={onClearFilters}
              className="mt-5 inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Clear Filters & View All
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
