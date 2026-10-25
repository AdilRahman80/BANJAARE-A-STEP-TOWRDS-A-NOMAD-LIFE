import React, { useState, useMemo } from 'react';
import {
  Briefcase,
  Search,
  Clock,
  Wifi,
  CheckCircle2,
  Send,
  X,
  TrendingUp,
  MapPin,
} from 'lucide-react';
import { REMOTE_GIGS_DATA, RemoteGig } from '../data/remoteGigs';

interface GigsViewProps {
  onShowToast: (msg: string) => void;
}

export const GigsView: React.FC<GigsViewProps> = ({
  onShowToast,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedGigForPitch, setSelectedGigForPitch] = useState<RemoteGig | null>(null);
  const [applicantName, setApplicantName] = useState<string>('');
  const [applicantPortfolio, setApplicantPortfolio] = useState<string>('');
  const [applicantPitchText, setApplicantPitchText] = useState<string>('');
  const [pitchSubmitted, setPitchSubmitted] = useState<boolean>(false);

  // Income Calculator state
  const [simWeeklyHours, setSimWeeklyHours] = useState<number>(20);
  const [simHourlyRateUSD, setSimHourlyRateUSD] = useState<number>(25);

  const calculatedMonthlyUSD = simWeeklyHours * simHourlyRateUSD * 4.2;
  const calculatedMonthlyINR = calculatedMonthlyUSD * 83;

  // Filtered Gigs
  const filteredGigs = useMemo(() => {
    return REMOTE_GIGS_DATA.filter((gig) => {
      const matchCat = selectedCategory === 'All' || gig.category === selectedCategory;
      const matchSearch =
        gig.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        gig.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        gig.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCat && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleOpenPitchModal = (gig: RemoteGig) => {
    setSelectedGigForPitch(gig);
    setApplicantPitchText(
      `Hi ${gig.company} team,\n\nI'm an experienced remote professional specializing in ${gig.skills.slice(0, 2).join(' & ')}. I love your async approach and I'm currently working nomadically with 200+ Mbps verified fiber. I have 15-20 hours/week dedicated to deliver high-quality output without routine meetings.\n\nLooking forward to speaking!`
    );
    setPitchSubmitted(false);
  };

  const handleSubmitPitch = (e: React.FormEvent) => {
    e.preventDefault();
    setPitchSubmitted(true);
    setTimeout(() => {
      onShowToast(`Proposal sent to ${selectedGigForPitch?.company}! They will reply via email.`);
      setSelectedGigForPitch(null);
      setPitchSubmitted(false);
    }, 1200);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">

      {/* ─── 1. PAGE HEADER (Vita / Eloura Editorial Aesthetic) ─── */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0F262E] border border-[#1D4552] text-xs font-bold uppercase tracking-wider text-[#C98833]">
          <Briefcase className="w-3.5 h-3.5" />
          <span>Nomad Remote Marketplace</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#FAFDFD] tracking-tight">
          Earn while you explore. <br />
          <span className="font-serif italic font-normal text-[#C98833]">Verified async contracts.</span>
        </h1>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          Say goodbye to fixed 9-to-5 desk time. Every role listed below offers flexible timezones, async communication, and enough income to comfortably fund your life in Goa, the Himalayas, or Bali.
        </p>
      </div>

      {/* ─── 2. LIVE NOMAD EARNINGS & NET SURPLUS SIMULATOR ─── */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#0F262E] border border-[#1D4552] space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#1D4552]/60">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#C98833] flex items-center gap-1.5 mb-1">
              <TrendingUp className="w-4 h-4 text-[#C98833]" />
              <span>Interactive Surplus Engine</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#FAFDFD]">
              Simulate Your Workation Net Income
            </h2>
          </div>
          <div className="text-right">
            <span className="text-xs text-slate-400 block">Projected Monthly Revenue</span>
            <span className="text-2xl sm:text-3xl font-extrabold text-emerald-400">
              ₹{Math.round(calculatedMonthlyINR).toLocaleString()}{' '}
              <span className="text-xs text-slate-400 font-normal">(${Math.round(calculatedMonthlyUSD)})</span>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Controls */}
          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-300 mb-2">
                <span>Weekly Hours Committed</span>
                <span className="text-[#C98833] font-bold">{simWeeklyHours} hrs / week</span>
              </div>
              <input
                type="range"
                min={5}
                max={40}
                step={1}
                value={simWeeklyHours}
                onChange={(e) => setSimWeeklyHours(Number(e.target.value))}
                className="w-full h-2 bg-[#071317] rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-500 mt-1">
                <span>5 hrs (Side project)</span>
                <span>20 hrs (Sweet spot)</span>
                <span>40 hrs (Full time)</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-300 mb-2">
                <span>Effective Hourly Rate (USD)</span>
                <span className="text-[#C98833] font-bold">${simHourlyRateUSD} / hr</span>
              </div>
              <input
                type="range"
                min={10}
                max={100}
                step={5}
                value={simHourlyRateUSD}
                onChange={(e) => setSimHourlyRateUSD(Number(e.target.value))}
                className="w-full h-2 bg-[#071317] rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-500 mt-1">
                <span>$10/hr</span>
                <span>$25/hr (Mid-tier)</span>
                <span>$100/hr (Senior)</span>
              </div>
            </div>
          </div>

          {/* Living Cost Comparison Cards */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { city: 'Goa', livingCost: 38000, tag: 'Beach & Cafes' },
              { city: 'Manali', livingCost: 32000, tag: 'Mountain Air' },
              { city: 'Rishikesh', livingCost: 28000, tag: 'Riverside Yoga' },
              { city: 'Bali, Ubud', livingCost: 55000, tag: 'Tropical Hub' },
            ].map((hub) => {
              const netSurplus = Math.round(calculatedMonthlyINR - hub.livingCost);
              return (
                <div
                  key={hub.city}
                  className="p-3.5 rounded-2xl bg-[#071317] border border-[#1D4552] flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[10px] font-semibold text-[#C98833] uppercase tracking-wider">{hub.tag}</span>
                    <h3 className="text-sm font-bold text-[#FAFDFD] mt-0.5">{hub.city}</h3>
                    <div className="text-[11px] text-slate-400 mt-1">
                      Avg Living: ₹{hub.livingCost.toLocaleString()}/mo
                    </div>
                  </div>
                  <div className="pt-2 mt-2 border-t border-[#1D4552]/60">
                    <span className="text-[10px] text-slate-400 block">Net Monthly Savings</span>
                    <span className={`text-sm font-extrabold ${netSurplus >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                      {netSurplus >= 0 ? '+' : ''}₹{netSurplus.toLocaleString()}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ─── 3. CATEGORY & SEARCH FILTER BAR ─── */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
            {['All', 'Tech', 'Creative', 'Writing', 'Marketing', 'Operations'].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#C98833] text-black shadow-md'
                    : 'bg-[#0F262E] text-slate-300 hover:bg-[#14313B] border border-[#1D4552]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by role, company, or skill…"
              className="w-full pl-9 pr-4 py-2 bg-[#0F262E] border border-[#1D4552] text-xs text-[#FAFDFD] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#C98833] placeholder-slate-500"
            />
          </div>
        </div>

        <div className="text-xs text-slate-400 font-medium">
          Showing <strong className="text-[#FAFDFD]">{filteredGigs.length}</strong> verified remote roles
        </div>
      </div>

      {/* ─── 4. GIGS GRID ─── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGigs.map((gig) => (
          <div
            key={gig.id}
            className="p-6 rounded-2xl bg-[#0F262E] border border-[#1D4552] hover:border-[#C98833]/60 transition-all duration-300 flex flex-col justify-between space-y-6 group hover:shadow-xl"
          >
            <div className="space-y-4">
              {/* Header */}
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#C98833] bg-[#C98833]/15 border border-[#C98833]/30 px-2 py-0.5 rounded-md inline-block mb-1.5">
                    {gig.category}
                  </span>
                  <h3 className="text-base font-bold text-[#FAFDFD] group-hover:text-[#C98833] transition-colors">
                    {gig.title}
                  </h3>
                  <div className="text-xs text-slate-400 font-medium mt-0.5">{gig.company}</div>
                </div>
                {gig.featured && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30 shrink-0">
                    Featured
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                {gig.description}
              </p>

              {/* Skills Tags */}
              <div className="flex flex-wrap gap-1.5">
                {gig.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-[10px] font-medium px-2 py-0.5 rounded bg-[#14313B] text-slate-300 border border-[#1D4552]/70"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Key Specs */}
              <div className="p-3 rounded-xl bg-[#071317] border border-[#1D4552]/50 text-xs space-y-1.5">
                <div className="flex items-center justify-between text-slate-300">
                  <span className="flex items-center gap-1.5 text-slate-400">
                    <Clock className="w-3.5 h-3.5 text-[#C98833]" /> Commitment:
                  </span>
                  <span className="font-semibold">{gig.hoursPerWeek} hrs / week</span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span className="flex items-center gap-1.5 text-slate-400">
                    <Wifi className="w-3.5 h-3.5 text-emerald-400" /> Min Wi-Fi:
                  </span>
                  <span className="font-semibold">{gig.minWifiSpeedMbps} Mbps</span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span className="flex items-center gap-1.5 text-slate-400">
                    <MapPin className="w-3.5 h-3.5 text-[#C98833]" /> Location:
                  </span>
                  <span className="font-semibold text-[11px] truncate max-w-[140px]">{gig.locationFlexibility}</span>
                </div>
              </div>
            </div>

            {/* Footer & Actions */}
            <div className="pt-4 border-t border-[#1D4552]/60 space-y-3">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Compensation</span>
                  <span className="text-lg font-extrabold text-[#FAFDFD]">
                    ₹{gig.stipendINR.toLocaleString()}
                  </span>
                  <span className="text-xs text-slate-400 ml-1">(${gig.stipendUSD})/mo</span>
                </div>
                <span className="text-[11px] text-slate-500">{gig.postedDate}</span>
              </div>

              <button
                type="button"
                onClick={() => handleOpenPitchModal(gig)}
                className="w-full py-2.5 px-4 rounded-xl bg-[#C98833] hover:bg-[#DE9F4D] text-black font-bold text-xs tracking-wide transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Apply / Pitch Now</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ─── 5. PITCH MODAL ─── */}
      {selectedGigForPitch && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg rounded-3xl bg-[#0F262E] border border-[#1D4552] p-6 sm:p-8 space-y-6 shadow-2xl">
            
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-bold text-[#C98833] uppercase tracking-wider">
                  Quick Proposal Pitch
                </span>
                <h3 className="text-xl font-bold text-[#FAFDFD] mt-0.5">
                  {selectedGigForPitch.title}
                </h3>
                <div className="text-xs text-slate-400">{selectedGigForPitch.company}</div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedGigForPitch(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-[#14313B]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitPitch} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Your Full Name
                </label>
                <input
                  type="text"
                  required
                  value={applicantName}
                  onChange={(e) => setApplicantName(e.target.value)}
                  placeholder="e.g. Aryan Sharma"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#071317] border border-[#1D4552] text-xs text-[#FAFDFD] focus:outline-none focus:ring-1 focus:ring-[#C98833]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Portfolio / GitHub / LinkedIn URL
                </label>
                <input
                  type="url"
                  required
                  value={applicantPortfolio}
                  onChange={(e) => setApplicantPortfolio(e.target.value)}
                  placeholder="https://github.com/yourname or portfolio"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#071317] border border-[#1D4552] text-xs text-[#FAFDFD] focus:outline-none focus:ring-1 focus:ring-[#C98833]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Nomad Cover Note &amp; Availability
                </label>
                <textarea
                  rows={5}
                  required
                  value={applicantPitchText}
                  onChange={(e) => setApplicantPitchText(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#071317] border border-[#1D4552] text-xs text-[#FAFDFD] focus:outline-none focus:ring-1 focus:ring-[#C98833] leading-relaxed resize-none font-mono"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedGigForPitch(null)}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={pitchSubmitted}
                  className="px-6 py-2.5 rounded-xl bg-[#C98833] hover:bg-[#DE9F4D] text-black font-bold text-xs tracking-wide transition-all shadow-md flex items-center gap-2"
                >
                  {pitchSubmitted ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-black animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Direct Pitch</span>
                    </>
                  )}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};
