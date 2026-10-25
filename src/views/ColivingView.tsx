import React, { useState, useMemo } from 'react';
import {
  Building,
  Wifi,
  MapPin,
  Star,
  Check,
  Search,
  Send,
  X,
  CheckCircle2,
} from 'lucide-react';
import { COLIVING_SPACES_DATA, ColivingSpace } from '../data/colivingSpaces';

interface ColivingViewProps {
  onShowToast: (msg: string) => void;
  onPlanTripToDestination: (destinationId: string) => void;
}

export const ColivingView: React.FC<ColivingViewProps> = ({
  onShowToast,
  onPlanTripToDestination,
}) => {
  const [selectedHub, setSelectedHub] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedColivingForInquiry, setSelectedColivingForInquiry] = useState<ColivingSpace | null>(null);
  const [inquiryName, setInquiryName] = useState<string>('');
  const [inquiryDates, setInquiryDates] = useState<string>('Next Month (30 Days)');
  const [inquiryRoomType, setInquiryRoomType] = useState<'dorm' | 'private'>('private');
  const [inquirySubmitted, setInquirySubmitted] = useState<boolean>(false);

  const hubs = ['All', 'Goa', 'Manali', 'Rishikesh', 'Varkala', 'Bir Billing', 'Bali', 'Chiang Mai'];

  const filteredSpaces = useMemo(() => {
    return COLIVING_SPACES_DATA.filter((space) => {
      const matchHub =
        selectedHub === 'All' ||
        space.destinationName.toLowerCase().includes(selectedHub.toLowerCase());
      const matchSearch =
        space.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        space.destinationName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        space.vibe.toLowerCase().includes(searchQuery.toLowerCase());
      return matchHub && matchSearch;
    });
  }, [selectedHub, searchQuery]);

  const handleSubmitInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    setInquirySubmitted(true);
    setTimeout(() => {
      onShowToast(`Inquiry sent to ${selectedColivingForInquiry?.name}! Host will respond within 4 hours.`);
      setSelectedColivingForInquiry(null);
      setInquirySubmitted(false);
    }, 1200);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">

      {/* ─── 1. PAGE HEADER (Vita / Eloura Editorial Aesthetic) ─── */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0F262E] border border-[#1D4552] text-xs font-bold uppercase tracking-wider text-[#C98833]">
          <Building className="w-3.5 h-3.5" />
          <span>Vetted Infrastructure</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#FAFDFD] tracking-tight">
          Curated Coliving &amp; Workspaces. <br />
          <span className="font-serif italic font-normal text-[#C98833]">Zero internet disruption guarantee.</span>
        </h1>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          No surprise power outages. No shared residential Wi-Fi throttles.
          Every property listed below is physically audited with dedicated enterprise fiber, backup generators, and ergonomic workstations.
        </p>
      </div>

      {/* ─── 2. HUBS & SEARCH BAR ─── */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Hub Pills */}
          <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
            {hubs.map((hub) => (
              <button
                key={hub}
                type="button"
                onClick={() => setSelectedHub(hub)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  selectedHub === hub
                    ? 'bg-[#C98833] text-black shadow-md'
                    : 'bg-[#0F262E] text-slate-300 hover:bg-[#14313B] border border-[#1D4552]'
                }`}
              >
                {hub}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, city, or vibe…"
              className="w-full pl-9 pr-4 py-2 bg-[#0F262E] border border-[#1D4552] text-xs text-[#FAFDFD] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#C98833] placeholder-slate-500"
            />
          </div>
        </div>

        <div className="text-xs text-slate-400 font-medium">
          Showing <strong className="text-[#FAFDFD]">{filteredSpaces.length}</strong> audited workation properties
        </div>
      </div>

      {/* ─── 3. COLIVING PROPERTIES GRID ─── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredSpaces.map((space) => (
          <div
            key={space.id}
            className="flex flex-col bg-[#0F262E] border border-[#1D4552] rounded-3xl overflow-hidden hover:border-[#C98833]/60 transition-all duration-300 group hover:shadow-2xl"
          >
            {/* Visual Header */}
            <div className="relative h-64 w-full overflow-hidden bg-slate-900">
              <img
                src={space.imageUrl}
                alt={space.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F262E] via-transparent to-black/20" />

              {/* Wi-Fi & Rating Pills on Image */}
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/90 text-black backdrop-blur-md shadow-md">
                  <Wifi className="w-3.5 h-3.5" />
                  <span>{space.testedWifiMbps} Mbps Tested</span>
                </span>
              </div>

              <div className="absolute top-4 right-4 flex items-center gap-1 px-2.5 py-1 rounded-lg bg-black/60 text-xs font-bold text-amber-300 backdrop-blur-md border border-white/10">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{space.rating}</span>
                <span className="text-slate-400 text-[10px] font-normal">({space.reviewCount})</span>
              </div>

              {/* Location info */}
              <div className="absolute bottom-4 left-4 right-4">
                <span className="text-xs font-semibold text-[#C98833] flex items-center gap-1 mb-0.5">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{space.destinationName}</span>
                </span>
                <h3 className="text-xl font-bold text-[#FAFDFD] drop-shadow-sm">{space.name}</h3>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
              
              <div className="space-y-4">
                {/* Curator Quote */}
                <p className="text-xs text-slate-300 leading-relaxed italic border-l-2 border-[#C98833] pl-3 py-0.5">
                  "{space.curatorNote}"
                </p>

                {/* Infrastructure Details */}
                <div className="grid grid-cols-2 gap-3 p-3.5 rounded-2xl bg-[#071317] border border-[#1D4552]/70 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase tracking-wider">Wi-Fi Provider</span>
                    <span className="font-semibold text-slate-200">{space.wifiProvider}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase tracking-wider">Power Backup</span>
                    <span className="font-semibold text-emerald-400">{space.powerBackup}</span>
                  </div>
                </div>

                {/* Amenities Badges */}
                <div className="flex flex-wrap gap-1.5">
                  {space.amenities.map((amenity) => (
                    <span
                      key={amenity}
                      className="text-[10px] font-medium px-2.5 py-1 rounded-lg bg-[#14313B] text-slate-300 border border-[#1D4552]/80 flex items-center gap-1"
                    >
                      <Check className="w-3 h-3 text-[#C98833]" />
                      <span>{amenity}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Pricing & Booking Row */}
              <div className="pt-4 border-t border-[#1D4552]/60 space-y-3">
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="p-2 rounded-xl bg-[#071317]">
                    <div className="text-[10px] text-slate-400 uppercase">Dorm Bed</div>
                    <div className="text-xs font-bold text-[#FAFDFD]">₹{space.dormBedPriceINR.toLocaleString()}</div>
                    <div className="text-[9px] text-slate-500">/ night</div>
                  </div>
                  <div className="p-2 rounded-xl bg-[#071317]">
                    <div className="text-[10px] text-slate-400 uppercase">Private Room</div>
                    <div className="text-xs font-bold text-[#FAFDFD]">₹{space.privateRoomPriceINR.toLocaleString()}</div>
                    <div className="text-[9px] text-slate-500">/ night</div>
                  </div>
                  <div className="p-2 rounded-xl bg-[#071317] border border-[#C98833]/30">
                    <div className="text-[10px] text-[#C98833] uppercase font-bold">Monthly Pass</div>
                    <div className="text-xs font-extrabold text-[#C98833]">₹{space.monthlyPassINR.toLocaleString()}</div>
                    <div className="text-[9px] text-slate-500">/ month</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => onPlanTripToDestination(space.destinationId)}
                    className="py-2.5 px-3 rounded-xl bg-[#14313B] hover:bg-[#1A3C47] text-slate-200 font-semibold text-xs transition-colors text-center"
                  >
                    Calculate Trip Cost
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedColivingForInquiry(space);
                      setInquirySubmitted(false);
                    }}
                    className="py-2.5 px-3 rounded-xl bg-[#C98833] hover:bg-[#DE9F4D] text-black font-bold text-xs transition-colors text-center"
                  >
                    Reserve / Inquire
                  </button>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* ─── 4. INQUIRY MODAL ─── */}
      {selectedColivingForInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg rounded-3xl bg-[#0F262E] border border-[#1D4552] p-6 sm:p-8 space-y-6 shadow-2xl">
            
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-bold text-[#C98833] uppercase tracking-wider">
                  Direct Coliving Inquiry
                </span>
                <h3 className="text-xl font-bold text-[#FAFDFD] mt-0.5">
                  {selectedColivingForInquiry.name}
                </h3>
                <div className="text-xs text-slate-400">{selectedColivingForInquiry.destinationName}</div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedColivingForInquiry(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-[#14313B]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitInquiry} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={inquiryName}
                  onChange={(e) => setInquiryName(e.target.value)}
                  placeholder="e.g. Aryan Sharma"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#071317] border border-[#1D4552] text-xs text-[#FAFDFD] focus:outline-none focus:ring-1 focus:ring-[#C98833]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Room Preference
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setInquiryRoomType('private')}
                    className={`p-2.5 rounded-xl text-xs font-semibold border text-center transition-all ${
                      inquiryRoomType === 'private'
                        ? 'bg-[#C98833] text-black border-[#C98833]'
                        : 'bg-[#071317] text-slate-300 border-[#1D4552]'
                    }`}
                  >
                    Private Room
                  </button>
                  <button
                    type="button"
                    onClick={() => setInquiryRoomType('dorm')}
                    className={`p-2.5 rounded-xl text-xs font-semibold border text-center transition-all ${
                      inquiryRoomType === 'dorm'
                        ? 'bg-[#C98833] text-black border-[#C98833]'
                        : 'bg-[#071317] text-slate-300 border-[#1D4552]'
                    }`}
                  >
                    Nomad Dorm Bed
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Intended Stay Dates &amp; Duration
                </label>
                <input
                  type="text"
                  required
                  value={inquiryDates}
                  onChange={(e) => setInquiryDates(e.target.value)}
                  placeholder="e.g. Nov 15 - Dec 15 (1 Month)"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#071317] border border-[#1D4552] text-xs text-[#FAFDFD] focus:outline-none focus:ring-1 focus:ring-[#C98833]"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedColivingForInquiry(null)}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={inquirySubmitted}
                  className="px-6 py-2.5 rounded-xl bg-[#C98833] hover:bg-[#DE9F4D] text-black font-bold text-xs tracking-wide transition-all shadow-md flex items-center gap-2"
                >
                  {inquirySubmitted ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-black animate-spin" />
                      <span>Sending Inquiry...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Request Booking Check</span>
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
