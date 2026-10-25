import { useState, useEffect, useMemo, useCallback } from 'react';
import { Navbar, NavTab } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { DestinationModal } from './components/destinations/DestinationModal';

import { HomeView } from './views/HomeView';
import { GigsView } from './views/GigsView';
import { DestinationsView } from './views/DestinationsView';
import { PlannerView } from './views/PlannerView';
import { ColivingView } from './views/ColivingView';
import { ItineraryView } from './views/ItineraryView';
import { CommunityView } from './views/CommunityView';
import { FinancialPassportView } from './views/FinancialPassportView';
import { ResidencePortalView } from './views/ResidencePortalView';
import { AboutView } from './views/AboutView';

import { SAMPLE_DESTINATIONS } from './data/destinations';
import {
  TripPreferences,
  Destination,
  Currency,
  CategoryAllocationModifiers,
} from './types/trip';
import { DEFAULT_CATEGORY_MODIFIERS } from './utils/budgetCalculator';
import { getRecommendedDestinations, SortOption } from './utils/recommendationEngine';
import { CheckCircle2, WifiOff } from 'lucide-react';

const DEFAULT_PREFERENCES: TripPreferences = {
  originCity: 'New Delhi (NCR)',
  targetBudget: 60,   // ~₹5,000 per person in comfortable tier
  durationDays: 5,
  travelersCount: 2,
  interests: ['Culture', 'Nature', 'Adventure'],
  accommodationTier: 'mid',
  selectedRegion: 'All India',
  isStudentBackpackerMode: false,
  budgetTier: 'comfortable',
  isNomadMode: true,
};

const STORAGE_KEY = 'smart_trip_planner_saved_v1';

export function App() {
  // 1. Multi-Page Active Tab state with URL hash sync
  const validTabs: NavTab[] = [
    'home',
    'gigs',
    'destinations',
    'planner',
    'coliving',
    'itinerary',
    'community',
    'passport',
    'residence',
    'about',
  ];

  const [activeTab, setActiveTab] = useState<NavTab>(() => {
    const hash = window.location.hash.replace('#', '') as NavTab;
    if (validTabs.includes(hash)) {
      return hash;
    }
    return 'home';
  });

  // Sync state to hash and listen to hashchange
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as NavTab;
      if (validTabs.includes(hash)) {
        setActiveTab(hash);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleTabChange = useCallback((tab: NavTab) => {
    setActiveTab(tab);
    window.location.hash = tab;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // 2. Preferences & Selections
  const [preferences, setPreferences] = useState<TripPreferences>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.preferences) return parsed.preferences;
      }
    } catch {
      // Ignore
    }
    return DEFAULT_PREFERENCES;
  });

  const [selectedDestination, setSelectedDestination] = useState<Destination>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.destinationId) {
          const match = SAMPLE_DESTINATIONS.find((d) => d.id === parsed.destinationId);
          if (match) return match;
        }
      }
    } catch {
      // Ignore
    }
    return SAMPLE_DESTINATIONS[0];
  });

  // 3. Global UI State
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>('INR');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<SortOption>('match');
  const [previewDestination, setPreviewDestination] = useState<Destination | null>(null);
  const [categoryModifiers, setCategoryModifiers] = useState<CategoryAllocationModifiers>(
    DEFAULT_CATEGORY_MODIFIERS
  );
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Toast notification
  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
  }, []);

  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => setToastMessage(null), 3000);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  // Offline detection for PWA
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    const handleOnline = () => {
      setIsOffline(false);
      showToast('Back online! Live syncing remote gigs and meetups.');
    };
    const handleOffline = () => {
      setIsOffline(true);
      showToast('Offline mode active. Workation schedules & cached plans accessible.');
    };
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [showToast]);

  // 4. Recommended destinations computation
  const recommendedMatches = useMemo(() => {
    return getRecommendedDestinations(
      SAMPLE_DESTINATIONS,
      preferences,
      searchQuery,
      sortBy
    );
  }, [preferences, searchQuery, sortBy]);

  // 5. Handlers
  const handleUpdatePreferences = (updates: Partial<TripPreferences>) => {
    setPreferences((prev) => ({ ...prev, ...updates }));
  };

  const handleResetPreferences = () => {
    setPreferences(DEFAULT_PREFERENCES);
    setSearchQuery('');
    setCategoryModifiers(DEFAULT_CATEGORY_MODIFIERS);
    showToast('Reset all preferences to recommended defaults.');
  };

  const handleSelectForCalculator = (dest: Destination) => {
    setSelectedDestination(dest);
    setCategoryModifiers(DEFAULT_CATEGORY_MODIFIERS);
    handleTabChange('planner');
    showToast(`Loaded ${dest.name} into the Trip & Budget Architect.`);
  };

  const handleUpdateModifier = (key: keyof CategoryAllocationModifiers, val: number) => {
    setCategoryModifiers((prev) => ({ ...prev, [key]: val }));
  };

  const handleResetModifiers = () => {
    setCategoryModifiers(DEFAULT_CATEGORY_MODIFIERS);
    showToast('Reset category spending multipliers.');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#071317] text-[#FAFDFD] selection:bg-[#C98833] selection:text-black">
      
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 bg-[#0F262E] text-[#FAFDFD] text-xs sm:text-sm font-semibold rounded-2xl shadow-2xl border border-[#C98833]/40"
        >
          <CheckCircle2 className="w-4 h-4 text-[#C98833] shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Offline Status Banner */}
      {isOffline && (
        <div className="bg-[#C98833]/15 border-b border-[#C98833]/30 px-4 py-2 text-center text-xs text-[#FBA13A] font-semibold flex items-center justify-center gap-2">
          <WifiOff className="w-3.5 h-3.5" />
          <span>Offline Mode Active — Browsing cached itineraries and local plans seamlessly.</span>
        </div>
      )}

      {/* Navigation Header */}
      <Navbar
        currentCurrency={selectedCurrency}
        onCurrencyChange={setSelectedCurrency}
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />

      {/* Dedicated Page Views */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <HomeView
            destinations={SAMPLE_DESTINATIONS}
            currentCurrency={selectedCurrency}
            onNavigate={handleTabChange}
            onSelectDestinationForPlanner={handleSelectForCalculator}
            onQuickPreview={(dest) => setPreviewDestination(dest)}
          />
        )}

        {activeTab === 'gigs' && (
          <GigsView
            onShowToast={showToast}
          />
        )}

        {activeTab === 'destinations' && (
          <DestinationsView
            matches={recommendedMatches}
            currentCurrency={selectedCurrency}
            selectedDestinationId={selectedDestination.id}
            onSelectForCalculator={handleSelectForCalculator}
            onQuickPreview={(dest) => setPreviewDestination(dest)}
            selectedRegion={preferences.selectedRegion}
            onRegionChange={(reg) => handleUpdatePreferences({ selectedRegion: reg })}
            sortBy={sortBy}
            onSortChange={setSortBy}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onClearFilters={() => {
              setSearchQuery('');
              handleUpdatePreferences({ selectedRegion: 'All India' });
            }}
            hostelOnlyFilter={preferences.hostelOnlyFilter ?? false}
            onHostelFilterChange={(val) => handleUpdatePreferences({ hostelOnlyFilter: val })}
          />
        )}

        {activeTab === 'planner' && (
          <PlannerView
            selectedDestination={selectedDestination}
            allDestinations={SAMPLE_DESTINATIONS}
            onSelectDestination={handleSelectForCalculator}
            preferences={preferences}
            onUpdatePreferences={handleUpdatePreferences}
            onResetPreferences={handleResetPreferences}
            categoryModifiers={categoryModifiers}
            onUpdateModifier={handleUpdateModifier}
            onResetModifiers={handleResetModifiers}
            currentCurrency={selectedCurrency}
            onShowToast={showToast}
          />
        )}

        {activeTab === 'coliving' && (
          <ColivingView
            onShowToast={showToast}
            onPlanTripToDestination={(destId) => {
              const match = SAMPLE_DESTINATIONS.find((d) => d.id === destId);
              if (match) handleSelectForCalculator(match);
              else handleTabChange('planner');
            }}
          />
        )}

        {activeTab === 'itinerary' && (
          <ItineraryView
            onShowToast={showToast}
            onNavigateToPlanner={() => handleTabChange('planner')}
          />
        )}

        {activeTab === 'community' && (
          <CommunityView
            onShowToast={showToast}
            onNavigateToPlanner={() => handleTabChange('planner')}
          />
        )}

        {activeTab === 'passport' && (
          <FinancialPassportView
            currentCurrency={selectedCurrency}
            onShowToast={showToast}
            onNavigateToPlanner={() => handleTabChange('planner')}
          />
        )}

        {activeTab === 'residence' && (
          <ResidencePortalView
            onShowToast={showToast}
            onNavigateToPlanner={() => handleTabChange('planner')}
          />
        )}

        {activeTab === 'about' && (
          <AboutView
            onShowToast={showToast}
            onNavigateToPlanner={() => handleTabChange('planner')}
          />
        )}
      </main>

      {/* Footer */}
      <Footer onNavigate={handleTabChange} />

      {/* Destination Quick Preview Modal */}
      <DestinationModal
        destination={previewDestination}
        isOpen={Boolean(previewDestination)}
        onClose={() => setPreviewDestination(null)}
        currentCurrency={selectedCurrency}
        onSelectForCalculator={handleSelectForCalculator}
      />

    </div>
  );
}

export default App;
