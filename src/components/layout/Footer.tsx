import { Shield } from 'lucide-react';
import { NavTab } from './Navbar';

interface FooterProps {
  onNavigate?: (tab: NavTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleNav = (tab: NavTab) => {
    if (onNavigate) {
      onNavigate(tab);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#071317] text-slate-400 py-12 sm:py-16 border-t border-[#1D4552]/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-[#1D4552]/60">
          
          {/* Brand & Mission */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#0F262E] border border-[#C98833]/40 flex items-center justify-center text-[#C98833] font-serif font-extrabold text-lg shadow-md">
                N
              </div>
              <span className="text-xl font-extrabold tracking-tight text-[#FAFDFD]">
                Nomad<span className="text-[#C98833]">X</span>
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 max-w-md leading-relaxed">
              Bespoke travel meets remote work autonomy. Designed for professionals escaping the 9-to-5 loop to live, work, and thrive across 54 vetted global workation destinations.
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
              <span className="px-2.5 py-1 rounded-lg bg-[#0F262E] border border-[#1D4552] text-slate-300 font-mono text-[11px]">React 18</span>
              <span className="px-2.5 py-1 rounded-lg bg-[#0F262E] border border-[#1D4552] text-slate-300 font-mono text-[11px]">TypeScript</span>
              <span className="px-2.5 py-1 rounded-lg bg-[#0F262E] border border-[#1D4552] text-slate-300 font-mono text-[11px]">Tailwind CSS</span>
              <span className="px-2.5 py-1 rounded-lg bg-[#0F262E] border border-[#1D4552] text-slate-300 font-mono text-[11px]">Browser-Private</span>
            </div>
          </div>

          {/* Quick Navigation Pages */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#FAFDFD] mb-4">
              Dedicated Pages
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('home')}
                  className="hover:text-[#C98833] transition-colors"
                >
                  Discovery Showcase
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('gigs')}
                  className="hover:text-[#C98833] transition-colors"
                >
                  Remote Gigs Hub
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('destinations')}
                  className="hover:text-[#C98833] transition-colors"
                >
                  54 Workation Havens
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('planner')}
                  className="hover:text-[#C98833] transition-colors"
                >
                  Trip &amp; Budget Architect
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('coliving')}
                  className="hover:text-[#C98833] transition-colors"
                >
                  Coliving &amp; Desks Directory
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('itinerary')}
                  className="hover:text-[#C98833] transition-colors"
                >
                  Work-Life Routine Studio
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('community')}
                  className="hover:text-[#C98833] transition-colors"
                >
                  Nomad Tribe &amp; Meetups
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('passport')}
                  className="hover:text-[#C98833] transition-colors"
                >
                  Tax &amp; Financial Passport
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('residence')}
                  className="hover:text-[#C98833] transition-colors"
                >
                  Nomad-in-Residence Slots
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('about')}
                  className="hover:text-[#C98833] transition-colors"
                >
                  The Nomad Manifesto
                </button>
              </li>
            </ul>
          </div>

          {/* Security & Client-Side Privacy */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#FAFDFD] mb-4 flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-emerald-400" /> Client-Side Privacy
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              All financial surplus modeling and itinerary configurations run 100% inside your browser. No cookies, no tracking, and no third-party data selling.
            </p>
            <div className="p-3 rounded-xl bg-[#0F262E] border border-[#1D4552] text-xs text-slate-300 space-y-1">
              <div className="font-semibold text-[#C98833]">Inspiration:</div>
              <div className="text-[11px] text-slate-400">Vita Travel &amp; Eloura Journeys Luxury Design System</div>
            </div>
          </div>

        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-1.5">
            <span>Designed for the modern remote nomad.</span>
          </div>
          <div>
            &copy; {new Date().getFullYear()} NomadX. All rights reserved.
          </div>
        </div>

      </div>
    </footer>
  );
};
