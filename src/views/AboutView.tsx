import React, { useState } from 'react';
import {
  Sparkles,
  ShieldCheck,
  Wifi,
  Heart,
  CheckCircle2,
  Send,
  HelpCircle,
  TrendingUp,
} from 'lucide-react';

interface AboutViewProps {
  onShowToast: (msg: string) => void;
  onNavigateToPlanner?: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({
  onShowToast,
  onNavigateToPlanner,
}) => {
  const [conciergeName, setConciergeName] = useState('');
  const [conciergeEmail, setConciergeEmail] = useState('');
  const [conciergeProfession, setConciergeProfession] = useState('Software Engineer');
  const [conciergeNote, setConciergeNote] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleConciergeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      onShowToast('Nomad Concierge request received! We will send your tailored route via email.');
      setIsSubmitted(false);
      setConciergeName('');
      setConciergeEmail('');
      setConciergeNote('');
    }, 1200);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-20">

      {/* ─── 1. EDITORIAL HERO (Vita Travel & Eloura Journeys Style) ─── */}
      <div className="max-w-3xl space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0F262E] border border-[#1D4552] text-xs font-bold uppercase tracking-wider text-[#C98833]">
          <Sparkles className="w-3.5 h-3.5" />
          <span>The NomadX Manifesto</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-[#FAFDFD] tracking-tight leading-[1.1]">
          We believe careers should <br />
          <span className="font-serif italic font-normal text-[#C98833]">expand your life, not confine it.</span>
        </h1>
        <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
          Too many of us are trapped in an endless loop: commuting through traffic, sitting in airless cubicles, and watching years slip away while dreaming of the mountains or the sea. NomadX was born to make nomadic living practical, reliable, and financially empowering.
        </p>
      </div>

      {/* ─── 2. THE PROBLEM & OUR SOLUTION SPREAD ─── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* The 9-to-5 Loop Trap */}
        <div className="p-8 rounded-3xl bg-[#0F262E] border border-[#1D4552] space-y-4">
          <div className="text-xs font-bold uppercase tracking-wider text-red-400">
            The Broken Reality
          </div>
          <h2 className="text-2xl font-bold text-[#FAFDFD]">The 9-to-5 Suburban Loop</h2>
          <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
            <li className="flex items-start gap-2.5">
              <span className="text-red-400 font-bold shrink-0">✕</span>
              <span>Exorbitant rent in congested metro cities consuming 40-50% of take-home salary.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-red-400 font-bold shrink-0">✕</span>
              <span>2 hours lost daily in toxic pollution and soul-crushing traffic jams.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-red-400 font-bold shrink-0">✕</span>
              <span>Burnout, lack of sunlight, and creative exhaustion leaving zero energy on weekends.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-red-400 font-bold shrink-0">✕</span>
              <span>Waiting an entire year for a meager 10-day vacation.</span>
            </li>
          </ul>
        </div>

        {/* The NomadX Paradigm */}
        <div className="p-8 rounded-3xl bg-[#0F262E] border border-[#C98833]/50 space-y-4 shadow-xl">
          <div className="text-xs font-bold uppercase tracking-wider text-[#C98833]">
            The NomadX Freedom Model
          </div>
          <h2 className="text-2xl font-bold text-[#FAFDFD]">Autonomous Living &amp; Earning</h2>
          <ul className="space-y-3 text-xs sm:text-sm text-slate-200">
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#C98833] shrink-0 mt-0.5" />
              <span>Earn in USD or strong client retainers while spending in cost-effective paradise destinations.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#C98833] shrink-0 mt-0.5" />
              <span>Wake up to Himalayan cedar mist or Arabian Sea surf breaks right outside your window.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#C98833] shrink-0 mt-0.5" />
              <span>Deep focus sprints in audited 200+ Mbps workspaces with generator backup.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#C98833] shrink-0 mt-0.5" />
              <span>Every evening is your own: sunset hikes, live music, community dinners, and tranquility.</span>
            </li>
          </ul>
        </div>

      </div>

      {/* ─── 3. OUR FOUR PILLARS (Vita Travel Step Aesthetic) ─── */}
      <div className="space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-[#C98833]">
            Guiding Principles
          </div>
          <h2 className="text-3xl font-extrabold text-[#FAFDFD]">Our Quality Standards</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              step: '01',
              title: 'Audited Wi-Fi',
              desc: 'We never accept advertised speeds. We require verified Speedtest screenshots and dual redundant connections.',
              icon: Wifi,
            },
            {
              step: '02',
              title: 'Generator Backup',
              desc: 'Mountain rains or coastal storms should never drop an active client call. 100% power backup is mandatory.',
              icon: ShieldCheck,
            },
            {
              step: '03',
              title: 'Net Surplus Focus',
              desc: 'We believe travel should build your wealth, not deplete your savings. Low local living costs mean high monthly investments.',
              icon: TrendingUp,
            },
            {
              step: '04',
              title: 'Community of Doers',
              desc: 'Travel without loneliness. Connect with fellow developers, writers, and entrepreneurs in every hub.',
              icon: Heart,
            },
          ].map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.step}
                className="p-6 rounded-2xl bg-[#0F262E] border border-[#1D4552] flex flex-col justify-between space-y-6"
              >
                <div>
                  <span className="text-3xl font-serif font-extrabold text-[#C98833]">
                    {pillar.step}
                  </span>
                  <h3 className="text-base font-bold text-[#FAFDFD] mt-3 flex items-center gap-2">
                    <Icon className="w-4 h-4 text-[#C98833]" />
                    <span>{pillar.title}</span>
                  </h3>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ─── 4. FREQUENTLY ASKED QUESTIONS ─── */}
      <div className="space-y-6 max-w-3xl mx-auto">
        <div className="text-center space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-[#C98833]">
            Frequently Asked Questions
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#FAFDFD]">
            Starting Your Nomad Journey
          </h2>
        </div>

        <div className="space-y-4">
          {[
            {
              q: 'Can I really earn enough to travel continuously?',
              a: 'Yes. With remote skills like coding, writing, design, video editing, or virtual assistance, even 15-20 hours a week can generate ₹60,000–₹1,50,000/month. In top workation destinations like Goa, Manali, or Rishikesh, monthly living costs average ₹30,000–₹40,000, leaving a strong positive savings buffer.',
            },
            {
              q: 'What if internet drops during an important video call?',
              a: 'Every coliving space and workspace featured on NomadX is audited for automatic generator backups and redundant SIM/leased-line failovers. We also recommend carrying a 5G Jio/Airtel hotspot as personal backup.',
            },
            {
              q: 'Is it safe for solo travelers and female nomads?',
              a: 'Extremely safe. Destinations like Varkala, Old Manali, tapovan Tapovan Rishikesh, and North Goa have thriving, tightly knit nomad communities with 24/7 security, hostel community managers, and welcoming locals.',
            },
          ].map((faq, i) => (
            <div key={i} className="p-5 rounded-2xl bg-[#0F262E] border border-[#1D4552] space-y-2">
              <h3 className="text-sm font-bold text-[#FAFDFD] flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-[#C98833] shrink-0" />
                <span>{faq.q}</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pl-6">
                {faq.a}
              </p>
            </div>
          ))}
        </div>

        {onNavigateToPlanner && (
          <div className="pt-4 text-center">
            <button
              type="button"
              onClick={onNavigateToPlanner}
              className="px-6 py-3 rounded-xl bg-[#C98833] hover:bg-[#DE9F4D] text-black font-bold text-xs tracking-wide transition-all shadow-md inline-flex items-center gap-2"
            >
              <span>Design Your Workation Budget</span>
            </button>
          </div>
        )}
      </div>

      {/* ─── 5. NOMAD CONCIERGE FORM ─── */}
      <div className="p-8 sm:p-12 rounded-3xl bg-[#0F262E] border border-[#1D4552] max-w-3xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-[#C98833]">
            Personalized Guidance
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#FAFDFD]">
            Need Custom Workation Advice?
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto">
            Tell our nomad curators about your trade, target departure month, and budget. We will curate a bespoke 30-day workation blueprint.
          </p>
        </div>

        <form onSubmit={handleConciergeSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Your Name</label>
              <input
                type="text"
                required
                value={conciergeName}
                onChange={(e) => setConciergeName(e.target.value)}
                placeholder="Aryan Sharma"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#071317] border border-[#1D4552] text-xs text-[#FAFDFD] focus:outline-none focus:ring-1 focus:ring-[#C98833]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
              <input
                type="email"
                required
                value={conciergeEmail}
                onChange={(e) => setConciergeEmail(e.target.value)}
                placeholder="aryan@example.com"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#071317] border border-[#1D4552] text-xs text-[#FAFDFD] focus:outline-none focus:ring-1 focus:ring-[#C98833]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Your Remote Trade / Profession</label>
            <input
              type="text"
              required
              value={conciergeProfession}
              onChange={(e) => setConciergeProfession(e.target.value)}
              placeholder="Frontend Developer / Content Creator"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#071317] border border-[#1D4552] text-xs text-[#FAFDFD] focus:outline-none focus:ring-1 focus:ring-[#C98833]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">What are you looking for in your next destination?</label>
            <textarea
              rows={4}
              required
              value={conciergeNote}
              onChange={(e) => setConciergeNote(e.target.value)}
              placeholder="e.g. Quiet mountain town with high speed fiber, good specialty coffee, and hiking on weekends..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#071317] border border-[#1D4552] text-xs text-[#FAFDFD] focus:outline-none focus:ring-1 focus:ring-[#C98833] resize-none"
            />
          </div>

          <div className="text-center pt-2">
            <button
              type="submit"
              disabled={isSubmitted}
              className="px-8 py-3 rounded-xl bg-[#C98833] hover:bg-[#DE9F4D] text-black font-bold text-xs tracking-wide transition-all shadow-md inline-flex items-center gap-2"
            >
              {isSubmitted ? (
                <>
                  <CheckCircle2 className="w-4 h-4 animate-spin" />
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Request Bespoke Workation Blueprint</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

    </div>
  );
};
