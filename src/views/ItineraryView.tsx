import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  Wifi,
  CheckCircle2,
  Copy,
  ChevronRight,
} from 'lucide-react';
import { DESTINATION_ITINERARIES, DayPlan } from '../data/itineraryData';

interface ItineraryViewProps {
  onShowToast: (msg: string) => void;
  onNavigateToPlanner: () => void;
}

export const ItineraryView: React.FC<ItineraryViewProps> = ({
  onShowToast,
  onNavigateToPlanner,
}) => {
  const [selectedDestKey, setSelectedDestKey] = useState<string>('goa-india');
  const [selectedDayNum, setSelectedDayNum] = useState<number>(1);
  const [completedBlocks, setCompletedBlocks] = useState<Record<string, boolean>>({});

  const activeItinerary =
    DESTINATION_ITINERARIES[selectedDestKey] ?? DESTINATION_ITINERARIES['goa-india'];

  const activeDay: DayPlan =
    activeItinerary.days.find((d) => d.dayNumber === selectedDayNum) ??
    activeItinerary.days[0];

  const toggleBlockDone = (title: string) => {
    setCompletedBlocks((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  const handleCopyItinerary = () => {
    const text = `NOMADX BALANCED WORK-LIFE ITINERARY
Destination: ${activeItinerary.destinationName} (${activeItinerary.vibe})
Day ${activeDay.dayNumber}: ${activeDay.theme}

${activeDay.blocks
  .map(
    (b) =>
      `[${b.time}] ${b.title}\n• ${b.description}\n• Venue: ${b.venueRecommendation}${
        b.wifiTestedMbps ? ` (${b.wifiTestedMbps} Mbps Wi-Fi)` : ''
      }`
  )
  .join('\n\n')}

Generated via NomadX (Bespoke Nomad Retreats)`.trim();

    navigator.clipboard.writeText(text);
    onShowToast(`Day ${activeDay.dayNumber} itinerary copied to clipboard!`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-14">

      {/* ─── 1. PAGE HEADER (Vita / Eloura Editorial Aesthetic) ─── */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#1D4552]/60">
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0F262E] border border-[#1D4552] text-xs font-bold uppercase tracking-wider text-[#C98833]">
            <Calendar className="w-3.5 h-3.5" />
            <span>Smart Work-Life Cadence</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#FAFDFD] tracking-tight">
            The Balanced Nomad Day. <br />
            <span className="font-serif italic font-normal text-[#C98833]">Deep focus + sunset freedom.</span>
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Never sacrifice your client deliverables or your sense of adventure.
            Designed around 4-hour morning deep work blocks, high-speed cafe syncs, and golden hour exploration.
          </p>
        </div>

        {/* Copy / Print Actions */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleCopyItinerary}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0F262E] hover:bg-[#14313B] text-slate-200 border border-[#1D4552] hover:border-[#C98833] text-xs font-bold transition-all shadow-sm"
          >
            <Copy className="w-4 h-4 text-[#C98833]" />
            <span>Copy Day Schedule</span>
          </button>
        </div>
      </div>

      {/* ─── 2. DESTINATION & DAY SELECTOR TABS ─── */}
      <div className="space-y-4">
        {/* City Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          {Object.keys(DESTINATION_ITINERARIES).map((key) => {
            const itin = DESTINATION_ITINERARIES[key];
            const isSelected = selectedDestKey === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => {
                  setSelectedDestKey(key);
                  setSelectedDayNum(1);
                }}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  isSelected
                    ? 'bg-[#C98833] text-black shadow-md'
                    : 'bg-[#0F262E] text-slate-300 hover:bg-[#14313B] border border-[#1D4552]'
                }`}
              >
                {itin.destinationName}
              </button>
            );
          })}
        </div>

        {/* Day Number Pills */}
        <div className="p-4 rounded-2xl bg-[#0F262E] border border-[#1D4552] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-semibold mr-2">Select Day:</span>
            {activeItinerary.days.map((d) => (
              <button
                key={d.dayNumber}
                type="button"
                onClick={() => setSelectedDayNum(d.dayNumber)}
                className={`w-9 h-9 rounded-xl text-xs font-bold transition-all ${
                  selectedDayNum === d.dayNumber
                    ? 'bg-[#C98833] text-black shadow-sm'
                    : 'bg-[#071317] text-slate-300 hover:bg-[#14313B] border border-[#1D4552]'
                }`}
              >
                D{d.dayNumber}
              </button>
            ))}
          </div>
          <div className="text-xs text-[#C98833] font-semibold hidden sm:block">
            {activeDay.theme}
          </div>
        </div>
      </div>

      {/* ─── 3. TIME-BLOCK TIMELINE ─── */}
      <div className="space-y-6">
        <div className="flex items-center justify-between pb-2 border-b border-[#1D4552]/40">
          <h2 className="text-xl font-bold text-[#FAFDFD]">
            Day {activeDay.dayNumber} Schedule &amp; Routine
          </h2>
          <span className="text-xs text-slate-400">
            Click any block to check off as completed
          </span>
        </div>

        <div className="space-y-4">
          {activeDay.blocks.map((block, idx) => {
            const isDone = completedBlocks[block.title] ?? false;
            return (
              <div
                key={idx}
                onClick={() => toggleBlockDone(block.title)}
                className={`p-6 rounded-2xl border transition-all duration-300 cursor-pointer ${
                  isDone
                    ? 'bg-[#071317]/60 border-[#1D4552]/40 opacity-60'
                    : 'bg-[#0F262E] border-[#1D4552] hover:border-[#C98833]/60 shadow-lg'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  
                  {/* Left info */}
                  <div className="space-y-2 max-w-2xl">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#071317] text-[#C98833] border border-[#1D4552]">
                        <Clock className="w-3.5 h-3.5 text-[#C98833]" />
                        <span>{block.time}</span>
                      </span>

                      <div className="flex flex-wrap gap-1">
                        {block.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] font-medium px-2 py-0.5 rounded bg-[#14313B] text-slate-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <h3
                      className={`text-base sm:text-lg font-bold text-[#FAFDFD] ${
                        isDone ? 'line-through text-slate-500' : ''
                      }`}
                    >
                      {block.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {block.description}
                    </p>

                    <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-slate-400">
                      <span className="flex items-center gap-1 text-[#C98833]">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>Venue: {block.venueRecommendation}</span>
                      </span>

                      {block.wifiTestedMbps && (
                        <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                          <Wifi className="w-3.5 h-3.5" />
                          <span>{block.wifiTestedMbps} Mbps Tested</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Right Checkbox */}
                  <div className="shrink-0 self-start">
                    <div
                      className={`w-6 h-6 rounded-lg border flex items-center justify-center transition-colors ${
                        isDone
                          ? 'bg-emerald-500 border-emerald-500 text-black'
                          : 'border-slate-600 bg-[#071317] text-transparent'
                      }`}
                    >
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ─── 4. BOTTOM ROUTE CTA ─── */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-[#0F262E] to-[#14313B] border border-[#1D4552] flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-lg font-bold text-[#FAFDFD]">
            Ready to live this workation schedule?
          </h3>
          <p className="text-xs text-slate-300 mt-1">
            Calculate your exact total accommodation, train/flight, and cafe cost in the Planner.
          </p>
        </div>
        <button
          type="button"
          onClick={onNavigateToPlanner}
          className="px-6 py-3 rounded-xl bg-[#C98833] hover:bg-[#DE9F4D] text-black font-bold text-xs tracking-wide shrink-0 transition-all shadow-md flex items-center gap-2"
        >
          <span>Open Trip &amp; Budget Architect</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
