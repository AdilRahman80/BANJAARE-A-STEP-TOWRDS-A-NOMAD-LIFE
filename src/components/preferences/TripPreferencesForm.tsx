import React from 'react';
import {
  TripPreferences,
  AccommodationTier,
  TravelStyle,
  Currency,
  TransportPreference,
} from '../../types/trip';
import { formatCurrency } from '../../utils/budgetCalculator';
import { POPULAR_INDIAN_ORIGINS, INDIAN_ORIGINS } from '../../data/indianOrigins';
import {
  Users,
  Calendar,
  DollarSign,
  MapPin,
  Sparkles,
  RotateCcw,
  Check,
  Building,
  Hotel,
  Palmtree,
  Backpack,
  Train,
  Compass,
  Landmark,
  Waves,
  UtensilsCrossed,
  Trees,
  Clock,
} from 'lucide-react';

interface TripPreferencesFormProps {
  preferences: TripPreferences;
  onUpdatePreferences: (updates: Partial<TripPreferences>) => void;
  onResetPreferences: () => void;
  currentCurrency: Currency;
  onFindTrips: () => void;
}

const ALL_INTERESTS: { id: TravelStyle; label: string; icon: React.ElementType }[] = [
  { id: 'Adventure', label: 'Treks & Rafting', icon: Compass },
  { id: 'Culture', label: 'Temples & Heritage', icon: Landmark },
  { id: 'Beaches', label: 'Beaches & Shacks', icon: Waves },
  { id: 'Cuisine', label: 'Street Food & Dhabas', icon: UtensilsCrossed },
  { id: 'Relaxation', label: 'Yoga & Ashrams', icon: Sparkles },
  { id: 'Nature', label: 'Valleys & Waterfalls', icon: Trees },
  { id: 'City', label: 'City & Bazaars', icon: Building },
];

const MONTHS = [
  'Any',
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const TripPreferencesForm: React.FC<TripPreferencesFormProps> = ({
  preferences,
  onUpdatePreferences,
  onResetPreferences,
  currentCurrency,
  onFindTrips,
}) => {
  const toggleInterest = (interest: TravelStyle) => {
    const exists = preferences.interests.includes(interest);
    const updated = exists
      ? preferences.interests.filter((i) => i !== interest)
      : [...preferences.interests, interest];
    onUpdatePreferences({ interests: updated });
  };

  const handlePerPersonBudgetINR = (inrVal: number) => {
    const safeInr = isNaN(inrVal) ? 1000 : Math.max(500, Math.min(200000, inrVal));
    const usdVal = safeInr / 83.5;
    onUpdatePreferences({
      budgetPerPerson: usdVal,
      targetBudget: usdVal * (preferences.travelersCount || 1),
    });
  };

  const currentBudgetPerPersonINR = Math.round(
    (preferences.targetBudget * 83.5) / Math.max(1, preferences.travelersCount)
  );

  return (
    <section id="preferences" className="py-12 bg-white border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-orange-50 text-orange-700 border border-orange-200 mb-3">
            <Sparkles className="w-3.5 h-3.5" /> Step 1: Customize Your Indian Journey
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            Set Your Travel Parameters &amp; Budget
          </h2>
          <p className="mt-2 text-base text-slate-600">
            Tell us where you are departing from in India, your planned budget per person, group size, and preferred travel vibe.
          </p>
        </div>

        {/* Student & Backpacker Banner */}
        <div className="mb-8 p-4 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-blue-50 border border-emerald-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm">
              <Backpack className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900 flex items-center gap-2">
                Student &amp; Backpacker Travel Mode
                <span className="text-[10px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded bg-emerald-200/80 text-emerald-800">
                  {preferences.isStudentBackpackerMode ? 'Active' : 'Inactive'}
                </span>
              </div>
              <div className="text-xs text-slate-600">
                Prioritizes hostel dorms (₹350–₹550), sleeper rail/bus transit, free activities &amp; group cost splitting.
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() =>
              onUpdatePreferences({
                isStudentBackpackerMode: !preferences.isStudentBackpackerMode,
                accommodationTier: !preferences.isStudentBackpackerMode ? 'budget' : 'mid',
              })
            }
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
              preferences.isStudentBackpackerMode
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
                : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-300'
            }`}
          >
            {preferences.isStudentBackpackerMode ? 'Turn Mode Off' : 'Enable Student Mode'}
          </button>
        </div>

        {/* Form Container */}
        <div className="bg-slate-50/80 rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Field 1: Departure Origin in India */}
            <div className="space-y-2">
              <label
                htmlFor="origin-city"
                className="flex items-center gap-2 text-sm font-semibold text-slate-800"
              >
                <MapPin className="w-4 h-4 text-orange-600" /> Starting Origin (India)
              </label>
              <input
                id="origin-city"
                type="text"
                list="indian-origins-list"
                value={preferences.originCity}
                onChange={(e) => onUpdatePreferences({ originCity: e.target.value })}
                placeholder="e.g. New Delhi, Bengaluru, Mumbai, Pune"
                className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <datalist id="indian-origins-list">
                {INDIAN_ORIGINS.map((o) => (
                  <option key={o.name} value={o.name}>
                    {o.state} ({o.region})
                  </option>
                ))}
              </datalist>

              <div className="flex flex-wrap gap-1.5 pt-1">
                <span className="text-[11px] text-slate-500 mr-1">Hubs:</span>
                {POPULAR_INDIAN_ORIGINS.slice(0, 5).map((city) => (
                  <button
                    key={city}
                    type="button"
                    onClick={() => onUpdatePreferences({ originCity: city })}
                    className={`text-[11px] px-2 py-0.5 rounded border transition-colors ${
                      preferences.originCity === city
                        ? 'bg-orange-600 text-white border-orange-600 font-semibold'
                        : 'bg-white hover:bg-slate-200/70 border-slate-200 text-slate-600'
                    }`}
                  >
                    {city.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>

            {/* Field 2: Target Budget & Per-Person Toggle */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="target-budget"
                  className="flex items-center gap-2 text-sm font-semibold text-slate-800"
                >
                  <DollarSign className="w-4 h-4 text-emerald-600" /> Budget Per Person
                </label>
                <span className="text-sm font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-lg border border-emerald-200">
                  ₹{currentBudgetPerPersonINR.toLocaleString()} / person
                </span>
              </div>
              <input
                id="target-budget"
                type="range"
                min="500"
                max="25000"
                step="250"
                value={currentBudgetPerPersonINR}
                onChange={(e) => handlePerPersonBudgetINR(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                aria-label="Adjust budget per person in INR"
              />
              <div className="flex justify-between text-[11px] text-slate-500">
                <button type="button" onClick={() => handlePerPersonBudgetINR(800)} className="hover:text-blue-600">
                  Day-Trip (₹800)
                </button>
                <button type="button" onClick={() => handlePerPersonBudgetINR(3500)} className="hover:text-blue-600">
                  Student (₹3.5k)
                </button>
                <button type="button" onClick={() => handlePerPersonBudgetINR(8000)} className="hover:text-blue-600">
                  Comfort (₹8k)
                </button>
                <button type="button" onClick={() => handlePerPersonBudgetINR(15000)} className="hover:text-blue-600">
                  Premium (₹15k+)
                </button>
              </div>
              <div className="text-[11px] text-slate-500 pt-0.5">
                Total for {preferences.travelersCount} traveler{preferences.travelersCount > 1 ? 's' : ''}:{' '}
                <strong className="text-slate-800">{formatCurrency(preferences.targetBudget, currentCurrency)}</strong>
              </div>
            </div>

            {/* Field 3: Duration & Day Trip Presets */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="duration-slider"
                  className="flex items-center gap-2 text-sm font-semibold text-slate-800"
                >
                  <Calendar className="w-4 h-4 text-blue-600" /> Trip Duration
                </label>
                <span className="text-sm font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-lg border border-blue-200">
                  {preferences.durationDays === 1 ? '1 Day (Day Trip)' : `${preferences.durationDays} Days (${preferences.durationDays - 1}N)`}
                </span>
              </div>
              <input
                id="duration-slider"
                type="range"
                min="1"
                max="21"
                step="1"
                value={preferences.durationDays}
                onChange={(e) => onUpdatePreferences({ durationDays: Number(e.target.value) })}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                aria-label="Adjust trip duration in days"
              />
              <div className="flex gap-1.5 pt-1">
                {[
                  { label: 'Day Trip (1d)', days: 1 },
                  { label: 'Weekend (2d)', days: 2 },
                  { label: 'Long Weekend (3d)', days: 3 },
                  { label: '1 Week (7d)', days: 7 },
                ].map((preset) => (
                  <button
                    key={preset.days}
                    type="button"
                    onClick={() => onUpdatePreferences({ durationDays: preset.days })}
                    className={`text-[11px] px-2 py-0.5 rounded border transition-colors ${
                      preferences.durationDays === preset.days
                        ? 'bg-blue-600 text-white border-blue-600 font-semibold'
                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Field 4: Travelers Count & Group Mode */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                <Users className="w-4 h-4 text-indigo-600" /> Number of Travelers
              </label>
              <div className="flex items-center gap-3">
                <div className="flex items-center bg-white border border-slate-200 rounded-xl overflow-hidden p-1 shadow-xs">
                  <button
                    type="button"
                    onClick={() =>
                      onUpdatePreferences({
                        travelersCount: Math.max(1, preferences.travelersCount - 1),
                      })
                    }
                    className="w-9 h-9 flex items-center justify-center text-slate-600 hover:bg-slate-100 rounded-lg font-bold text-lg disabled:opacity-40"
                    disabled={preferences.travelersCount <= 1}
                    aria-label="Decrease traveler count"
                  >
                    -
                  </button>
                  <span className="w-12 text-center font-bold text-slate-900 text-base">
                    {preferences.travelersCount}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      onUpdatePreferences({
                        travelersCount: Math.min(20, preferences.travelersCount + 1),
                      })
                    }
                    className="w-9 h-9 flex items-center justify-center text-slate-600 hover:bg-slate-100 rounded-lg font-bold text-lg disabled:opacity-40"
                    disabled={preferences.travelersCount >= 20}
                    aria-label="Increase traveler count"
                  >
                    +
                  </button>
                </div>
                <span className="text-xs text-slate-600">
                  {preferences.travelersCount === 1
                    ? 'Solo Backpacker'
                    : preferences.travelersCount === 2
                    ? 'Pair / Couple'
                    : preferences.travelersCount === 4
                    ? '4 Friends (Split Cab)'
                    : `${preferences.travelersCount} Squad (Max Savings)`}
                </span>
              </div>
            </div>

            {/* Field 5: Preferred Travel Month */}
            <div className="space-y-2">
              <label htmlFor="travel-month" className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                <Clock className="w-4 h-4 text-teal-600" /> Preferred Travel Month
              </label>
              <select
                id="travel-month"
                value={preferences.travelMonth || 'Any'}
                onChange={(e) => onUpdatePreferences({ travelMonth: e.target.value })}
                className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
              >
                {MONTHS.map((m) => (
                  <option key={m} value={m}>
                    {m === 'Any' ? 'Flexible / Any Month' : m}
                  </option>
                ))}
              </select>
              <span className="text-[11px] text-slate-500 block">
                Highlights destinations in their optimal season (e.g. Hills in summer, Goa/Rajasthan in winter).
              </span>
            </div>

            {/* Field 6: Transport Preference */}
            <div className="space-y-2">
              <label htmlFor="transport-pref" className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                <Train className="w-4 h-4 text-blue-600" /> Transport Preference
              </label>
              <select
                id="transport-pref"
                value={preferences.transportPreference || 'any'}
                onChange={(e) => onUpdatePreferences({ transportPreference: e.target.value as TransportPreference })}
                className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
              >
                <option value="any">Any / Best Value Transit</option>
                <option value="train_sleeper_bus">Sleeper Train / State Bus (Lowest Cost)</option>
                <option value="train_ac">AC 3-Tier Train / AC Volvo</option>
                <option value="road_cab">Shared Road Trip / Cab</option>
                <option value="flight">Flight (Fastest)</option>
              </select>
              <span className="text-[11px] text-slate-500 block">
                Calculates realistic origin-to-destination fares from {preferences.originCity || 'your departure hub'}.
              </span>
            </div>

            {/* Field 7: Accommodation Style & Hostels */}
            <div className="space-y-2 lg:col-span-3">
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                <Hotel className="w-4 h-4 text-blue-600" /> Accommodation Style
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {[
                  {
                    tier: 'budget' as AccommodationTier,
                    label: 'Backpacker Hostels & Dorms',
                    desc: 'Dorm beds (₹350–₹550/night), cozy guesthouses',
                    icon: Building,
                  },
                  {
                    tier: 'mid' as AccommodationTier,
                    label: 'Mid-Scale 3★ / Private Room',
                    desc: 'Comfortable private rooms, AC hotels (₹1,500–₹2,500)',
                    icon: Hotel,
                  },
                  {
                    tier: 'luxury' as AccommodationTier,
                    label: 'Heritage Havelis & Resorts',
                    desc: 'Luxury suites, private villas, spa resorts',
                    icon: Palmtree,
                  },
                ].map((item) => {
                  const isSelected = preferences.accommodationTier === item.tier;
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.tier}
                      type="button"
                      onClick={() => onUpdatePreferences({ accommodationTier: item.tier })}
                      className={`text-left p-3 rounded-xl border transition-all ${
                        isSelected
                          ? 'bg-blue-50/80 border-blue-500 ring-2 ring-blue-500/20'
                          : 'bg-white border-slate-200 hover:border-slate-300'
                      }`}
                      aria-pressed={isSelected}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 font-semibold text-sm text-slate-900">
                          <Icon className={`w-4 h-4 ${isSelected ? 'text-blue-600' : 'text-slate-600'}`} />
                          {item.label}
                        </div>
                        {isSelected && <Check className="w-4 h-4 text-blue-600" />}
                      </div>
                      <p className="mt-1 text-xs text-slate-600">{item.desc}</p>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Interests & Travel Style Multi-select */}
          <div className="mt-8 pt-6 border-t border-slate-200">
            <label className="block text-sm font-semibold text-slate-800 mb-3">
              Travel Passions &amp; Interests (Select all that apply)
            </label>
            <div className="flex flex-wrap gap-2.5">
              {ALL_INTERESTS.map((interest) => {
                const isSelected = preferences.interests.includes(interest.id);
                const IconComponent = interest.icon;
                return (
                  <button
                    key={interest.id}
                    type="button"
                    onClick={() => toggleInterest(interest.id)}
                    className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                      isSelected
                        ? 'bg-[#C98833] text-black shadow-md font-semibold'
                        : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                    }`}
                    aria-pressed={isSelected}
                  >
                    <IconComponent className={`w-4 h-4 ${isSelected ? 'text-black' : 'text-[#C98833]'}`} />
                    <span>{interest.label}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 ml-1" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Action Row */}
          <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              type="button"
              onClick={onResetPreferences}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-slate-600 hover:text-slate-800 transition-colors"
            >
              <RotateCcw className="w-4 h-4" /> Reset to Recommended Defaults
            </button>

            <button
              type="button"
              onClick={onFindTrips}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 text-sm sm:text-base font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-xl shadow-md hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <Sparkles className="w-4 h-4" /> Calculate &amp; Match Indian Destinations
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
