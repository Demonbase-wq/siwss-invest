export function calculateGrowth(
  depositAmount: number,
  percentageIncrease: number,
  weeks: number
) {
  const growth = depositAmount * (1 + (percentageIncrease / 100) * weeks);
  return growth;
}

export interface Investment {
  name: string;
  amount: number;
  startDate: Date;
  endDate: Date;
  currentProfit: number;
  profitPercentage: number;
}

export interface InvestmentPlan {
  name: string;
  minDeposit: number;
  maxDeposit: number;
  duration: number;
  estimatedROI: number;
  features: string[];
}

