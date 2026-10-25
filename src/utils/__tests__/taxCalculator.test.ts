import { describe, it, expect } from 'vitest';
import { calculateSection44ADATax, calculateEarnToTravelRatio } from '../taxCalculator';

describe('taxCalculator - Section 44ADA & Financial Passport', () => {
  it('calculates 50% presumptive income and 0 tax for <= 14 Lakhs gross under New Tax Regime (87A rebate)', () => {
    // ₹12,00,000 gross -> 50% = ₹6,00,000 taxable -> rebate under 87A (<= 7L) -> tax = 0
    const result = calculateSection44ADATax(1200000);
    expect(result.presumptiveTaxableIncomeINR).toBe(600000);
    expect(result.presumptiveExpenseDeductionINR).toBe(600000);
    expect(result.estimatedTaxPayableINR).toBe(0);
    expect(result.taxRebateEligible).toBe(true);
    expect(result.monthlyNetInHandINR).toBe(100000);
  });

  it('calculates stepped tax and cess for income above 14 Lakhs (taxable > 7L)', () => {
    // ₹20,00,000 gross -> 50% = ₹10,00,000 taxable.
    // Slab 3L-7L (4L * 5%) = 20k
    // Slab 7L-10L (3L * 10%) = 30k
    // Total pre-cess = 50k * 1.04 = 52k
    const result = calculateSection44ADATax(2000000);
    expect(result.presumptiveTaxableIncomeINR).toBe(1000000);
    expect(result.taxRebateEligible).toBe(false);
    expect(result.estimatedTaxPayableINR).toBe(52000);
    expect(result.effectiveTaxRatePercent).toBe(2.6);
  });

  it('computes accurate billable days needed for Earn-to-Travel ratio', () => {
    // ₹88,000 monthly income (22 days = ₹4,000/day). Trip cost = ₹20,000 -> 5 billable days needed
    const ratio = calculateEarnToTravelRatio(88000, 20000);
    expect(ratio.billableDaysNeeded).toBe(5);
    expect(ratio.billableWeeksNeeded).toBe(1);
    expect(ratio.monthlySurplusINR).toBe(68000);
    expect(ratio.savingsRatePercent).toBe(77.3);
  });
});
