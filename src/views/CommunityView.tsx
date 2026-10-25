import React, { useState } from 'react';
import {
  Users,
  Calendar,
  MapPin,
  MessageSquare,
  Plus,
  Send,
  CheckCircle2,
  X,
  Compass,
  ArrowRight,
  Coffee,
} from 'lucide-react';
import {
  NOMAD_MEMBERS_DATA,
  COMMUNITY_EVENTS_DATA,
  COMPANION_REQUESTS_DATA,
  NomadMember,
  CompanionRequest,
} from '../data/communityData';

interface CommunityViewProps {
  onShowToast: (msg: string) => void;
  onNavigateToPlanner: () => void;
}

export const CommunityView: React.FC<CommunityViewProps> = ({
  onShowToast,
  onNavigateToPlanner,
}) => {
  const [activeCity, setActiveCity] = useState<string>('All');
  const [activeTab, setActiveTab] = useState<'members' | 'events' | 'companions'>('members');
  const [selectedMemberForChat, setSelectedMemberForChat] = useState<NomadMember | null>(null);
  const [chatMessage, setChatMessage] = useState<string>('');
  const [chatSent, setChatSent] = useState<boolean>(false);

  // Companion request state
  const [showCompanionModal, setShowCompanionModal] = useState<boolean>(false);
  const [newCompAuthor, setNewCompAuthor] = useState<string>('');
  const [newCompRole, setNewCompRole] = useState<string>('');
  const [newCompDest, setNewCompDest] = useState<string>('Goa (Assagao)');
  const [newCompBudget, setNewCompBudget] = useState<number>(30000);
  const [newCompLookingFor, setNewCompLookingFor] = useState<'Coliving Villa Split' | 'Coworking Partner' | 'Weekend Trek Companion'>('Coliving Villa Split');
  const [newCompDetails, setNewCompDetails] = useState<string>('');
  const [companionRequests, setCompanionRequests] = useState<CompanionRequest[]>(COMPANION_REQUESTS_DATA);

  // RSVP state
  const [rsvpdEvents, setRsvpdEvents] = useState<Record<string, boolean>>({});

  const cities = ['All', 'Goa', 'Manali', 'Varkala', 'Rishikesh'];

  const filteredMembers = NOMAD_MEMBERS_DATA.filter(
    (m) => activeCity === 'All' || m.currentCity.toLowerCase().includes(activeCity.toLowerCase())
  );

  const filteredEvents = COMMUNITY_EVENTS_DATA.filter(
    (e) => activeCity === 'All' || e.city.toLowerCase().includes(activeCity.toLowerCase())
  );

  const filteredCompanions = companionRequests.filter(
    (c) => activeCity === 'All' || c.destination.toLowerCase().includes(activeCity.toLowerCase())
  );

  const handleSendMemberMessage = (e: React.FormEvent) => {
    e.preventDefault();
    setChatSent(true);
    setTimeout(() => {
      onShowToast(`Coffee invite sent to ${selectedMemberForChat?.name}!`);
      setSelectedMemberForChat(null);
      setChatSent(false);
      setChatMessage('');
    }, 1000);
  };

  const handleToggleRsvp = (eventId: string, title: string) => {
    const isNow = !rsvpdEvents[eventId];
    setRsvpdEvents((prev) => ({ ...prev, [eventId]: isNow }));
    if (isNow) {
      onShowToast(`RSVP Confirmed for ${title}! We added you to the guestlist.`);
    } else {
      onShowToast(`Cancelled RSVP for ${title}.`);
    }
  };

  const handleCreateCompanionRequest = (e: React.FormEvent) => {
    e.preventDefault();
    const newEntry: CompanionRequest = {
      id: `comp-${Date.now()}`,
      authorName: newCompAuthor,
      authorRole: newCompRole,
      destination: newCompDest,
      timeframe: 'Next 30 Days',
      targetBudgetINR: Number(newCompBudget),
      lookingFor: newCompLookingFor,
      details: newCompDetails,
      postedAgo: 'Just now',
    };
    setCompanionRequests([newEntry, ...companionRequests]);
    setShowCompanionModal(false);
    onShowToast('Your companion / villa split request is now live in the community hub!');
    setNewCompAuthor('');
    setNewCompRole('');
    setNewCompDetails('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-14">

      {/* ─── 1. PAGE HEADER (Vita / Eloura Editorial Aesthetic) ─── */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#1D4552]/60">
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0F262E] border border-[#1D4552] text-xs font-bold uppercase tracking-wider text-[#C98833]">
            <Users className="w-3.5 h-3.5" />
            <span>Community &amp; Tribe Matching</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#FAFDFD] tracking-tight">
            Travel without loneliness. <br />
            <span className="font-serif italic font-normal text-[#C98833]">Find your remote tribe.</span>
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Connect with remote software engineers, creators, and consultants living in your workation hub.
            Split luxury coliving villas, attend weekly masterminds, and find weekend trek partners.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowCompanionModal(true)}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#C98833] hover:bg-[#DE9F4D] text-black font-bold text-xs tracking-wide transition-all shadow-md shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Post Villa Split / Companion Request</span>
        </button>
      </div>

      {/* ─── 2. CITY FILTER & SUBTABS ─── */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Hub Filter */}
        <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
          <span className="text-xs text-slate-400 font-semibold mr-1">Hub:</span>
          {cities.map((city) => (
            <button
              key={city}
              type="button"
              onClick={() => setActiveCity(city)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                activeCity === city
                  ? 'bg-[#C98833] text-black font-bold'
                  : 'bg-[#0F262E] text-slate-300 hover:bg-[#14313B] border border-[#1D4552]'
              }`}
            >
              {city}
            </button>
          ))}
        </div>

        {/* View Category Tabs */}
        <div className="p-1 rounded-2xl bg-[#0F262E] border border-[#1D4552] flex items-center gap-1">
          <button
            type="button"
            onClick={() => setActiveTab('members')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'members'
                ? 'bg-[#14313B] text-[#FAFDFD] border border-[#1D4552]'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Nomads In Town ({filteredMembers.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('events')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'events'
                ? 'bg-[#14313B] text-[#FAFDFD] border border-[#1D4552]'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Weekly Meetups ({filteredEvents.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('companions')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'companions'
                ? 'bg-[#14313B] text-[#FAFDFD] border border-[#1D4552]'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Villa Splits &amp; Companions ({filteredCompanions.length})
          </button>
        </div>
      </div>

      {/* ─── 3. TAB CONTENT ─── */}

      {/* TAB 1: NOMADS IN TOWN */}
      {activeTab === 'members' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredMembers.map((member) => (
            <div
              key={member.id}
              className="p-6 rounded-2xl bg-[#0F262E] border border-[#1D4552] hover:border-[#C98833]/60 transition-all flex flex-col justify-between space-y-6 group"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <img
                    src={member.avatarUrl}
                    alt={member.name}
                    className="w-12 h-12 rounded-xl object-cover border border-[#1D4552]"
                  />
                  <div>
                    <h3 className="text-sm font-bold text-[#FAFDFD] group-hover:text-[#C98833] transition-colors">
                      {member.name}
                    </h3>
                    <div className="text-[11px] text-[#C98833] font-semibold">{member.role}</div>
                    <div className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-[#C98833]" /> {member.currentCity}
                    </div>
                  </div>
                </div>

                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>{member.status}</span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                  {member.bio}
                </p>

                <div className="space-y-1.5 pt-2 border-t border-[#1D4552]/50 text-[11px] text-slate-400">
                  <div>
                    <span className="font-semibold text-slate-300">Work Hours:</span> {member.workHours}
                  </div>
                  <div className="flex flex-wrap gap-1 pt-1">
                    {member.skills.map((s) => (
                      <span key={s} className="px-2 py-0.5 rounded bg-[#071317] text-slate-300 border border-[#1D4552]/60 text-[10px]">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setSelectedMemberForChat(member);
                  setChatMessage(`Hi ${member.name}! I'm working from ${member.currentCity} as well. Would love to grab a specialty coffee or cowork this week.`);
                }}
                className="w-full py-2.5 rounded-xl bg-[#071317] hover:bg-[#14313B] text-slate-200 border border-[#1D4552] hover:border-[#C98833] font-bold text-xs transition-colors flex items-center justify-center gap-2"
              >
                <Coffee className="w-3.5 h-3.5 text-[#C98833]" />
                <span>Invite For Coffee / Co-work</span>
              </button>
            </div>
          ))}
        </div>
      )}

      {/* TAB 2: WEEKLY COMMUNITY EVENTS */}
      {activeTab === 'events' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredEvents.map((event) => {
            const isRsvpd = rsvpdEvents[event.id] ?? false;
            return (
              <div
                key={event.id}
                className="p-6 rounded-2xl bg-[#0F262E] border border-[#1D4552] flex flex-col justify-between space-y-6"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-[#C98833]/15 text-[#C98833] border border-[#C98833]/30">
                      {event.category}
                    </span>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-[#C98833]" />
                      <span>{event.attendeesCount + (isRsvpd ? 1 : 0)} Nomads Attending</span>
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#FAFDFD]">{event.title}</h3>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {event.description}
                  </p>

                  <div className="grid grid-cols-2 gap-2 p-3 rounded-xl bg-[#071317] border border-[#1D4552]/70 text-xs text-slate-300">
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase">When</span>
                      <span className="font-semibold text-slate-200">{event.date} · {event.time}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase">Where</span>
                      <span className="font-semibold text-[#C98833] truncate block">{event.venue}</span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleToggleRsvp(event.id, event.title)}
                  className={`w-full py-2.5 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 ${
                    isRsvpd
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : 'bg-[#C98833] hover:bg-[#DE9F4D] text-black shadow-md'
                  }`}
                >
                  {isRsvpd ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>You're on the Guestlist (RSVP'd)</span>
                    </>
                  ) : (
                    <>
                      <Calendar className="w-4 h-4" />
                      <span>RSVP Free For This Meetup</span>
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* TAB 3: COMPANION REQUESTS */}
      {activeTab === 'companions' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredCompanions.map((comp) => (
            <div
              key={comp.id}
              className="p-6 rounded-2xl bg-[#0F262E] border border-[#1D4552] flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#C98833] bg-[#C98833]/15 border border-[#C98833]/30 px-2.5 py-0.5 rounded-md inline-block mb-1">
                      {comp.lookingFor}
                    </span>
                    <h3 className="text-base font-bold text-[#FAFDFD]">{comp.authorName}</h3>
                    <div className="text-[11px] text-slate-400">{comp.authorRole}</div>
                  </div>
                  <span className="text-[10px] text-slate-500">{comp.postedAgo}</span>
                </div>

                <div className="p-3 rounded-xl bg-[#071317] border border-[#1D4552]/70 text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Target Hub:</span>
                    <span className="font-semibold text-[#FAFDFD]">{comp.destination}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Timeframe:</span>
                    <span className="font-semibold text-slate-200">{comp.timeframe}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Budget Range:</span>
                    <span className="font-bold text-[#C98833]">₹{comp.targetBudgetINR.toLocaleString()}/mo</span>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  "{comp.details}"
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  onShowToast(`Connected with ${comp.authorName}! Direct message thread initialized.`);
                }}
                className="w-full py-2.5 rounded-xl bg-[#14313B] hover:bg-[#1A3C47] text-slate-200 font-bold text-xs transition-colors flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#C98833]" />
                <span>Connect &amp; Message</span>
              </button>
            </div>
          ))}
        </div>
      )}

      {/* ─── Bottom CTA: Plan a Trip with Fellow Nomads ─── */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-[#0F262E] to-[#14313B] border border-[#1D4552] flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold text-[#C98833]">
            <Compass className="w-4 h-4" />
            <span>Coliving &amp; Shared Villa Travel</span>
          </div>
          <h3 className="text-lg font-bold text-[#FAFDFD]">
            Found your nomad companions?
          </h3>
          <p className="text-xs text-slate-300">
            Calculate your combined accommodation, train/flight transit, and split expenses together.
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

      {/* ─── 4. COFFEE / COWORK INVITE MODAL ─── */}
      {selectedMemberForChat && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-md rounded-3xl bg-[#0F262E] border border-[#1D4552] p-6 space-y-5 shadow-2xl">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={selectedMemberForChat.avatarUrl}
                  alt={selectedMemberForChat.name}
                  className="w-10 h-10 rounded-xl object-cover border border-[#1D4552]"
                />
                <div>
                  <h3 className="text-base font-bold text-[#FAFDFD]">{selectedMemberForChat.name}</h3>
                  <div className="text-xs text-[#C98833]">{selectedMemberForChat.role}</div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedMemberForChat(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSendMemberMessage} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Message / Invitation Note
                </label>
                <textarea
                  rows={4}
                  required
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#071317] border border-[#1D4552] text-xs text-[#FAFDFD] focus:outline-none focus:ring-1 focus:ring-[#C98833] resize-none leading-relaxed"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => setSelectedMemberForChat(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={chatSent}
                  className="px-5 py-2.5 rounded-xl bg-[#C98833] hover:bg-[#DE9F4D] text-black font-bold text-xs tracking-wide transition-all shadow-md flex items-center gap-2"
                >
                  {chatSent ? <CheckCircle2 className="w-4 h-4 animate-spin text-black" /> : <Send className="w-4 h-4" />}
                  <span>Send Coffee Invite</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─── 5. POST COMPANION REQUEST MODAL ─── */}
      {showCompanionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg rounded-3xl bg-[#0F262E] border border-[#1D4552] p-6 sm:p-8 space-y-5 shadow-2xl">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-bold text-[#C98833] uppercase tracking-wider">
                  Community Board
                </span>
                <h3 className="text-xl font-bold text-[#FAFDFD] mt-0.5">
                  Post Villa Split or Companion Request
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowCompanionModal(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateCompanionRequest} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={newCompAuthor}
                    onChange={(e) => setNewCompAuthor(e.target.value)}
                    placeholder="e.g. Meera Roy"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#071317] border border-[#1D4552] text-xs text-[#FAFDFD] focus:outline-none focus:ring-1 focus:ring-[#C98833]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Your Profession</label>
                  <input
                    type="text"
                    required
                    value={newCompRole}
                    onChange={(e) => setNewCompRole(e.target.value)}
                    placeholder="e.g. AI Researcher"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#071317] border border-[#1D4552] text-xs text-[#FAFDFD] focus:outline-none focus:ring-1 focus:ring-[#C98833]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Destination</label>
                  <input
                    type="text"
                    required
                    value={newCompDest}
                    onChange={(e) => setNewCompDest(e.target.value)}
                    placeholder="e.g. North Goa (Assagao)"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#071317] border border-[#1D4552] text-xs text-[#FAFDFD] focus:outline-none focus:ring-1 focus:ring-[#C98833]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Monthly Budget (INR)</label>
                  <input
                    type="number"
                    required
                    value={newCompBudget}
                    onChange={(e) => setNewCompBudget(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#071317] border border-[#1D4552] text-xs text-[#FAFDFD] focus:outline-none focus:ring-1 focus:ring-[#C98833]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Looking For</label>
                <select
                  value={newCompLookingFor}
                  onChange={(e) => setNewCompLookingFor(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#071317] border border-[#1D4552] text-xs text-[#FAFDFD] focus:outline-none focus:ring-1 focus:ring-[#C98833]"
                >
                  <option value="Coliving Villa Split">Coliving Villa Split</option>
                  <option value="Coworking Partner">Coworking Partner</option>
                  <option value="Weekend Trek Companion">Weekend Trek Companion</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Details &amp; Ideal Match</label>
                <textarea
                  rows={3}
                  required
                  value={newCompDetails}
                  onChange={(e) => setNewCompDetails(e.target.value)}
                  placeholder="Describe the villa, your work routine, and what kind of fellow nomad you want to connect with..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#071317] border border-[#1D4552] text-xs text-[#FAFDFD] focus:outline-none focus:ring-1 focus:ring-[#C98833] resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCompanionModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#C98833] hover:bg-[#DE9F4D] text-black font-bold text-xs tracking-wide transition-all shadow-md"
                >
                  Publish Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
