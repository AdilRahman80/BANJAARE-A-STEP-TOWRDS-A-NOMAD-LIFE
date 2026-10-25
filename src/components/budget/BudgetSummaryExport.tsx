import React, { useState } from 'react';
import { Destination, TripPreferences, BudgetBreakdown, Currency } from '../../types/trip';
import { formatCurrency } from '../../utils/budgetCalculator';
import { Copy, Check, Share2 } from 'lucide-react';

interface BudgetSummaryExportProps {
  destination: Destination;
  preferences: TripPreferences;
  breakdown: BudgetBreakdown;
  currentCurrency: Currency;
  onShowToast: (msg: string) => void;
}

export const BudgetSummaryExport: React.FC<BudgetSummaryExportProps> = ({
  destination,
  preferences,
  breakdown,
  currentCurrency,
  onShowToast,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopySummary = async () => {
    const summaryText = `
🌍 SMART TRIP PLANNER — ITINERARY & BUDGET ESTIMATE
==================================================
Destination: ${destination.name}, ${destination.country} (${destination.region})
Origin: ${preferences.originCity || 'Flexible Origin'}
Duration: ${preferences.durationDays} Days (${Math.max(1, preferences.durationDays - 1)} Nights)
Travelers: ${preferences.travelersCount} Person(s)
Accommodation Style: ${preferences.accommodationTier.toUpperCase()}
Best Season: ${destination.bestSeason}

💰 ESTIMATED COST BREAKDOWN (${currentCurrency}):
--------------------------------------------------
• Flights & Travel:       ${formatCurrency(breakdown.flightsTotal, currentCurrency)}
• Lodging & Stays:        ${formatCurrency(breakdown.lodgingTotal, currentCurrency)}
• Food & Dining:          ${formatCurrency(breakdown.foodTotal, currentCurrency)}
• Activities & Tours:     ${formatCurrency(breakdown.activitiesTotal, currentCurrency)}
• Local Transit:          ${formatCurrency(breakdown.transitTotal, currentCurrency)}
• Contingency Fund (10%): ${formatCurrency(breakdown.contingencyTotal, currentCurrency)}
--------------------------------------------------
TOTAL ESTIMATED COST:     ${formatCurrency(breakdown.grandTotal, currentCurrency)}
TARGET BUDGET:            ${formatCurrency(preferences.targetBudget, currentCurrency)}
BUDGET STATUS:            ${
      breakdown.isWithinBudget
        ? `Surplus of ${formatCurrency(breakdown.surplusDeficit, currentCurrency)}`
        : `Exceeds by ${formatCurrency(Math.abs(breakdown.surplusDeficit), currentCurrency)}`
    }
PER PERSON ESTIMATE:      ${formatCurrency(breakdown.perPersonTotal, currentCurrency)}
DAILY SPEND / PERSON:     ${formatCurrency(breakdown.dailyPerPerson, currentCurrency)}

TOP HIGHLIGHTS:
${destination.highlights.map((h) => `• ${h}`).join('\n')}

Generated with Smart Trip Planner (Client-Side Travel AI Portfolio)
`.trim();

    try {
      await navigator.clipboard.writeText(summaryText);
      setCopied(true);
      onShowToast('Trip summary copied to clipboard!');
      setTimeout(() => setCopied(false), 2500);
    } catch {
      onShowToast('Could not copy directly. Please select text manually.');
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={handleCopySummary}
        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 shadow-2xs transition-all active:scale-95"
      >
        {copied ? (
          <>
            <Check className="w-4 h-4 text-emerald-600" />
            <span className="text-emerald-700">Copied to Clipboard!</span>
          </>
        ) : (
          <>
            <Copy className="w-4 h-4 text-slate-500" />
            <span>Copy Trip Summary</span>
          </>
        )}
      </button>

      <button
        type="button"
        onClick={handleCopySummary}
        className="p-2.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-600 shadow-2xs transition-all"
        title="Share Trip Plan"
        aria-label="Share trip plan"
      >
        <Share2 className="w-4 h-4" />
      </button>
    </div>
  );
};
