import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Currency } from '../../types/trip';
import { formatCurrency } from '../../utils/budgetCalculator';

interface CostBreakdownCardProps {
  title: string;
  icon: LucideIcon;
  amountUSD: number;
  percentage: number;
  currentCurrency: Currency;
  colorClass: string;
  bgClass: string;
  description: string;
  multiplier?: number;
  onMultiplierChange?: (multiplier: number) => void;
}

export const CostBreakdownCard: React.FC<CostBreakdownCardProps> = ({
  title,
  icon: Icon,
  amountUSD,
  percentage,
  currentCurrency,
  colorClass,
  bgClass,
  description,
  multiplier,
  onMultiplierChange,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between transition-all hover:shadow-md">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2.5">
            <div className={`w-9 h-9 rounded-xl ${bgClass} ${colorClass} flex items-center justify-center shrink-0`}>
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">{title}</h4>
              <span className="text-[11px] text-slate-500 font-medium">{percentage}% of total</span>
            </div>
          </div>

          <div className="text-right">
            <div className="text-lg font-extrabold text-slate-900">
              {formatCurrency(amountUSD, currentCurrency)}
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-xs text-slate-600 mb-4">{description}</p>
      </div>

      {/* Interactive Fine-Tuning Slider if adjustable */}
      {multiplier !== undefined && onMultiplierChange && (
        <div className="pt-3 border-t border-slate-100">
          <div className="flex items-center justify-between text-[11px] font-semibold text-slate-600 mb-1">
            <span>Fine-Tune Allocation</span>
            <span className={multiplier !== 1.0 ? 'text-blue-600' : 'text-slate-500'}>
              {multiplier === 1.0
                ? 'Standard'
                : multiplier < 1.0
                ? `Save ${Math.round((1 - multiplier) * 100)}%`
                : `Upgrade +${Math.round((multiplier - 1) * 100)}%`}
            </span>
          </div>
          <input
            type="range"
            min="0.5"
            max="1.6"
            step="0.05"
            value={multiplier}
            onChange={(e) => onMultiplierChange(parseFloat(e.target.value))}
            className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer"
            aria-label={`Adjust ${title} spending multiplier`}
          />
          <div className="flex justify-between text-[10px] text-slate-400 mt-1">
            <span>Budget Saver</span>
            <span>Default</span>
            <span>Premium</span>
          </div>
        </div>
      )}
    </div>
  );
};
