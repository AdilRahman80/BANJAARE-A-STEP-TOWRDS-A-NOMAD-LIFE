import React from 'react';
import { RecommendationMatch, Currency, Destination } from '../../types/trip';
import { formatCurrency } from '../../utils/budgetCalculator';
import { Star, CheckCircle2, AlertCircle, Eye, Calculator, ArrowRight, Zap, GraduationCap, Bed, Sparkles, Train, MapPin } from 'lucide-react';

interface DestinationCardProps {
  match: RecommendationMatch;
  currentCurrency: Currency;
  isSelectedForCalculator: boolean;
  onSelectForCalculator: (dest: Destination) => void;
  onQuickPreview: (dest: Destination) => void;
}

export const DestinationCard: React.FC<DestinationCardProps> = ({
  match,
  currentCurrency,
  isSelectedForCalculator,
  onSelectForCalculator,
  onQuickPreview,
}) => {
  const {
    destination,
    matchScore,
    reasons,
    estimatedTripCost,
    isBudgetFit,
    budgetDifference,
    transitEstimate,
    isDayTrip,
    isStudentRecommended,
    hostelAvailable,
    freeActivitiesCount,
    isTransportOverBudget,
  } = match;

  // Match score visual styling
  const scoreBadgeBg =
    matchScore >= 85
      ? 'bg-emerald-500 text-white'
      : matchScore >= 70
      ? 'bg-blue-600 text-white'
      : 'bg-amber-500 text-white';

  const cleanOrigin = transitEstimate?.origin ? transitEstimate.origin.split(' (')[0] : '';
  const topOffset = isTransportOverBudget ? 'top-8' : 'top-3';

  return (
    <div
      className={`group flex flex-col bg-[#0F262E] text-[#FAFDFD] rounded-2xl overflow-hidden border transition-all duration-300 ${
        isSelectedForCalculator
          ? 'border-[#C98833] ring-1 ring-[#C98833] shadow-lg shadow-[#C98833]/15'
          : 'border-[#1D4552] hover:border-[#C98833]/50 hover:shadow-xl'
      }`}
    >
      {/* Destination Image with Badges */}
      <div className="relative h-52 sm:h-56 w-full overflow-hidden bg-slate-900">
        {/* Transport-over-budget warning banner */}
        {isTransportOverBudget && (
          <div className="absolute top-0 inset-x-0 z-20 bg-amber-500/90 text-white text-[11px] font-bold py-1 px-3 text-center shadow-xs flex items-center justify-center gap-1.5 backdrop-blur-xs">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>Transport may exceed 65% of budget from your origin</span>
          </div>
        )}

        <img
          src={destination.imageUrl}
          alt={`${destination.name}, ${destination.country}`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#071317] via-[#071317]/30 to-transparent" />

        {/* Match Score Badge */}
        <div className={`absolute ${topOffset} left-3 z-10 transition-all`}>
          <span
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold shadow-md ${scoreBadgeBg}`}
          >
            {matchScore}% Match
          </span>
        </div>

        {/* Region & State Badges */}
        <div className={`absolute ${topOffset} right-3 z-10 flex flex-col items-end gap-1.5 transition-all`}>
          <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold bg-black/50 text-white backdrop-blur-sm border border-white/10">
            {destination.region}
          </span>
          {destination.state && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold bg-[#C98833]/90 text-white backdrop-blur-sm shadow-xs">
              <MapPin className="w-3 h-3 shrink-0" /> {destination.state}
            </span>
          )}
        </div>

        {/* Destination Name & Rating on top of image */}
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between text-white">
          <div>
            <h3 className="text-xl font-bold tracking-tight text-white drop-shadow-sm">
              {destination.name}
            </h3>
            <p className="text-xs font-medium text-slate-200 flex items-center gap-1 drop-shadow-sm">
              {destination.state ? `${destination.state}, ` : ''}{destination.country}
            </p>
          </div>

          <div className="flex items-center gap-1 bg-black/40 backdrop-blur-xs px-2 py-1 rounded-lg text-xs font-bold text-amber-300">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>{destination.rating}</span>
            <span className="text-slate-300 text-[10px] font-normal">
              ({destination.reviewsCount})
            </span>
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-2.5">
            {destination.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-[11px] font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-600"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Badge Row (Day Trip, Student Pick, Hostel, Free Activities) */}
          {(isDayTrip || isStudentRecommended || hostelAvailable || (freeActivitiesCount && freeActivitiesCount > 0)) && (
            <div className="flex flex-wrap items-center gap-1.5 mb-3">
              {isDayTrip && (
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-md bg-purple-500/10 text-purple-300 border border-purple-500/20">
                  <Zap className="w-3 h-3 text-purple-400" /> Day Trip
                </span>
              )}
              {isStudentRecommended && (
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                  <GraduationCap className="w-3 h-3 text-emerald-400" /> Student Pick
                </span>
              )}
              {hostelAvailable && (
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-md bg-[#C98833]/15 text-[#F59E0B] border border-[#C98833]/30">
                  <Bed className="w-3 h-3 text-[#FBA13A]" /> Hostel
                </span>
              )}
              {freeActivitiesCount && freeActivitiesCount > 0 ? (
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-300 border border-amber-500/20">
                  <Sparkles className="w-3 h-3 text-amber-400" /> {freeActivitiesCount} Free
                </span>
              ) : null}
            </div>
          )}

          {/* Description */}
          <p className="text-xs sm:text-sm text-slate-300 line-clamp-2 mb-3">
            {destination.description}
          </p>

          {/* Transit Estimate Line for Indian destinations */}
          {destination.country === 'India' && transitEstimate && (
            <div className="mb-3 px-3 py-1.5 rounded-xl bg-[#0F262E] border border-[#1D4552] text-xs text-[#FAFDFD] flex items-center gap-1.5 font-medium">
              <Train className="w-3.5 h-3.5 text-[#C98833] shrink-0" />
              <span>
                ~₹{transitEstimate.estCostPerPersonINR.toLocaleString()} by {transitEstimate.primaryMode} from {cleanOrigin}{transitEstimate.isProvisional ? ' (est.)' : ''}
              </span>
            </div>
          )}

          {/* Recommendation Highlights */}
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700 space-y-1.5 mb-4">
            <div className="flex items-start gap-1.5 font-medium text-slate-800">
              <span className="text-blue-600 font-bold shrink-0">Highlights:</span>
              <span className="line-clamp-2">{reasons[0]}</span>
            </div>
            {reasons[2] && (
              <div className="text-[11px] text-slate-600 font-medium">
                • {reasons[2]}
              </div>
            )}
            {isBudgetFit ? (
              <div className="flex items-center gap-1 text-emerald-700 font-medium text-[11px]">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Budget remaining: +{formatCurrency(budgetDifference, currentCurrency)}</span>
              </div>
            ) : (
              <div className="flex items-center gap-1 text-amber-700 font-medium text-[11px]">
                <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span>Exceeds target by {formatCurrency(Math.abs(budgetDifference), currentCurrency)}</span>
              </div>
            )}
          </div>
        </div>

        {/* Pricing & Actions Footer */}
        <div className="pt-3 border-t border-slate-100">
          <div className="flex items-center justify-between mb-3.5">
            <div>
              <span className="text-[11px] uppercase tracking-wider text-slate-600 font-semibold block">
                Estimated Total
              </span>
              <span className="text-xl font-extrabold text-slate-900">
                {formatCurrency(estimatedTripCost, currentCurrency)}
              </span>
            </div>
            <div className="text-right">
              <span className="text-[11px] text-slate-600 block">
                {destination.country === 'India' ? 'Transit + Stay + Fun' : 'Flight + Stay + Fun'}
              </span>
              <span className="text-xs font-semibold text-blue-600">All Travelers Incl.</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => onQuickPreview(destination)}
              className="inline-flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 rounded-xl transition-colors"
            >
              <Eye className="w-3.5 h-3.5" /> Details
            </button>

            <button
              type="button"
              onClick={() => onSelectForCalculator(destination)}
              className={`inline-flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold rounded-xl transition-all ${
                isSelectedForCalculator
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200'
              }`}
            >
              <Calculator className="w-3.5 h-3.5" />
              {isSelectedForCalculator ? 'Active in Budget' : 'Calculate'}
              <ArrowRight className="w-3 h-3 ml-0.5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
