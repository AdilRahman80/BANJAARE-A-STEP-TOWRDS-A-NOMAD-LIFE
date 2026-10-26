import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

export interface NomadProfile {
  id: string;
  fullName: string;
  role: string;
  currentCity: string;
  bio: string;
  avatarUrl: string;
  skills: string[];
  monthlyIncomeINR: number;
}

interface AuthContextType {
  user: User | null;
  profile: NomadProfile | null;
  session: Session | null;
  loading: boolean;
  isConfigured: boolean;
  signInWithEmail: (email: string, password: string) => Promise<{ error: any }>;
  signUpWithEmail: (email: string, password: string, fullName: string, role: string) => Promise<{ error: any }>;
  signInWithDemo: () => void;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<NomadProfile>) => Promise<void>;
}

const DEMO_PROFILE: NomadProfile = {
  id: 'demo-nomad-user-id',
  fullName: 'Kabir Sharma',
  role: 'Full-Stack Nomad & Technical Writer',
  currentCity: 'Assagao, Goa',
  bio: 'Building async web applications and writing technical guides from coastal cafes and mountain cabins.',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
  skills: ['React', 'TypeScript', 'Node.js', 'Technical Writing'],
  monthlyIncomeINR: 95000,
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<NomadProfile | null>(() => {
    try {
      const saved = localStorage.getItem('nomadx_auth_profile');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return null;
  });
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Sync profile to local storage for instant offline loading
  useEffect(() => {
    if (profile) {
      localStorage.setItem('nomadx_auth_profile', JSON.stringify(profile));
    } else {
      localStorage.removeItem('nomadx_auth_profile');
    }
  }, [profile]);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }

    // 1. Check active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
      }
      setLoading(false);
    });

    // 2. Listen to auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (data && !error) {
        setProfile({
          id: data.id,
          fullName: data.full_name,
          role: data.role,
          currentCity: data.current_city,
          bio: data.bio || '',
          avatarUrl: data.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
          skills: data.skills || [],
          monthlyIncomeINR: data.monthly_income_inr || 75000,
        });
      }
    } catch {
      // ignore
    }
  };

  const signInWithEmail = async (email: string, password: string) => {
    if (!isSupabaseConfigured) {
      return { error: { message: 'Supabase credentials not configured in .env. Use Quick Demo Login or connect your project.' } };
    }
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error };
  };

  const signUpWithEmail = async (email: string, password: string, fullName: string, role: string) => {
    if (!isSupabaseConfigured) {
      return { error: { message: 'Supabase credentials not configured in .env. Use Quick Demo Login or connect your project.' } };
    }
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName, role },
      },
    });

    if (data.user && !error) {
      // Insert profile
      await supabase.from('profiles').insert([
        {
          id: data.user.id,
          full_name: fullName,
          role: role,
          avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
        },
      ]);
    }
    return { error };
  };

  const signInWithDemo = () => {
    setProfile(DEMO_PROFILE);
    setUser({
      id: DEMO_PROFILE.id,
      email: 'kabir@nomadx.earth',
      app_metadata: {},
      user_metadata: { full_name: DEMO_PROFILE.fullName },
      aud: 'authenticated',
      created_at: new Date().toISOString(),
    } as User);
  };

  const signOut = async () => {
    if (isSupabaseConfigured) {
      await supabase.auth.signOut();
    }
    setUser(null);
    setProfile(null);
  };

  const updateProfile = async (updates: Partial<NomadProfile>) => {
    if (!profile) return;
    const merged = { ...profile, ...updates };
    setProfile(merged);

    if (isSupabaseConfigured && user) {
      await supabase.from('profiles').update({
        full_name: merged.fullName,
        role: merged.role,
        current_city: merged.currentCity,
        bio: merged.bio,
        skills: merged.skills,
        monthly_income_inr: merged.monthlyIncomeINR,
      }).eq('id', user.id);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        session,
        loading,
        isConfigured: isSupabaseConfigured,
        signInWithEmail,
        signUpWithEmail,
        signInWithDemo,
        signOut,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
