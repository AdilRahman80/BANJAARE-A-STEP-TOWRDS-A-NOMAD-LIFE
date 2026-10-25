import React, { useState, useEffect } from 'react';
import { Destination, Currency } from '../../types/trip';
import { formatCurrency } from '../../utils/budgetCalculator';
import {
  X,
  Star,
  Calendar,
  Check,
  Plane,
  Train,
  Hotel,
  Utensils,
  Compass,
  ArrowRight,
  Info,
  ShieldCheck,
  ChevronDown,
  Bed,
  Zap,
} from 'lucide-react';

interface DestinationModalProps {
  destination: Destination | null;
  isOpen: boolean;
  onClose: () => void;
  currentCurrency: Currency;
  onSelectForCalculator: (dest: Destination) => void;
}

export const DestinationModal: React.FC<DestinationModalProps> = ({
  destination,
  isOpen,
  onClose,
  currentCurrency,
  onSelectForCalculator,
}) => {
  const [safetyExpanded, setSafetyExpanded] = useState<boolean>(false);

  // Reset safetyExpanded when modal opens
  useEffect(() => {
    if (isOpen) {
      setSafetyExpanded(false);
    }
  }, [isOpen, destination]);

  // Handle escape key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !destination) return null;

  const isIndia = destination.country === 'India';

  const getAccommodationColor = (type: string) => {
    if (type.includes('hostel')) {
      return {
        bg: 'bg-teal-50/70',
        border: 'border-teal-200',
        badge: 'bg-teal-100 text-teal-800',
        price: 'text-teal-700',
      };
    }
    if (type === 'guesthouse') {
      return {
        bg: 'bg-blue-50/70',
        border: 'border-blue-200',
        badge: 'bg-blue-100 text-blue-800',
        price: 'text-blue-700',
      };
    }
    if (type === 'homestay') {
      return {
        bg: 'bg-purple-50/70',
        border: 'border-purple-200',
        badge: 'bg-purple-100 text-purple-800',
        price: 'text-purple-700',
      };
    }
    if (type === 'budget_hotel') {
      return {
        bg: 'bg-amber-50/70',
        border: 'border-amber-200',
        badge: 'bg-amber-100 text-amber-800',
        price: 'text-amber-700',
      };
    }
    if (type === 'mid_hotel') {
      return {
        bg: 'bg-indigo-50/70',
        border: 'border-indigo-200',
        badge: 'bg-indigo-100 text-indigo-800',
        price: 'text-indigo-700',
      };
    }
    // premium resort / other
    return {
      bg: 'bg-rose-50/70',
      border: 'border-rose-200',
      badge: 'bg-rose-100 text-rose-800',
      price: 'text-rose-700',
    };
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
      />

      {/* Modal Dialog Content */}
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden z-10 max-h-[92vh] flex flex-col my-auto">
        
        {/* Modal Header Image */}
        <div className="relative h-60 sm:h-72 w-full overflow-hidden bg-slate-900 shrink-0">
          <img
            src={destination.imageUrl}
            alt={`${destination.name}, ${destination.country}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/40 text-white hover:bg-black/60 backdrop-blur-sm transition-colors focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Close destination details"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Destination Title on Image */}
          <div className="absolute bottom-4 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-3 text-white">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-600/90 text-white backdrop-blur-sm">
                  {destination.region}
                </span>
                {destination.state && (
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-orange-600/90 text-white backdrop-blur-sm shadow-xs">
                    📍 {destination.state}
                  </span>
                )}
                <span className="flex items-center gap-1 text-xs text-amber-300 font-semibold bg-black/40 px-2 py-0.5 rounded-full backdrop-blur-sm">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  {destination.rating} ({destination.reviewsCount} reviews)
                </span>
              </div>
              <h2 id="modal-title" className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                {destination.name}, {destination.country}
              </h2>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-slate-200 bg-black/40 px-3 py-1.5 rounded-xl backdrop-blur-sm shrink-0">
              <Calendar className="w-3.5 h-3.5 text-blue-400" />
              <span>Best: {destination.bestSeason}</span>
            </div>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1">
          
          {/* Provisional notice banner for Indian destinations */}
          {isIndia && (
            <div className="p-3.5 rounded-2xl bg-blue-50 border border-blue-200 text-xs text-blue-900 flex items-start gap-2.5 leading-relaxed">
              <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <span>
                <strong>ℹ️ Illustrative estimates only.</strong> Transport fares, accommodation prices, and activity costs are indicative benchmarks. Verify current rates before booking.
              </span>
            </div>
          )}

          {/* Overview */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-2">
              About Destination
            </h3>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              {destination.description}
            </p>
          </div>

          {/* Accommodation Options section for Indian destinations */}
          {isIndia && destination.accommodationOptions && destination.accommodationOptions.length > 0 && (
            <div>
              <div className="mb-3">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <Bed className="w-4 h-4 text-[#C98833]" />
                  Accommodation Options
                </h3>
                <span className="text-xs text-slate-500 font-medium">
                  (Illustrative benchmarks — not live availability)
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {destination.accommodationOptions.map((opt) => {
                  const colors = getAccommodationColor(opt.type);
                  return (
                    <div
                      key={opt.id}
                      className={`p-3.5 rounded-2xl border ${colors.border} ${colors.bg} flex flex-col justify-between`}
                    >
                      <div>
                        <div className="flex items-start justify-between gap-2 mb-1.5">
                          <h4 className="text-sm font-bold text-slate-900">{opt.name}</h4>
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider shrink-0 ${colors.badge}`}
                          >
                            {opt.roomType === 'dormitory' ? 'Dormitory' : 'Private Room'}
                          </span>
                        </div>

                        <div className="flex flex-wrap gap-1 mb-2">
                          {opt.facilities.slice(0, 3).map((f, i) => (
                            <span
                              key={i}
                              className="text-[11px] bg-white/80 px-1.5 py-0.5 rounded text-slate-600 border border-slate-200/60"
                            >
                              {f}
                            </span>
                          ))}
                        </div>

                        <p className="text-xs text-slate-500 mb-2">
                          <strong className="text-slate-700">Suitable for:</strong> {opt.suitableFor}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between">
                        <span className="text-[11px] text-slate-500 font-medium">Est. Price:</span>
                        <span className={`text-sm font-extrabold ${colors.price}`}>
                          ₹{opt.estPriceINRPerPerson.toLocaleString()}/person/night
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Must-Experience Highlights */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-3">
              Must-Experience Highlights
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {destination.highlights.map((highlight, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs sm:text-sm text-slate-800"
                >
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{highlight}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Free & Low-Cost Activities section */}
          {destination.freeActivities && destination.freeActivities.length > 0 && (
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 mb-3 flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-500" />
                Free & Low-Cost Activities
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {destination.freeActivities.map((act, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 p-2.5 rounded-xl bg-amber-50/70 border border-amber-200/80 text-xs text-amber-900 font-medium"
                  >
                    <Zap className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span>{act}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Sample 3-Day Itinerary Snapshot */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-3">
              Sample 3-Day Itinerary Snapshot
            </h3>
            <div className="space-y-3">
              {destination.sampleItinerary.map((item) => (
                <div
                  key={item.day}
                  className="p-3.5 rounded-2xl bg-blue-50/50 border border-blue-100/70"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center">
                      {item.day}
                    </span>
                    <span className="text-sm font-bold text-slate-900">{item.title}</span>
                  </div>
                  <ul className="list-disc list-inside text-xs text-slate-600 pl-8 space-y-1">
                    {item.activities.map((act, i) => (
                      <li key={i}>{act}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Baseline Unit Cost Guide */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-3">
              Baseline Unit Cost Guide (Per Person/Day)
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-center">
                {isIndia ? (
                  <Train className="w-4 h-4 mx-auto text-blue-600 mb-1" />
                ) : (
                  <Plane className="w-4 h-4 mx-auto text-blue-600 mb-1" />
                )}
                <div className="text-[11px] text-slate-500 font-medium">
                  {isIndia ? 'Train / Transport' : 'Roundtrip Flights'}
                </div>
                <div className="text-sm font-bold text-slate-900 mt-0.5">
                  ~{formatCurrency(destination.costEstimates.flightBaseUSD, currentCurrency)}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-center">
                <Hotel className="w-4 h-4 mx-auto text-indigo-600 mb-1" />
                <div className="text-[11px] text-slate-500 font-medium">Mid Hotel / Night</div>
                <div className="text-sm font-bold text-slate-900 mt-0.5">
                  ~{formatCurrency(destination.costEstimates.nightlyLodgingUSD.mid, currentCurrency)}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-center">
                <Utensils className="w-4 h-4 mx-auto text-amber-600 mb-1" />
                <div className="text-[11px] text-slate-500 font-medium">Daily Food & Drink</div>
                <div className="text-sm font-bold text-slate-900 mt-0.5">
                  ~{formatCurrency(destination.costEstimates.dailyFoodUSD, currentCurrency)}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-center">
                <Compass className="w-4 h-4 mx-auto text-emerald-600 mb-1" />
                <div className="text-[11px] text-slate-500 font-medium">Daily Activities</div>
                <div className="text-sm font-bold text-slate-900 mt-0.5">
                  ~{formatCurrency(destination.costEstimates.dailyActivitiesUSD, currentCurrency)}
                </div>
              </div>
            </div>
          </div>

          {/* Safety Tips Collapsible Section */}
          {destination.safetyTips && destination.safetyTips.length > 0 && (
            <div className="rounded-2xl border border-slate-200 bg-slate-50/70 overflow-hidden">
              <button
                type="button"
                onClick={() => setSafetyExpanded((prev) => !prev)}
                className="w-full flex items-center justify-between p-4 text-left transition-colors hover:bg-slate-100 focus:outline-none"
                aria-expanded={safetyExpanded}
              >
                <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>🛡 Safety & Travel Tips</span>
                  <span className="text-xs font-normal text-slate-500">
                    ({destination.safetyTips.length} tips)
                  </span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${
                    safetyExpanded ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {safetyExpanded && (
                <div className="px-4 pb-4 pt-1 border-t border-slate-200 space-y-2">
                  {destination.safetyTips.map((tip, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 leading-relaxed">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{tip}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>

        {/* Modal Action Bar */}
        <div className="p-4 sm:p-5 border-t border-slate-200 bg-slate-50 flex items-center justify-between gap-3 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-200 rounded-xl transition-colors"
          >
            Close
          </button>

          <button
            type="button"
            onClick={() => {
              onSelectForCalculator(destination);
              onClose();
            }}
            className="inline-flex items-center gap-2 px-6 py-2.5 text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-xl shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <span>Plan & Calculate This Destination</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
