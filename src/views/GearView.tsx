import React, { useState, useEffect } from 'react';
import {
  PackageCheck,
  Laptop,
  Shield,
  FileCheck,
  Compass,
  CheckCircle2,
  Plus,
  Copy,
  RotateCcw,
  Sparkles,
  X,
  AlertCircle,
  ArrowRight,
} from 'lucide-react';
import { INITIAL_NOMAD_GEAR, GearItem } from '../data/gearData';

interface GearViewProps {
  onShowToast: (msg: string) => void;
  onNavigateToPlanner: () => void;
}

const STORAGE_KEY = 'nomadx_gear_checklist_v1';

export const GearView: React.FC<GearViewProps> = ({
  onShowToast,
  onNavigateToPlanner,
}) => {
  const [gearList, setGearList] = useState<GearItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_NOMAD_GEAR;
  });

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState<boolean>(false);

  // New item form
  const [newItemName, setNewItemName] = useState<string>('');
  const [newItemCategory, setNewItemCategory] = useState<'tech' | 'ergonomics' | 'documents' | 'essentials'>('tech');
  const [newItemDesc, setNewItemDesc] = useState<string>('');
  const [newItemEssential, setNewItemEssential] = useState<boolean>(true);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(gearList));
    } catch {
      // ignore
    }
  }, [gearList]);

  const toggleItemPacked = (id: string) => {
    setGearList((prev) =>
      prev.map((item) => (item.id === id ? { ...item, isPacked: !item.isPacked } : item))
    );
  };

  const handleResetChecklist = () => {
    setGearList(INITIAL_NOMAD_GEAR);
    onShowToast('Reset gear list to initial remote work defaults.');
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim()) return;

    const newItem: GearItem = {
      id: `gear-${Date.now()}`,
      name: newItemName,
      category: newItemCategory,
      description: newItemDesc,
      isPacked: false,
      isEssential: newItemEssential,
    };

    setGearList([newItem, ...gearList]);
    setShowAddModal(false);
    setNewItemName('');
    setNewItemDesc('');
    onShowToast(`Added "${newItemName}" to your nomad pack list!`);
  };

  const handleCopyManifest = () => {
    const total = gearList.length;
    const packed = gearList.filter((g) => g.isPacked).length;
    const manifest = `NOMADX REMOTE WORK GEAR MANIFEST (${packed}/${total} Packed)

${gearList
  .map(
    (g) =>
      `[${g.isPacked ? 'X' : ' '}] ${g.name} (${g.category.toUpperCase()})${
        g.isEssential ? ' ★ Essential' : ''
      }\n• ${g.description}`
  )
  .join('\n\n')}

Generated via NomadX (India's Digital Nomad Launchpad)`.trim();

    navigator.clipboard.writeText(manifest);
    onShowToast('Gear manifest copied to clipboard!');
  };

  const filteredItems = gearList.filter(
    (item) => activeCategory === 'all' || item.category === activeCategory
  );

  const packedCount = gearList.filter((g) => g.isPacked).length;
  const progressPercent = Math.round((packedCount / gearList.length) * 100);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">

      {/* ─── 1. PAGE HEADER ─── */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#1D4552]/40">
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0F262E] border border-[#1D4552] text-xs font-bold uppercase tracking-wider text-[#C98833]">
            <PackageCheck className="w-3.5 h-3.5" />
            <span>Tech &amp; Workstation Gear Studio</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#FAFDFD] tracking-tight">
            Never Get Caught Without Backup. <br />
            <span className="font-serif italic font-normal text-[#C98833]">Workation packing audited for nomads.</span>
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Holiday packing won't save you when your laptop battery drains during a Spiti Valley blackout or when a beach shack only has European two-pin sockets.
            Audited checklist of dual-voltage powerbanks, Roost stands, noise-cancelling mics, zero-forex cards, and mountain permits.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={handleCopyManifest}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0F262E] hover:bg-[#14313B] text-slate-200 border border-[#1D4552] hover:border-[#C98833] text-xs font-bold transition-all shadow-sm"
          >
            <Copy className="w-4 h-4 text-[#C98833]" />
            <span>Copy Manifest</span>
          </button>

          <button
            type="button"
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#C98833] hover:bg-[#DE9F4D] text-black font-bold text-xs tracking-wide transition-all shadow-md"
          >
            <Plus className="w-4 h-4" />
            <span>Add Custom Gear</span>
          </button>
        </div>
      </div>

      {/* ─── 2. PROGRESS BANNER ─── */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#0F262E] border border-[#1D4552] space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-bold text-[#C98833] uppercase tracking-wider">
              Departure Readiness
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#FAFDFD]">
              {packedCount} of {gearList.length} Items Packed ({progressPercent}%)
            </h2>
          </div>

          <button
            type="button"
            onClick={handleResetChecklist}
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset to Standard Kit</span>
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-3 bg-[#071317] rounded-full overflow-hidden border border-[#1D4552]">
          <div
            className="h-full bg-gradient-to-r from-[#C98833] to-[#FBA13A] transition-all duration-500 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* ─── 3. CATEGORY SELECTOR PILLS ─── */}
      <div className="flex flex-wrap items-center gap-2">
        {[
          { id: 'all', label: 'All Gear', icon: PackageCheck },
          { id: 'tech', label: 'Tech & Connectivity', icon: Laptop },
          { id: 'ergonomics', label: 'Workstation Ergonomics', icon: Compass },
          { id: 'documents', label: 'Permits & Banking', icon: FileCheck },
          { id: 'essentials', label: 'Climate Essentials', icon: Shield },
        ].map((tab) => {
          const isSelected = activeCategory === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveCategory(tab.id)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                isSelected
                  ? 'bg-[#C98833] text-black shadow-md'
                  : 'bg-[#0F262E] text-slate-300 hover:bg-[#14313B] border border-[#1D4552]'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ─── 4. GEAR CHECKLIST GRID ─── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredItems.map((item) => {
          return (
            <div
              key={item.id}
              onClick={() => toggleItemPacked(item.id)}
              className={`p-5 rounded-2xl border transition-all duration-200 cursor-pointer flex items-start justify-between gap-4 select-none ${
                item.isPacked
                  ? 'bg-[#071317]/60 border-[#1D4552]/40 opacity-70'
                  : 'bg-[#0F262E] border-[#1D4552] hover:border-[#C98833]/60 shadow-md'
              }`}
            >
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-2">
                  <span
                    className={`text-sm sm:text-base font-bold ${
                      item.isPacked ? 'line-through text-slate-500' : 'text-[#FAFDFD]'
                    }`}
                  >
                    {item.name}
                  </span>
                  {item.isEssential && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#C98833]/15 text-[#C98833] border border-[#C98833]/30">
                      <Sparkles className="w-2.5 h-2.5" /> Essential
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {item.description}
                </p>

                {item.recommendationNote && (
                  <div className="text-[11px] text-[#C98833] flex items-center gap-1.5 pt-1">
                    <AlertCircle className="w-3 h-3 shrink-0" />
                    <span>Tip: {item.recommendationNote}</span>
                  </div>
                )}
              </div>

              {/* Checkbox button */}
              <div
                className={`w-6 h-6 rounded-lg border flex items-center justify-center shrink-0 transition-colors ${
                  item.isPacked
                    ? 'bg-emerald-500 border-emerald-500 text-black font-bold'
                    : 'border-slate-600 bg-[#071317] text-transparent'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>
          );
        })}
      </div>

      {/* ─── 5. BOTTOM ROUTE CTA ─── */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-[#0F262E] to-[#14313B] border border-[#1D4552] flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-1">
          <h3 className="text-lg font-bold text-[#FAFDFD]">
            All packed and ready for departure?
          </h3>
          <p className="text-xs text-slate-300">
            Finalize your accommodation and calculate train/flight transit costs in the Trip Architect.
          </p>
        </div>
        <button
          type="button"
          onClick={onNavigateToPlanner}
          className="px-6 py-3 rounded-xl bg-[#C98833] hover:bg-[#DE9F4D] text-black font-bold text-xs tracking-wide shrink-0 transition-all shadow-md flex items-center gap-2"
        >
          <span>Open Trip Architect</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* ─── 6. ADD CUSTOM GEAR MODAL ─── */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-[#0F262E] border border-[#1D4552] rounded-3xl max-w-md w-full p-6 text-[#FAFDFD] space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#1D4552]/70 pb-3">
              <h3 className="text-base font-bold">Add Custom Nomad Gear</h3>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddItem} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Item Name</label>
                <input
                  type="text"
                  required
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                  placeholder="e.g. DJI Mini 3 Pro Drone & ND Filters"
                  className="w-full px-3 py-2 bg-[#071317] border border-[#1D4552] rounded-xl text-white focus:outline-none focus:border-[#C98833]"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Category</label>
                <select
                  value={newItemCategory}
                  onChange={(e) => setNewItemCategory(e.target.value as any)}
                  className="w-full px-3 py-2 bg-[#071317] border border-[#1D4552] rounded-xl text-white focus:outline-none focus:border-[#C98833]"
                >
                  <option value="tech">Tech &amp; Connectivity</option>
                  <option value="ergonomics">Workstation Ergonomics</option>
                  <option value="documents">Permits &amp; Banking</option>
                  <option value="essentials">Climate Essentials</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Why is this important?</label>
                <input
                  type="text"
                  value={newItemDesc}
                  onChange={(e) => setNewItemDesc(e.target.value)}
                  placeholder="e.g. Client reel shoots from mountain cliffs"
                  className="w-full px-3 py-2 bg-[#071317] border border-[#1D4552] rounded-xl text-white focus:outline-none focus:border-[#C98833]"
                />
              </div>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={newItemEssential}
                  onChange={(e) => setNewItemEssential(e.target.checked)}
                  className="w-4 h-4 rounded text-[#C98833] accent-[#C98833]"
                />
                <span className="text-slate-300">Mark as High-Priority / Essential</span>
              </label>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#1D4552]/70">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-[#071317] text-slate-300 border border-[#1D4552]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#C98833] text-black font-bold hover:bg-[#DE9F4D]"
                >
                  Save Gear
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
