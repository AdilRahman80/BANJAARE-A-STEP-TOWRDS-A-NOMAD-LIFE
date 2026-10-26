import React, { useState } from 'react';
import {
  X,
  User,
  Mail,
  Lock,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Database,
  ArrowRight,
  LogOut,
  MapPin,
  Briefcase,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowToast: (msg: string) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onShowToast,
}) => {
  const {
    user,
    profile,
    isConfigured,
    signInWithEmail,
    signUpWithEmail,
    signInWithDemo,
    signOut,
    updateProfile,
  } = useAuth();

  const [mode, setMode] = useState<'login' | 'signup' | 'profile'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState('Full-Stack Engineer');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Edit profile fields
  const [editCity, setEditCity] = useState(profile?.currentCity || 'Goa');
  const [editBio, setEditBio] = useState(profile?.bio || '');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);

    try {
      if (mode === 'login') {
        const { error } = await signInWithEmail(email, password);
        if (error) {
          setErrorMsg(error.message);
        } else {
          onShowToast('Successfully authenticated with NomadX cloud!');
          onClose();
        }
      } else if (mode === 'signup') {
        const { error } = await signUpWithEmail(email, password, fullName, role);
        if (error) {
          setErrorMsg(error.message);
        } else {
          onShowToast('Nomad profile created! Welcome to Banjaare.');
          onClose();
        }
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = () => {
    signInWithDemo();
    onShowToast('Logged in as Kabir Sharma (Senior Full-Stack Nomad)!');
    onClose();
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateProfile({ currentCity: editCity, bio: editBio });
    onShowToast('Nomad profile updated!');
    onClose();
  };

  const handleSignOut = async () => {
    await signOut();
    onShowToast('Signed out of NomadX.');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-md rounded-3xl bg-[#0F262E] border border-[#1D4552] p-6 sm:p-8 space-y-6 shadow-2xl text-[#FAFDFD]">
        
        {/* Header */}
        <div className="flex items-start justify-between border-b border-[#1D4552]/70 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C98833] uppercase tracking-wider mb-1">
              <Database className="w-3.5 h-3.5" />
              <span>{isConfigured ? 'Supabase Cloud Sync' : 'Nomad Identity & Cloud'}</span>
            </div>
            <h2 className="text-xl font-bold font-serif text-[#FAFDFD]">
              {user ? 'Nomad Passport Profile' : mode === 'login' ? 'Sign in to NomadX' : 'Join the Nomad Movement'}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* If Already Logged In: Profile View & Edit */}
        {user && profile ? (
          <div className="space-y-5">
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#071317] border border-[#1D4552]">
              <img
                src={profile.avatarUrl}
                alt={profile.fullName}
                className="w-14 h-14 rounded-2xl object-cover border border-[#C98833]"
              />
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5">
                  <h3 className="font-bold text-base text-white">{profile.fullName}</h3>
                  <span className="p-0.5 rounded-full bg-emerald-500/20 text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </span>
                </div>
                <div className="text-xs text-[#C98833] flex items-center gap-1">
                  <Briefcase className="w-3 h-3" />
                  <span>{profile.role}</span>
                </div>
                <div className="text-xs text-slate-400 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-[#10B981]" />
                  <span>{profile.currentCity}</span>
                </div>
              </div>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Current Base City</label>
                <input
                  type="text"
                  value={editCity}
                  onChange={(e) => setEditCity(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#071317] border border-[#1D4552] text-white focus:outline-none focus:border-[#C98833]"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Nomad Bio &amp; Remote Routine</label>
                <textarea
                  rows={2}
                  value={editBio}
                  onChange={(e) => setEditBio(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#071317] border border-[#1D4552] text-white focus:outline-none focus:border-[#C98833]"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="inline-flex items-center gap-1.5 text-xs text-red-400 hover:text-red-300 font-semibold"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>

                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#C98833] hover:bg-[#DE9F4D] text-black font-bold text-xs"
                >
                  Save Profile
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* Authentication Form */
          <div className="space-y-5">
            
            {/* Quick Demo Login One-Click Option */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-[#14313B] to-[#071317] border border-[#C98833]/40 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#C98833] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Instant Demo Profile</span>
                </span>
                <span className="text-[10px] bg-[#C98833]/15 text-[#C98833] px-2 py-0.5 rounded-full font-bold">1-Click</span>
              </div>
              <p className="text-xs text-slate-300">
                Log in immediately as <strong>Kabir Sharma</strong> to test real message threads, villa split posts, and residency pitches without creating an account.
              </p>
              <button
                type="button"
                onClick={handleDemoLogin}
                className="w-full py-2.5 px-4 rounded-xl bg-[#C98833] hover:bg-[#DE9F4D] text-black font-bold text-xs transition-all shadow-md flex items-center justify-center gap-2"
              >
                <span>Continue as Demo Nomad (Kabir Sharma)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Mode Switch Tabs */}
            <div className="flex rounded-xl bg-[#071317] p-1 border border-[#1D4552]">
              <button
                type="button"
                onClick={() => setMode('login')}
                className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  mode === 'login'
                    ? 'bg-[#C98833] text-black shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => setMode('signup')}
                className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  mode === 'signup'
                    ? 'bg-[#C98833] text-black shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                New Account
              </button>
            </div>

            {errorMsg && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
              {mode === 'signup' && (
                <>
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Full Name</label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Roshni Sen"
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#071317] border border-[#1D4552] text-white focus:outline-none focus:border-[#C98833]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Primary Craft / Profession</label>
                    <input
                      type="text"
                      required
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      placeholder="e.g. UI-UX Designer & Researcher"
                      className="w-full px-3 py-2.5 rounded-xl bg-[#071317] border border-[#1D4552] text-white focus:outline-none focus:border-[#C98833]"
                    />
                  </div>
                </>
              )}

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nomad@banjaare.earth"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#071317] border border-[#1D4552] text-white focus:outline-none focus:border-[#C98833]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#071317] border border-[#1D4552] text-white focus:outline-none focus:border-[#C98833]"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 rounded-xl bg-[#14313B] hover:bg-[#1D4552] text-white font-bold text-xs border border-[#C98833]/40 transition-all flex items-center justify-center gap-2"
              >
                <span>{loading ? 'Authenticating...' : mode === 'login' ? 'Sign In with Email' : 'Create Free Account'}</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#C98833]" />
              </button>
            </form>

            {/* Cloud Status Indicator */}
            <div className="p-3 rounded-xl bg-[#071317] border border-[#1D4552] text-[11px] text-slate-400 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Database className="w-3 h-3 text-[#C98833]" />
                <span>Backend: {isConfigured ? 'Live Supabase Connected' : 'Local Demo Mode'}</span>
              </span>
              <span className="text-[#C98833] font-semibold">{isConfigured ? 'PostgreSQL Active' : 'Offline Ready'}</span>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
