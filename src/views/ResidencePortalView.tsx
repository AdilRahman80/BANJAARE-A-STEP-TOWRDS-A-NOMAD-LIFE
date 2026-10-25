import React, { useState } from 'react';
import {
  Building2,
  MapPin,
  Sparkles,
  Wifi,
  Briefcase,
  CheckCircle2,
  X,
  Clock,
  ArrowRight,
  Send,
  Plus,
} from 'lucide-react';
import { RESIDENCE_GIGS_DATA, ResidenceGig } from '../data/residenceGigs';

interface ResidencePortalViewProps {
  onShowToast: (msg: string) => void;
  onNavigateToPlanner: () => void;
}

export const ResidencePortalView: React.FC<ResidencePortalViewProps> = ({
  onShowToast,
  onNavigateToPlanner: _onNavigateToPlanner,
}) => {
  const [residencies, setResidencies] = useState<ResidenceGig[]>(RESIDENCE_GIGS_DATA);
  const [selectedCity, setSelectedCity] = useState<string>('All');
  const [selectedResidencyForApply, setSelectedResidencyForApply] = useState<ResidenceGig | null>(null);

  // Application Modal Form
  const [applicantName, setApplicantName] = useState<string>('');
  const [applicantEmail, setApplicantEmail] = useState<string>('');
  const [applicantPortfolio, setApplicantPortfolio] = useState<string>('');
  const [applicantPitch, setApplicantPitch] = useState<string>('');
  const [selectedStartDate, setSelectedStartDate] = useState<string>('2026-11-15');
  const [appliedSuccess, setAppliedSuccess] = useState<boolean>(false);

  // Host a Nomad Modal
  const [showHostModal, setShowHostModal] = useState<boolean>(false);
  const [newPropertyTitle, setNewPropertyTitle] = useState<string>('');
  const [newOrg, setNewOrg] = useState<string>('');
  const [newCity, setNewCity] = useState<string>('Coorg');
  const [newState, setNewState] = useState<string>('Karnataka');
  const [newStayOffer, setNewStayOffer] = useState<string>('Private Plantation Villa + Coffee Tasting');
  const [newStipend, setNewStipend] = useState<number>(45000);
  const [newWifiSpeed, setNewWifiSpeed] = useState<string>('180 Mbps');
  const [newDeliverables, setNewDeliverables] = useState<string>('Website overhaul and drone visuals');
  const [newHostBio, setNewHostBio] = useState<string>('Heritage coffee estate looking for creative nomad energy.');

  const cities = ['All', 'Manali', 'Assagao, Goa', 'Varkala', 'Bir Billing'];

  const filteredResidencies = residencies.filter((r) => {
    if (selectedCity === 'All') return true;
    return r.city.toLowerCase().includes(selectedCity.toLowerCase());
  });

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAppliedSuccess(true);
    setTimeout(() => {
      onShowToast(`Residency application submitted to ${selectedResidencyForApply?.propertyTitle}!`);
      setAppliedSuccess(false);
      setSelectedResidencyForApply(null);
      setApplicantPitch('');
      setApplicantPortfolio('');
    }, 1500);
  };

  const handleCreateHostListing = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPropertyTitle.trim()) return;

    const newGig: ResidenceGig = {
      id: `res-${Date.now()}`,
      propertyTitle: newPropertyTitle,
      organization: newOrg || newPropertyTitle,
      city: newCity,
      state: newState,
      imageUrl: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80',
      stayOffer: newStayOffer,
      stipendINR: newStipend,
      durationWeeks: 4,
      hoursPerWeek: 12,
      skillsRequired: ['Web Development', 'Content Strategy'],
      deliverables: newDeliverables.split(',').map((s) => s.trim()),
      amenitiesIncluded: [`${newWifiSpeed} Redundant Wi-Fi`, 'Chef-Cooked Meals', 'Private Studio'],
      hostBio: newHostBio,
      spotsAvailable: 1,
    };

    setResidencies([newGig, ...residencies]);
    setShowHostModal(false);
    onShowToast(`Nomad-in-Residence slot for "${newPropertyTitle}" published!`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">

      {/* ─── 1. PAGE HEADER (Vita / Eloura Editorial Aesthetic) ─── */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#1D4552]/60">
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0F262E] border border-[#1D4552] text-xs font-bold uppercase tracking-wider text-[#C98833]">
            <Building2 className="w-3.5 h-3.5" />
            <span>Nomad-in-Residence Exchange</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#FAFDFD] tracking-tight">
            Stay in Luxury. Get Paid to Create. <br />
            <span className="font-serif italic font-normal text-[#C98833]">Zero stay costs + guaranteed stipend.</span>
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Forget paying expensive hotel bills. Handpicked boutique eco-resorts, tea plantations, and heritage homestays across India host skilled digital nomads.
            Trade 10-15 hours of focused expertise (web development, brand identity, drone cinematography, SEO) for private villa suites, farm-to-table dining, high-speed Starlink, and cash stipends.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowHostModal(true)}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#C98833] hover:bg-[#DE9F4D] text-black font-bold text-xs tracking-wide transition-all shadow-md shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Host a Nomad-in-Residence</span>
        </button>
      </div>

      {/* ─── 2. HOW IT WORKS 3-STEP BANNER ─── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6 rounded-3xl bg-[#0F262E] border border-[#1D4552]">
        <div className="space-y-2 p-3">
          <div className="w-8 h-8 rounded-xl bg-[#C98833]/15 text-[#C98833] flex items-center justify-center font-bold text-sm">
            01
          </div>
          <h3 className="font-bold text-sm text-[#FAFDFD]">Apply with Your Portfolio</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Choose a residency that matches your craft. Submit your previous work and propose your milestone deliverables.
          </p>
        </div>

        <div className="space-y-2 p-3 border-t md:border-t-0 md:border-l border-[#1D4552]/70">
          <div className="w-8 h-8 rounded-xl bg-[#C98833]/15 text-[#C98833] flex items-center justify-center font-bold text-sm">
            02
          </div>
          <h3 className="font-bold text-sm text-[#FAFDFD]">Smart Milestone Agreement</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Clear expectations locked in writing: 10-15 hours/week of work, tested Wi-Fi speed guarantee, private suite, and meals.
          </p>
        </div>

        <div className="space-y-2 p-3 border-t md:border-t-0 md:border-l border-[#1D4552]/70">
          <div className="w-8 h-8 rounded-xl bg-[#C98833]/15 text-[#C98833] flex items-center justify-center font-bold text-sm">
            03
          </div>
          <h3 className="font-bold text-sm text-[#FAFDFD]">Live &amp; Earn Sustainably</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Spend mornings working on your client projects, afternoons fulfilling residency deliverables, and evenings exploring.
          </p>
        </div>
      </div>

      {/* ─── 3. CITY FILTER PILLS ─── */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        <span className="text-xs text-slate-400 font-semibold mr-1">Filter Location:</span>
        {cities.map((c) => {
          const isSelected = selectedCity === c;
          return (
            <button
              key={c}
              type="button"
              onClick={() => setSelectedCity(c)}
              className={`text-xs px-4 py-2 rounded-xl font-bold transition-all ${
                isSelected
                  ? 'bg-[#C98833] text-black shadow-md'
                  : 'bg-[#0F262E] text-slate-300 hover:bg-[#14313B] border border-[#1D4552]'
              }`}
            >
              {c}
            </button>
          );
        })}
      </div>

      {/* ─── 4. RESIDENCY LISTINGS GRID ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {filteredResidencies.map((res) => (
          <div
            key={res.id}
            className="flex flex-col bg-[#0F262E] border border-[#1D4552] hover:border-[#C98833]/50 rounded-3xl overflow-hidden transition-all duration-300 shadow-xl group"
          >
            {/* Image Banner */}
            <div className="relative h-60 w-full overflow-hidden bg-[#071317]">
              <img
                src={res.imageUrl}
                alt={res.propertyTitle}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F262E] via-[#071317]/40 to-transparent" />

              {/* Top Badges */}
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-[#C98833] text-black shadow-md">
                  <Sparkles className="w-3.5 h-3.5 text-black" />
                  <span>₹{res.stipendINR.toLocaleString('en-IN')}/mo Stipend</span>
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-black/60 text-white backdrop-blur-md border border-white/10">
                  <Clock className="w-3 h-3 text-[#C98833]" />
                  <span>{res.hoursPerWeek} hrs/wk</span>
                </span>
              </div>

              <div className="absolute top-4 right-4">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 backdrop-blur-md">
                  {res.spotsAvailable} Slot Open
                </span>
              </div>

              {/* Bottom Image Title */}
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-xs text-[#C98833] font-bold tracking-wider uppercase block">
                  {res.organization}
                </span>
                <h3 className="text-xl font-bold font-serif text-[#FAFDFD]">
                  {res.propertyTitle}
                </h3>
                <div className="flex items-center gap-1 text-xs text-slate-300 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-[#C98833]" />
                  <span>{res.city}, {res.state}</span>
                </div>
              </div>
            </div>

            {/* Body Details */}
            <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
              
              <div className="space-y-4">
                {/* Stay Offer Highlight */}
                <div className="p-3.5 rounded-2xl bg-[#071317] border border-[#1D4552] text-xs">
                  <span className="text-slate-400 font-semibold block text-[11px] uppercase tracking-wider mb-0.5">
                    Included Luxury Stay Offer:
                  </span>
                  <div className="font-bold text-[#C98833] text-sm">
                    {res.stayOffer}
                  </div>
                </div>

                {/* Host Bio */}
                <p className="text-xs text-slate-300 leading-relaxed italic">
                  "{res.hostBio}"
                </p>

                {/* Deliverables Required */}
                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-200 block">
                    Residency Deliverables:
                  </span>
                  <ul className="space-y-1.5">
                    {res.deliverables.map((deliv, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#C98833] shrink-0 mt-0.5" />
                        <span>{deliv}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Amenities Badges */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {res.amenitiesIncluded.map((amenity, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-lg bg-[#14313B] text-slate-300 border border-[#1D4552]"
                    >
                      <Wifi className="w-3 h-3 text-[#10B981]" />
                      <span>{amenity}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Footer */}
              <div className="pt-4 border-t border-[#1D4552]/70 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-slate-400 block">Duration:</span>
                  <span className="text-xs font-bold text-[#FAFDFD]">
                    {res.durationWeeks} Weeks Placement
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedResidencyForApply(res)}
                  className="px-5 py-2.5 rounded-xl bg-[#C98833] hover:bg-[#DE9F4D] text-black font-bold text-xs tracking-wide transition-all shadow-md flex items-center gap-2"
                >
                  <Briefcase className="w-3.5 h-3.5" />
                  <span>Apply for Residency</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* ─── 5. APPLY FOR RESIDENCY MODAL ─── */}
      {selectedResidencyForApply && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-[#0F262E] border border-[#1D4552] rounded-3xl max-w-lg w-full p-6 text-[#FAFDFD] space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#1D4552]/70 pb-3">
              <div>
                <span className="text-xs font-bold text-[#C98833] uppercase tracking-wider">
                  Nomad-in-Residence Application
                </span>
                <h3 className="text-lg font-bold">{selectedResidencyForApply.propertyTitle}</h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedResidencyForApply(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleApplySubmit} className="space-y-4 text-xs">
              <div className="p-3 rounded-2xl bg-[#071317] border border-[#1D4552] flex items-center justify-between">
                <div>
                  <span className="text-slate-400 text-[11px]">Monthly Stipend:</span>
                  <div className="font-bold text-[#C98833] text-sm">
                    ₹{selectedResidencyForApply.stipendINR.toLocaleString('en-IN')}/month
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-slate-400 text-[11px]">Commitment:</span>
                  <div className="font-bold text-white text-sm">
                    {selectedResidencyForApply.hoursPerWeek} hrs/week
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Your Full Name</label>
                <input
                  type="text"
                  required
                  value={applicantName}
                  onChange={(e) => setApplicantName(e.target.value)}
                  placeholder="e.g. Kabir Sharma"
                  className="w-full px-3 py-2 bg-[#071317] border border-[#1D4552] rounded-xl text-white focus:outline-none focus:border-[#C98833]"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Email / WhatsApp</label>
                <input
                  type="email"
                  required
                  value={applicantEmail}
                  onChange={(e) => setApplicantEmail(e.target.value)}
                  placeholder="kabir@nomadx.earth"
                  className="w-full px-3 py-2 bg-[#071317] border border-[#1D4552] rounded-xl text-white focus:outline-none focus:border-[#C98833]"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Portfolio / GitHub / Instagram URL</label>
                <input
                  type="url"
                  required
                  value={applicantPortfolio}
                  onChange={(e) => setApplicantPortfolio(e.target.value)}
                  placeholder="https://github.com/username or https://portfolio.site"
                  className="w-full px-3 py-2 bg-[#071317] border border-[#1D4552] rounded-xl text-white focus:outline-none focus:border-[#C98833]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Proposed Arrival Date</label>
                  <input
                    type="date"
                    value={selectedStartDate}
                    onChange={(e) => setSelectedStartDate(e.target.value)}
                    className="w-full px-3 py-2 bg-[#071317] border border-[#1D4552] rounded-xl text-white focus:outline-none focus:border-[#C98833]"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Preferred Stay</label>
                  <input
                    type="text"
                    disabled
                    value={`${selectedResidencyForApply.durationWeeks} Weeks Full Stay`}
                    className="w-full px-3 py-2 bg-[#071317]/50 border border-[#1D4552] rounded-xl text-slate-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Why are you the perfect match for this property?
                </label>
                <textarea
                  rows={3}
                  required
                  value={applicantPitch}
                  onChange={(e) => setApplicantPitch(e.target.value)}
                  placeholder="Highlight your relevant experience, proposed creative angle, and remote work cadence..."
                  className="w-full px-3 py-2 bg-[#071317] border border-[#1D4552] rounded-xl text-white focus:outline-none focus:border-[#C98833]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#1D4552]/70">
                <button
                  type="button"
                  onClick={() => setSelectedResidencyForApply(null)}
                  className="px-4 py-2 rounded-xl bg-[#071317] text-slate-300 border border-[#1D4552] font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={appliedSuccess}
                  className="px-5 py-2 rounded-xl bg-[#C98833] text-black font-bold hover:bg-[#DE9F4D] flex items-center gap-2"
                >
                  {appliedSuccess ? <CheckCircle2 className="w-4 h-4" /> : <Send className="w-4 h-4" />}
                  <span>{appliedSuccess ? 'Application Sent!' : 'Submit Residency Application'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─── 6. HOST A NOMAD MODAL ─── */}
      {showHostModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-[#0F262E] border border-[#1D4552] rounded-3xl max-w-lg w-full p-6 text-[#FAFDFD] space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#1D4552]/70 pb-3">
              <div>
                <span className="text-xs font-bold text-[#C98833] uppercase tracking-wider">Property Owners &amp; Brands</span>
                <h3 className="text-lg font-bold">List a Nomad-in-Residence Slot</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowHostModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateHostListing} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Property / Estate Name</label>
                  <input
                    type="text"
                    required
                    value={newPropertyTitle}
                    onChange={(e) => setNewPropertyTitle(e.target.value)}
                    placeholder="e.g. Nilgiri Tea Haven"
                    className="w-full px-3 py-2 bg-[#071317] border border-[#1D4552] rounded-xl text-white focus:outline-none focus:border-[#C98833]"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Company / Organization</label>
                  <input
                    type="text"
                    value={newOrg}
                    onChange={(e) => setNewOrg(e.target.value)}
                    placeholder="e.g. Haven Stays Ltd"
                    className="w-full px-3 py-2 bg-[#071317] border border-[#1D4552] rounded-xl text-white focus:outline-none focus:border-[#C98833]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">City / Town</label>
                  <input
                    type="text"
                    value={newCity}
                    onChange={(e) => setNewCity(e.target.value)}
                    className="w-full px-3 py-2 bg-[#071317] border border-[#1D4552] rounded-xl text-white focus:outline-none focus:border-[#C98833]"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">State</label>
                  <input
                    type="text"
                    value={newState}
                    onChange={(e) => setNewState(e.target.value)}
                    className="w-full px-3 py-2 bg-[#071317] border border-[#1D4552] rounded-xl text-white focus:outline-none focus:border-[#C98833]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Monthly Stipend (INR)</label>
                  <input
                    type="number"
                    value={newStipend}
                    onChange={(e) => setNewStipend(parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 bg-[#071317] border border-[#1D4552] rounded-xl text-white focus:outline-none focus:border-[#C98833]"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Audited Wi-Fi Speed</label>
                  <input
                    type="text"
                    value={newWifiSpeed}
                    onChange={(e) => setNewWifiSpeed(e.target.value)}
                    placeholder="e.g. 200 Mbps Fiber"
                    className="w-full px-3 py-2 bg-[#071317] border border-[#1D4552] rounded-xl text-white focus:outline-none focus:border-[#C98833]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Stay &amp; Meal Offer</label>
                <input
                  type="text"
                  value={newStayOffer}
                  onChange={(e) => setNewStayOffer(e.target.value)}
                  placeholder="e.g. Private Valley View Suite + 3 Organic Meals Daily"
                  className="w-full px-3 py-2 bg-[#071317] border border-[#1D4552] rounded-xl text-white focus:outline-none focus:border-[#C98833]"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Deliverables Required</label>
                <input
                  type="text"
                  value={newDeliverables}
                  onChange={(e) => setNewDeliverables(e.target.value)}
                  placeholder="e.g. Modern React Website, 12 Instagram Reels, SEO Setup"
                  className="w-full px-3 py-2 bg-[#071317] border border-[#1D4552] rounded-xl text-white focus:outline-none focus:border-[#C98833]"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Host Story &amp; Vibe</label>
                <textarea
                  rows={2}
                  value={newHostBio}
                  onChange={(e) => setNewHostBio(e.target.value)}
                  placeholder="Tell nomads about your property history and why they will love living here..."
                  className="w-full px-3 py-2 bg-[#071317] border border-[#1D4552] rounded-xl text-white focus:outline-none focus:border-[#C98833]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#1D4552]/70">
                <button
                  type="button"
                  onClick={() => setShowHostModal(false)}
                  className="px-4 py-2 rounded-xl bg-[#071317] text-slate-300 border border-[#1D4552] font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#C98833] text-black font-bold hover:bg-[#DE9F4D]"
                >
                  Publish Residency Slot
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
