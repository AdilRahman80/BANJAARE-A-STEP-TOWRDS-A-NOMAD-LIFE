import React from 'react';
import { RecommendationMatch, Currency, Destination } from '../../types/trip';
import { formatCurrency } from '../../utils/budgetCalculator';
import { getDestinationNomadScore } from '../../utils/nomadScoreEngine';
import {
  Star,
  CheckCircle2,
  AlertCircle,
  Eye,
  Calculator,
  ArrowRight,
  Zap,
  GraduationCap,
  Bed,
  Sparkles,
  Train,
  MapPin,
  Wifi,
  Laptop,
} from 'lucide-react';

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

  const nomadScore = getDestinationNomadScore(destination);

  // Match score visual styling
  const scoreBadgeBg =
    matchScore >= 85
      ? 'bg-emerald-600 text-white'
      : matchScore >= 70
      ? 'bg-[#1D4552] text-[#FAFDFD] border border-[#C98833]/40'
      : 'bg-amber-600 text-white';

  const cleanOrigin = transitEstimate?.origin ? transitEstimate.origin.split(' (')[0] : '';
  const topOffset = isTransportOverBudget ? 'top-8' : 'top-3';

  return (
    <div
      className={`group flex flex-col bg-[#0F262E] text-[#FAFDFD] rounded-2xl overflow-hidden border transition-all duration-300 ${
        isSelectedForCalculator
          ? 'border-[#C98833] ring-1 ring-[#C98833] shadow-lg shadow-[#C98833]/20'
          : 'border-[#1D4552] hover:border-[#C98833]/50 hover:shadow-2xl'
      }`}
    >
      {/* Destination Image with Badges */}
      <div className="relative h-52 sm:h-56 w-full overflow-hidden bg-[#071317]">
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
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F262E] via-[#071317]/40 to-transparent" />

        {/* Top Badges: Match Score & Nomad Score */}
        <div className={`absolute ${topOffset} left-3 z-10 flex flex-wrap items-center gap-1.5`}>
          <span
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold shadow-md ${scoreBadgeBg}`}
          >
            {matchScore}% Match
          </span>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-[#071317]/85 border border-[#C98833]/50 text-[#C98833] backdrop-blur-sm">
            <Sparkles className="w-3 h-3 text-[#FBA13A]" />
            Nomad {nomadScore.finalScore} · {nomadScore.grade}
          </span>
        </div>

        {/* Region & State Badges */}
        <div className={`absolute ${topOffset} right-3 z-10 flex flex-col items-end gap-1.5 transition-all`}>
          <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold bg-black/60 text-white backdrop-blur-sm border border-white/10">
            {destination.region}
          </span>
          {destination.state && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold bg-[#C98833]/90 text-black font-bold backdrop-blur-sm shadow-xs">
              <MapPin className="w-3 h-3 shrink-0" /> {destination.state}
            </span>
          )}
        </div>

        {/* Destination Name & Rating on top of image */}
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between text-white">
          <div>
            <h3 className="text-xl font-bold tracking-tight text-[#FAFDFD] drop-shadow-sm font-serif">
              {destination.name}
            </h3>
            <p className="text-xs font-medium text-slate-300 flex items-center gap-1 drop-shadow-sm">
              {destination.state ? `${destination.state}, ` : ''}{destination.country}
            </p>
          </div>

          <div className="flex items-center gap-1 bg-[#071317]/80 border border-[#1D4552] backdrop-blur-xs px-2 py-1 rounded-lg text-xs font-bold text-[#FBA13A]">
            <Star className="w-3.5 h-3.5 fill-[#FBA13A] text-[#FBA13A]" />
            <span>{destination.rating}</span>
            <span className="text-slate-400 text-[10px] font-normal">
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
                className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-[#14313B] text-slate-300 border border-[#1D4552]"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Nomad Infrastructure Metrics */}
          <div className="grid grid-cols-2 gap-2 mb-3 py-1.5 px-2.5 rounded-xl bg-[#071317]/60 border border-[#1D4552]/70 text-[11px]">
            <div className="flex items-center gap-1.5 text-slate-300">
              <Wifi className="w-3.5 h-3.5 text-[#C98833]" />
              <span>Wi-Fi {nomadScore.wifi}/10</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-300">
              <Laptop className="w-3.5 h-3.5 text-[#10B981]" />
              <span>Coworking {nomadScore.coworking}/10</span>
            </div>
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
            <div className="mb-3 px-3 py-1.5 rounded-xl bg-[#071317] border border-[#1D4552] text-xs text-[#FAFDFD] flex items-center gap-1.5 font-medium">
              <Train className="w-3.5 h-3.5 text-[#C98833] shrink-0" />
              <span>
                ~₹{transitEstimate.estCostPerPersonINR.toLocaleString()} by {transitEstimate.primaryMode} from {cleanOrigin}{transitEstimate.isProvisional ? ' (est.)' : ''}
              </span>
            </div>
          )}

          {/* Recommendation Highlights */}
          <div className="p-3 rounded-xl bg-[#071317]/80 border border-[#1D4552] text-xs space-y-1.5 mb-4">
            <div className="flex items-start gap-1.5 font-medium text-slate-200">
              <span className="text-[#C98833] font-bold shrink-0">Highlights:</span>
              <span className="line-clamp-2">{reasons[0]}</span>
            </div>
            {reasons[2] && (
              <div className="text-[11px] text-slate-400 font-medium">
                • {reasons[2]}
              </div>
            )}
            {isBudgetFit ? (
              <div className="flex items-center gap-1 text-emerald-400 font-medium text-[11px]">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Budget remaining: +{formatCurrency(budgetDifference, currentCurrency)}</span>
              </div>
            ) : (
              <div className="flex items-center gap-1 text-[#FBA13A] font-medium text-[11px]">
                <AlertCircle className="w-3.5 h-3.5 text-[#FBA13A] shrink-0" />
                <span>Exceeds target by {formatCurrency(Math.abs(budgetDifference), currentCurrency)}</span>
              </div>
            )}
          </div>
        </div>

        {/* Pricing & Actions Footer */}
        <div className="pt-3 border-t border-[#1D4552]/70">
          <div className="flex items-center justify-between mb-3.5">
            <div>
              <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold block">
                Estimated Total
              </span>
              <span className="text-xl font-extrabold text-[#C98833]">
                {formatCurrency(estimatedTripCost, currentCurrency)}
              </span>
            </div>
            <div className="text-right">
              <span className="text-[11px] text-slate-400 block">
                {destination.country === 'India' ? 'Transit + Stay + Fun' : 'Flight + Stay + Fun'}
              </span>
              <span className="text-xs font-semibold text-[#10B981]">All Travelers Incl.</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => onQuickPreview(destination)}
              className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 text-xs font-bold text-slate-200 bg-[#14313B] hover:bg-[#1D4552] border border-[#1D4552] rounded-xl transition-all"
            >
              <Eye className="w-3.5 h-3.5 text-[#C98833]" /> Details
            </button>

            <button
              type="button"
              onClick={() => onSelectForCalculator(destination)}
              className={`inline-flex items-center justify-center gap-1.5 py-2.5 px-3 text-xs font-bold rounded-xl transition-all ${
                isSelectedForCalculator
                  ? 'bg-[#C98833] text-black shadow-lg shadow-[#C98833]/20 font-extrabold'
                  : 'bg-[#071317] text-[#C98833] hover:bg-[#C98833] hover:text-black border border-[#C98833]/50'
              }`}
            >
              <Calculator className="w-3.5 h-3.5" />
              {isSelectedForCalculator ? 'Active in Planner' : 'Architect Trip'}
              <ArrowRight className="w-3 h-3 ml-0.5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
