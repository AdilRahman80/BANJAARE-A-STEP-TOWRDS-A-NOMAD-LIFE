import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  Wifi,
  CheckCircle2,
  Copy,
  ChevronRight,
  Download,
  Plus,
  X,
  Sparkles,
  Laptop,
  Sunset,
  Coffee,
} from 'lucide-react';
import { DESTINATION_ITINERARIES, DayPlan, ItineraryTimeBlock } from '../data/itineraryData';
import { generateICSContent, downloadICSFile } from '../utils/calendarExport';

interface ItineraryViewProps {
  onShowToast: (msg: string) => void;
  onNavigateToPlanner: () => void;
}

type WorkCadence = 'ist_standard' | 'us_overlap' | 'eu_sync' | 'early_maker';

export const ItineraryView: React.FC<ItineraryViewProps> = ({
  onShowToast,
  onNavigateToPlanner,
}) => {
  const [selectedDestKey, setSelectedDestKey] = useState<string>('goa-india');
  const [selectedDayNum, setSelectedDayNum] = useState<number>(1);
  const [completedBlocks, setCompletedBlocks] = useState<Record<string, boolean>>({});
  const [workCadence, setWorkCadence] = useState<WorkCadence>('ist_standard');

  // Custom user blocks state per day
  const [customBlocks, setCustomBlocks] = useState<Record<string, ItineraryTimeBlock[]>>({});
  const [isAddingBlock, setIsAddingBlock] = useState<boolean>(false);

  // New Block Form State
  const [newTime, setNewTime] = useState<string>('02:30 PM - 04:30 PM');
  const [newTitle, setNewTitle] = useState<string>('Async Deep Work & Feature Delivery');
  const [newDescription, setNewDescription] = useState<string>('Focused sprint on client codebase with iced pour-over coffee.');
  const [newVenue, setNewVenue] = useState<string>('Grounded Café & Cowork');
  const [newWifi, setNewWifi] = useState<number>(150);
  const [newTag, setNewTag] = useState<string>('Deep Work');

  const activeItinerary =
    DESTINATION_ITINERARIES[selectedDestKey] ?? DESTINATION_ITINERARIES['goa-india'];

  const baseDay: DayPlan =
    activeItinerary.days.find((d) => d.dayNumber === selectedDayNum) ??
    activeItinerary.days[0];

  const dayKey = `${selectedDestKey}-d${selectedDayNum}`;
  const dayCustom = customBlocks[dayKey] ?? [];

  // Combine predefined + custom blocks
  const allBlocks: ItineraryTimeBlock[] = [...baseDay.blocks, ...dayCustom];

  const toggleBlockDone = (title: string) => {
    setCompletedBlocks((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  const handleAddCustomBlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const created: ItineraryTimeBlock = {
      time: newTime,
      type: 'deep_work',
      title: newTitle,
      description: newDescription,
      venueRecommendation: newVenue,
      wifiTestedMbps: newWifi,
      tags: [newTag, 'Custom'],
    };

    setCustomBlocks((prev) => ({
      ...prev,
      [dayKey]: [...(prev[dayKey] ?? []), created],
    }));

    setIsAddingBlock(false);
    onShowToast(`Added "${newTitle}" to Day ${selectedDayNum}!`);
  };

  const handleExportICS = () => {
    const icsString = generateICSContent(
      activeItinerary.destinationName,
      baseDay.theme,
      allBlocks
    );
    const filename = `NomadX_${activeItinerary.destinationName}_Day${selectedDayNum}.ics`;
    downloadICSFile(filename, icsString);
    onShowToast(`Downloaded calendar file (.ics) for Day ${selectedDayNum}!`);
  };

  const handleCopyItinerary = () => {
    const text = `NOMADX BALANCED WORK-LIFE ITINERARY
Destination: ${activeItinerary.destinationName} (${activeItinerary.vibe})
Day ${baseDay.dayNumber}: ${baseDay.theme}
Cadence: ${workCadence.replace('_', ' ').toUpperCase()}

${allBlocks
  .map(
    (b) =>
      `[${b.time}] ${b.title}\n• ${b.description}\n• Venue: ${b.venueRecommendation}${
        b.wifiTestedMbps ? ` (${b.wifiTestedMbps} Mbps Wi-Fi)` : ''
      }`
  )
  .join('\n\n')}

Generated via NomadX (Earn Where You Explore)`.trim();

    navigator.clipboard.writeText(text);
    onShowToast(`Day ${baseDay.dayNumber} itinerary copied to clipboard!`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">

      {/* ─── 1. PAGE HEADER (Vita / Eloura Editorial Aesthetic) ─── */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#1D4552]/60">
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0F262E] border border-[#1D4552] text-xs font-bold uppercase tracking-wider text-[#C98833]">
            <Calendar className="w-3.5 h-3.5" />
            <span>Nomad Time-Block Architecture</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#FAFDFD] tracking-tight">
            The Balanced Nomad Day. <br />
            <span className="font-serif italic font-normal text-[#C98833]">Deep focus + sunset freedom.</span>
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Never sacrifice your client deliverables or your sense of adventure.
            Engineered around 4-hour morning deep work blocks, high-speed cafe syncs, and golden hour exploration.
            Export directly to Google Calendar / Apple iCal (.ics).
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={handleExportICS}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#C98833] hover:bg-[#DE9F4D] text-black font-bold text-xs transition-all shadow-md"
          >
            <Download className="w-4 h-4" />
            <span>Export to Calendar (.ics)</span>
          </button>

          <button
            type="button"
            onClick={handleCopyItinerary}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0F262E] hover:bg-[#14313B] text-slate-200 border border-[#1D4552] hover:border-[#C98833] text-xs font-bold transition-all shadow-sm"
          >
            <Copy className="w-4 h-4 text-[#C98833]" />
            <span>Copy Text</span>
          </button>

          <button
            type="button"
            onClick={() => setIsAddingBlock(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#14313B] hover:bg-[#1D4552] text-[#FAFDFD] border border-[#C98833]/40 text-xs font-bold transition-all"
          >
            <Plus className="w-4 h-4 text-[#C98833]" />
            <span>Add Custom Block</span>
          </button>
        </div>
      </div>

      {/* ─── 2. TIMEZONE CADENCE SELECTOR ─── */}
      <div className="p-4 rounded-2xl bg-[#0F262E] border border-[#1D4552] flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs text-slate-300">
          <Clock className="w-4 h-4 text-[#C98833]" />
          <span className="font-bold text-[#FAFDFD]">Work Cadence:</span>
          <span>Match your client or employer timezone</span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {[
            { id: 'ist_standard', label: 'IST Standard (09:00 - 18:00)', icon: Laptop },
            { id: 'us_overlap', label: 'US Overlap (17:00 - 01:00)', icon: Sunset },
            { id: 'eu_sync', label: 'EU Sync (13:30 - 21:30)', icon: Coffee },
            { id: 'early_maker', label: 'Early Maker (06:00 - 12:00)', icon: Sparkles },
          ].map((cadence) => {
            const isSelected = workCadence === cadence.id;
            const Icon = cadence.icon;
            return (
              <button
                key={cadence.id}
                type="button"
                onClick={() => {
                  setWorkCadence(cadence.id as WorkCadence);
                  onShowToast(`Adjusted cadence to ${cadence.label}`);
                }}
                className={`inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-xl font-semibold transition-all ${
                  isSelected
                    ? 'bg-[#C98833] text-black shadow-sm font-bold'
                    : 'bg-[#071317] text-slate-300 hover:bg-[#14313B] border border-[#1D4552]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cadence.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ─── 3. DESTINATION & DAY SELECTOR TABS ─── */}
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
            {baseDay.theme}
          </div>
        </div>
      </div>

      {/* ─── 4. TIME-BLOCK TIMELINE ─── */}
      <div className="space-y-6">
        <div className="flex items-center justify-between pb-2 border-b border-[#1D4552]/40">
          <h2 className="text-xl font-bold text-[#FAFDFD]">
            Day {baseDay.dayNumber} Schedule &amp; Routine
          </h2>
          <span className="text-xs text-slate-400">
            Click any block to check off as completed
          </span>
        </div>

        <div className="space-y-4">
          {allBlocks.map((block, idx) => {
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
                        {(block.tags || []).map((tag: string) => (
                          <span
                            key={tag}
                            className="text-[10px] font-medium px-2 py-0.5 rounded bg-[#14313B] text-slate-300 border border-[#1D4552]"
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

      {/* ─── 5. BOTTOM ROUTE CTA ─── */}
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

      {/* ─── 6. ADD CUSTOM BLOCK MODAL ─── */}
      {isAddingBlock && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-[#0F262E] border border-[#1D4552] rounded-3xl max-w-lg w-full p-6 text-[#FAFDFD] space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#1D4552]/70 pb-3">
              <div className="flex items-center gap-2">
                <Plus className="w-4 h-4 text-[#C98833]" />
                <h3 className="text-base font-bold">Add Custom Routine Block</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsAddingBlock(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddCustomBlock} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Time Slot</label>
                <input
                  type="text"
                  value={newTime}
                  onChange={(e) => setNewTime(e.target.value)}
                  placeholder="e.g. 02:30 PM - 04:30 PM"
                  className="w-full px-3 py-2 bg-[#071317] border border-[#1D4552] rounded-xl text-white focus:outline-none focus:border-[#C98833]"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Session / Activity Title</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Client Architecture Sprint"
                  className="w-full px-3 py-2 bg-[#071317] border border-[#1D4552] rounded-xl text-white focus:outline-none focus:border-[#C98833]"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Description &amp; Goals</label>
                <textarea
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  rows={2}
                  placeholder="What will you accomplish or experience during this block?"
                  className="w-full px-3 py-2 bg-[#071317] border border-[#1D4552] rounded-xl text-white focus:outline-none focus:border-[#C98833]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Venue / Cafe</label>
                  <input
                    type="text"
                    value={newVenue}
                    onChange={(e) => setNewVenue(e.target.value)}
                    placeholder="e.g. Clay Coworking"
                    className="w-full px-3 py-2 bg-[#071317] border border-[#1D4552] rounded-xl text-white focus:outline-none focus:border-[#C98833]"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Wi-Fi (Mbps)</label>
                  <input
                    type="number"
                    value={newWifi}
                    onChange={(e) => setNewWifi(parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 bg-[#071317] border border-[#1D4552] rounded-xl text-white focus:outline-none focus:border-[#C98833]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Category Tag</label>
                <select
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  className="w-full px-3 py-2 bg-[#071317] border border-[#1D4552] rounded-xl text-white focus:outline-none focus:border-[#C98833]"
                >
                  <option value="Deep Work">Deep Work</option>
                  <option value="Client Calls">Client Calls</option>
                  <option value="Exploration">Exploration &amp; Sunset</option>
                  <option value="Trek / Nature">Trek / Nature</option>
                  <option value="Community">Community &amp; Tribe</option>
                  <option value="Wellness">Wellness &amp; Yoga</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#1D4552]/70">
                <button
                  type="button"
                  onClick={() => setIsAddingBlock(false)}
                  className="px-4 py-2 rounded-xl bg-[#071317] text-slate-300 border border-[#1D4552] font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#C98833] text-black font-bold hover:bg-[#DE9F4D]"
                >
                  Save to Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
