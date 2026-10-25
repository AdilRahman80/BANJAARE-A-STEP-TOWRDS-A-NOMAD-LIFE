import React from 'react';
import {
  Compass,
  ArrowRight,
  Briefcase,
  Wifi,
  Sparkles,
  MapPin,
  TrendingUp,
  Building,
  Layers,
  ChevronRight,
  Star,
} from 'lucide-react';
import { Destination, Currency } from '../types/trip';
import { formatCurrency } from '../utils/budgetCalculator';

interface HomeViewProps {
  destinations: Destination[];
  currentCurrency: Currency;
  onNavigate: (tab: 'gigs' | 'destinations' | 'planner' | 'coliving' | 'itinerary' | 'about') => void;
  onSelectDestinationForPlanner: (dest: Destination) => void;
  onQuickPreview: (dest: Destination) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  destinations,
  currentCurrency,
  onNavigate,
  onSelectDestinationForPlanner,
  onQuickPreview,
}) => {
  // Handpicked spotlight destinations (Goa, Manali, Rishikesh, Bali, Varkala, Bir Billing)
  const spotlightDestinations = destinations.filter((d) =>
    ['goa-india', 'manali-hp', 'rishikesh-uttarakhand', 'bali-indonesia', 'varkala-kerala', 'bir-billing-hp'].includes(d.id)
  ).slice(0, 4);

  return (
    <div className="space-y-24 pb-20">

      {/* ─── 1. EDITORIAL LUXURY HERO (Inspired by Vita Travel & Eloura Journeys) ─── */}
      <section className="relative min-h-[88vh] flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 pt-12 pb-20">
        
        {/* Background Atmosphere */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-1/4 w-[600px] h-[600px] bg-[#14313B]/40 rounded-full blur-[140px]" />
          <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] bg-[#C98833]/10 rounded-full blur-[160px]" />
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, #FAFDFD 1px, transparent 0)',
              backgroundSize: '40px 40px',
            }}
          />
        </div>

        <div className="relative max-w-5xl mx-auto text-center z-10 space-y-8">
          
          {/* Subtle Pill Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#0F262E]/80 border border-[#1D4552] backdrop-blur-md text-[11px] font-semibold uppercase tracking-[0.2em] text-[#C98833]">
            <Sparkles className="w-3.5 h-3.5 text-[#C98833]" />
            <span>Bespoke Nomad Workations · Break the 9-to-5 Loop</span>
          </div>

          {/* Headline with Serif Accents */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#FAFDFD] leading-[1.1]">
            Travel with purpose. <br />
            <span className="font-serif italic font-normal text-[#C98833]">Earn where you live.</span>
          </h1>

          {/* Subtitle */}
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
            Stop trading 50 weeks a year in a cubicle for 2 weeks of rushed vacation.
            Discover curated workation hubs, verified high-speed Wi-Fi villas, and remote gigs so your work funds your freedom.
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              type="button"
              onClick={() => onNavigate('destinations')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-[#C98833] hover:bg-[#DE9F4D] text-black font-bold text-sm tracking-wide transition-all shadow-lg shadow-[#C98833]/20 hover:scale-[1.02]"
            >
              <Compass className="w-4 h-4" />
              <span>Explore 54 Nomad Hubs</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>

            <button
              type="button"
              onClick={() => onNavigate('gigs')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-[#0F262E] hover:bg-[#14313B] text-[#FAFDFD] font-semibold text-sm border border-[#1D4552] hover:border-[#C98833]/50 transition-all backdrop-blur-md"
            >
              <Briefcase className="w-4 h-4 text-[#C98833]" />
              <span>Browse Remote Gigs</span>
            </button>
          </div>

          {/* Vita-Style Stat Grid with Editorial Step Divider */}
          <div className="pt-12 max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 border-t border-[#1D4552]/70 text-left">
            <div className="p-4 rounded-xl bg-[#0F262E]/50 border border-[#1D4552]/40">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#FAFDFD]">54+</div>
              <div className="text-xs text-slate-400 mt-1">Vetted Workation Cities</div>
              <div className="text-[10px] text-[#C98833] font-medium mt-0.5">India &amp; Global</div>
            </div>

            <div className="p-4 rounded-xl bg-[#0F262E]/50 border border-[#1D4552]/40">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#FAFDFD]">₹1.4Cr+</div>
              <div className="text-xs text-slate-400 mt-1">Nomad Remote Earnings</div>
              <div className="text-[10px] text-emerald-400 font-medium mt-0.5">Live Contracts</div>
            </div>

            <div className="p-4 rounded-xl bg-[#0F262E]/50 border border-[#1D4552]/40">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#FAFDFD]">100+</div>
              <div className="text-xs text-slate-400 mt-1">Audited Coworking Cafes</div>
              <div className="text-[10px] text-[#C98833] font-medium mt-0.5">150+ Mbps Speed</div>
            </div>

            <div className="p-4 rounded-xl bg-[#0F262E]/50 border border-[#1D4552]/40">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#FAFDFD]">99.8%</div>
              <div className="text-xs text-slate-400 mt-1">Power Backup Reliability</div>
              <div className="text-[10px] text-emerald-400 font-medium mt-0.5">Solar + Auto-Genset</div>
            </div>
          </div>

        </div>
      </section>

      {/* ─── 2. THE NOMAD MANIFESTO (Inspired by Eloura Journeys "Our Story") ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#C98833]">
              <span className="w-6 h-px bg-[#C98833]" />
              The NomadX Philosophy
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#FAFDFD] leading-tight">
              Why stay in a cubicle <br />
              <span className="font-serif italic font-normal text-[#C98833]">when you can work from paradise?</span>
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              We were exhausted by the standard routine: 2 hours in bumper-to-bumper traffic, 9 hours under fluorescent office lights, and barely any energy left to live.
            </p>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              NomadX is the antidote. We connect you to verified remote gigs that fit your trade, pair you with audited coliving spaces with high-speed fiber, and calculate your exact monthly net surplus so you build wealth while traveling.
            </p>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => onNavigate('about')}
                className="inline-flex items-center gap-2 text-sm font-bold text-[#C98833] hover:text-[#DE9F4D] transition-colors"
              >
                <span>Read Our Full Story &amp; Standards</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Step 01 */}
            <div className="p-6 rounded-2xl bg-[#0F262E] border border-[#1D4552] flex flex-col justify-between space-y-8">
              <div>
                <span className="text-3xl font-extrabold text-[#C98833] font-serif">01</span>
                <h3 className="text-lg font-bold text-[#FAFDFD] mt-3">Earn While Moving</h3>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  Browse verified remote gigs with flexible async schedules. No 9-to-5 boss breathing down your neck.
                </p>
              </div>
              <div className="pt-4 border-t border-[#1D4552]/60 text-xs text-[#C98833] font-semibold flex items-center gap-1">
                <Briefcase className="w-3.5 h-3.5" /> Remote Gigs Hub
              </div>
            </div>

            {/* Step 02 */}
            <div className="p-6 rounded-2xl bg-[#0F262E] border border-[#1D4552] flex flex-col justify-between space-y-8">
              <div>
                <span className="text-3xl font-extrabold text-[#C98833] font-serif">02</span>
                <h3 className="text-lg font-bold text-[#FAFDFD] mt-3">Zero Wi-Fi Anxiety</h3>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  Every listed villa and cafe is audited for dual leased lines, generator backup, and quiet call booths.
                </p>
              </div>
              <div className="pt-4 border-t border-[#1D4552]/60 text-xs text-emerald-400 font-semibold flex items-center gap-1">
                <Wifi className="w-3.5 h-3.5" /> Tested 150+ Mbps
              </div>
            </div>

            {/* Step 03 */}
            <div className="p-6 rounded-2xl bg-[#0F262E] border border-[#1D4552] flex flex-col justify-between space-y-8">
              <div>
                <span className="text-3xl font-extrabold text-[#C98833] font-serif">03</span>
                <h3 className="text-lg font-bold text-[#FAFDFD] mt-3">Net Surplus Living</h3>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  Spend ₹35k/mo on mountain living while earning ₹80k+ remotely. Save more money than staying in a tier-1 city.
                </p>
              </div>
              <div className="pt-4 border-t border-[#1D4552]/60 text-xs text-[#C98833] font-semibold flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5" /> High Net Savings
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ─── 3. FEATURED WORKATION RETREATS (Inspired by Vita Travel Featured Section) ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10 pb-6 border-b border-[#1D4552]/60">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#C98833] mb-2">
              <Compass className="w-3.5 h-3.5" /> Curated Escapes
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#FAFDFD]">
              Featured Nomad Workations
            </h2>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('destinations')}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#C98833] hover:text-[#DE9F4D]"
          >
            <span>View All 54 Hubs</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {spotlightDestinations.map((dest) => (
            <div
              key={dest.id}
              className="group flex flex-col bg-[#0F262E] border border-[#1D4552] hover:border-[#C98833]/60 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-[#C98833]/10"
            >
              {/* Image Preview */}
              <div className="relative h-48 w-full overflow-hidden bg-slate-900">
                <img
                  src={dest.imageUrl}
                  alt={dest.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071317] via-transparent to-black/20" />
                
                {/* Rating Badge */}
                <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-xs font-bold text-amber-300 border border-white/10">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  <span>{dest.rating}</span>
                </div>

                {/* State / Country */}
                <div className="absolute bottom-3 left-3 right-3">
                  <h3 className="text-lg font-bold text-[#FAFDFD] drop-shadow-sm">{dest.name}</h3>
                  <p className="text-xs text-slate-300 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#C98833]" />
                    <span>{dest.state ? `${dest.state}, ` : ''}{dest.country}</span>
                  </p>
                </div>
              </div>

              {/* Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                  {dest.description}
                </p>

                {/* Specs */}
                <div className="space-y-2 pt-2 border-t border-[#1D4552]/50 text-xs">
                  <div className="flex items-center justify-between text-slate-400">
                    <span>Tested Wi-Fi Speed</span>
                    <span className="text-emerald-400 font-semibold flex items-center gap-1">
                      <Wifi className="w-3 h-3" /> 120-220 Mbps
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-slate-400">
                    <span>Dorm Bed from</span>
                    <span className="text-[#FAFDFD] font-bold">
                      {formatCurrency(dest.costEstimates.nightlyLodgingUSD.budget, currentCurrency)}/night
                    </span>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => onQuickPreview(dest)}
                    className="py-2 px-3 text-xs font-semibold text-slate-300 bg-[#14313B] hover:bg-[#1A3C47] rounded-xl transition-colors text-center"
                  >
                    Details
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      onSelectDestinationForPlanner(dest);
                      onNavigate('planner');
                    }}
                    className="py-2 px-3 text-xs font-bold text-black bg-[#C98833] hover:bg-[#DE9F4D] rounded-xl transition-colors text-center"
                  >
                    Plan Trip
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── 4. DEDICATED FEATURE HUBS PORTAL ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#C98833]">
            <Layers className="w-3.5 h-3.5" /> Complete Ecosystem
          </div>
          <h2 className="text-3xl font-extrabold text-[#FAFDFD]">
            Everything You Need To Thrive As A Nomad
          </h2>
          <p className="text-sm text-slate-300">
            Every feature is an elaborated standalone studio — built for clarity, precision, and zero friction.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Gigs */}
          <div
            onClick={() => onNavigate('gigs')}
            className="cursor-pointer p-6 rounded-2xl bg-[#0F262E] border border-[#1D4552] hover:border-[#C98833] transition-all duration-300 group hover:-translate-y-1"
          >
            <div className="w-12 h-12 rounded-xl bg-[#C98833]/15 border border-[#C98833]/30 flex items-center justify-center text-[#C98833] mb-5 group-hover:scale-110 transition-transform">
              <Briefcase className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#FAFDFD] group-hover:text-[#C98833] transition-colors">
              Remote Gigs Hub
            </h3>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              Explore 12+ verified remote roles &amp; contracts. Simulate your monthly income vs destination cost.
            </p>
            <div className="mt-4 flex items-center gap-1.5 text-xs font-bold text-[#C98833]">
              <span>Explore Gigs</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 2: Destinations */}
          <div
            onClick={() => onNavigate('destinations')}
            className="cursor-pointer p-6 rounded-2xl bg-[#0F262E] border border-[#1D4552] hover:border-[#C98833] transition-all duration-300 group hover:-translate-y-1"
          >
            <div className="w-12 h-12 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-5 group-hover:scale-110 transition-transform">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#FAFDFD] group-hover:text-emerald-400 transition-colors">
              Destination Matcher
            </h3>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              54 workation havens across 18 Indian states and international hubs with live budget and Wi-Fi filters.
            </p>
            <div className="mt-4 flex items-center gap-1.5 text-xs font-bold text-emerald-400">
              <span>Filter Cities</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 3: Planner */}
          <div
            onClick={() => onNavigate('planner')}
            className="cursor-pointer p-6 rounded-2xl bg-[#0F262E] border border-[#1D4552] hover:border-[#C98833] transition-all duration-300 group hover:-translate-y-1"
          >
            <div className="w-12 h-12 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-5 group-hover:scale-110 transition-transform">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#FAFDFD] group-hover:text-purple-400 transition-colors">
              Budget &amp; Transit Architect
            </h3>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              Calculate exact train/flight costs, daily expenses, and net surplus savings for your workation.
            </p>
            <div className="mt-4 flex items-center gap-1.5 text-xs font-bold text-purple-400">
              <span>Open Studio</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 4: Coliving */}
          <div
            onClick={() => onNavigate('coliving')}
            className="cursor-pointer p-6 rounded-2xl bg-[#0F262E] border border-[#1D4552] hover:border-[#C98833] transition-all duration-300 group hover:-translate-y-1"
          >
            <div className="w-12 h-12 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-5 group-hover:scale-110 transition-transform">
              <Building className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#FAFDFD] group-hover:text-amber-400 transition-colors">
              Coliving &amp; Workspaces
            </h3>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              Explore vetted villas and cafe desks with dual internet redundancy, generator backup, and monthly rates.
            </p>
            <div className="mt-4 flex items-center gap-1.5 text-xs font-bold text-amber-400">
              <span>Browse Spaces</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </section>

      {/* ─── 5. CALL TO ACTION ─── */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#0F262E] to-[#071317] border border-[#C98833]/40 text-center space-y-6 shadow-2xl relative overflow-hidden">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#C98833]/15 text-[#C98833] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" /> Start Your Journey Today
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#FAFDFD]">
            Your life is not meant to be lived in a cubicle.
          </h2>
          <p className="max-w-xl mx-auto text-sm sm:text-base text-slate-300">
            Join thousands of remote engineers, designers, and creators who chose freedom, health, and adventure without giving up their careers.
          </p>
          <div className="pt-2">
            <button
              type="button"
              onClick={() => onNavigate('planner')}
              className="px-8 py-4 rounded-xl bg-[#C98833] hover:bg-[#DE9F4D] text-black font-extrabold text-sm tracking-wide transition-all shadow-xl shadow-[#C98833]/25"
            >
              Plan Your First Workation Now
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
