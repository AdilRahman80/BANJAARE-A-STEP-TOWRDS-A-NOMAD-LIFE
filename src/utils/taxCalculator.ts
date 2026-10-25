/**
 * Indian Freelancer Tax & Financial Passport Utility
 * Implements Section 44ADA Presumptive Taxation Scheme of the Indian Income Tax Act.
 */

export interface TaxCalculationResult {
  grossAnnualIncomeINR: number;
  presumptiveTaxableIncomeINR: number; // 50% under 44ADA
  presumptiveExpenseDeductionINR: number; // 50% presumed expenses
  estimatedTaxPayableINR: number;
  effectiveTaxRatePercent: number;
  taxRebateEligible: boolean; // Section 87A rebate if taxable <= 7,00,000 in new regime
  annualTaxSavingsINR: number; // Compared to standard 30% slab without 44ADA
  monthlyNetInHandINR: number;
}

/**
 * Calculates tax liability under Section 44ADA for Indian freelancers/nomads.
 * Uses the default New Tax Regime slab structure with Section 87A rebate up to ₹7 Lakhs.
 */
export function calculateSection44ADATax(grossAnnualIncomeINR: number): TaxCalculationResult {
  const safeGross = Math.max(0, grossAnnualIncomeINR);

  // Section 44ADA presumes 50% as taxable profit
  const presumptiveTaxableIncomeINR = safeGross * 0.5;
  const presumptiveExpenseDeductionINR = safeGross * 0.5;

  let tax = 0;
  let taxRebateEligible = false;

  // Under New Regime:
  // Up to 3,00,000: Nil
  // 3,00,001 - 7,00,000: 5% (above 3L) - Rebate under 87A makes tax zero if taxable income <= 7,00,000
  // 7,00,001 - 10,00,000: 10%
  // 10,00,001 - 12,00,000: 15%
  // 12,00,001 - 15,00,000: 20%
  // Above 15,00,000: 30%

  if (presumptiveTaxableIncomeINR <= 700000) {
    tax = 0;
    taxRebateEligible = true;
  } else {
    // 3L to 7L @ 10% average or stepped
    const slab1 = Math.min(Math.max(0, presumptiveTaxableIncomeINR - 300000), 400000) * 0.05;
    const slab2 = Math.min(Math.max(0, presumptiveTaxableIncomeINR - 700000), 300000) * 0.10;
    const slab3 = Math.min(Math.max(0, presumptiveTaxableIncomeINR - 1000000), 200000) * 0.15;
    const slab4 = Math.min(Math.max(0, presumptiveTaxableIncomeINR - 1200000), 300000) * 0.20;
    const slab5 = Math.max(0, presumptiveTaxableIncomeINR - 1500000) * 0.30;

    tax = slab1 + slab2 + slab3 + slab4 + slab5;

    // 4% Health & Education Cess
    tax = tax * 1.04;
  }

  const estimatedTaxPayableINR = Math.round(tax);
  const effectiveTaxRatePercent = safeGross > 0 ? Number(((estimatedTaxPayableINR / safeGross) * 100).toFixed(1)) : 0;

  // Comparison baseline: Without 44ADA (assuming traditional 20% expenses)
  const traditionalTaxable = safeGross * 0.8;
  const baselineTax = traditionalTaxable > 700000 ? traditionalTaxable * 0.2 : 0;
  const annualTaxSavingsINR = Math.max(0, Math.round(baselineTax - estimatedTaxPayableINR));

  const monthlyNetInHandINR = Math.round((safeGross - estimatedTaxPayableINR) / 12);

  return {
    grossAnnualIncomeINR: safeGross,
    presumptiveTaxableIncomeINR: Math.round(presumptiveTaxableIncomeINR),
    presumptiveExpenseDeductionINR: Math.round(presumptiveExpenseDeductionINR),
    estimatedTaxPayableINR,
    effectiveTaxRatePercent,
    taxRebateEligible,
    annualTaxSavingsINR,
    monthlyNetInHandINR,
  };
}

/**
 * Calculates Earn-to-Travel metrics:
 * Computes how many billable days or weeks are needed to cover a workation trip.
 */
export function calculateEarnToTravelRatio(
  monthlyIncomeINR: number,
  tripCostINR: number
): {
  billableDaysNeeded: number;
  billableWeeksNeeded: number;
  monthlySurplusINR: number;
  savingsRatePercent: number;
} {
  const dailyIncome = Math.max(1, monthlyIncomeINR / 22); // 22 working days per month
  const billableDaysNeeded = Number((tripCostINR / dailyIncome).toFixed(1));
  const billableWeeksNeeded = Number((billableDaysNeeded / 5).toFixed(1));
  const monthlySurplusINR = Math.round(monthlyIncomeINR - tripCostINR);
  const savingsRatePercent = monthlyIncomeINR > 0 ? Number(((monthlySurplusINR / monthlyIncomeINR) * 100).toFixed(1)) : 0;

  return {
    billableDaysNeeded,
    billableWeeksNeeded,
    monthlySurplusINR,
    savingsRatePercent,
  };
}
