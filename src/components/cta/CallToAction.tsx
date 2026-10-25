import React from 'react';
import { Sparkles, Bookmark, ArrowUpRight } from 'lucide-react';
import { Destination, TripPreferences } from '../../types/trip';

interface CallToActionProps {
  destination: Destination;
  preferences: TripPreferences;
  onSaveToLocalStorage: () => void;
  onExploreMore: () => void;
}

export const CallToAction: React.FC<CallToActionProps> = ({
  destination,
  preferences,
  onSaveToLocalStorage,
  onExploreMore,
}) => {
  return (
    <section className="py-16 sm:py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Decorative gradient blur */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-600/20 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold mb-6 border border-blue-500/30">
          <Sparkles className="w-3.5 h-3.5 text-blue-400" /> Save & Plan Seamlessly
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
          Ready to Make Your {destination.name} Trip Happen?
        </h2>

        <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
          You&apos;ve configured a {preferences.durationDays}-day journey for {preferences.travelersCount} traveler{preferences.travelersCount > 1 ? 's' : ''}.
          Save this configuration directly to your browser or explore other destination candidates.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            type="button"
            onClick={onSaveToLocalStorage}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white shadow-lg shadow-blue-600/30 transition-all"
          >
            <Bookmark className="w-4 h-4" /> Save Configuration Locally
          </button>

          <button
            type="button"
            onClick={onExploreMore}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm bg-white/10 hover:bg-white/20 text-white border border-white/15 transition-all"
          >
            <span>Compare Other Destinations</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
