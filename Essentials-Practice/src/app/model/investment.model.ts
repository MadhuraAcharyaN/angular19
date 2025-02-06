export interface Investment {
  initialInvestment: number;
  duration: number;
  expectedReturn: number;
  annualInvestment: number;
}

export interface InvestmentResult {
  annualInvestment: number;
  interest: number;
  totalAmountInvested: number;
  totalInterest: number;
  valueEndOfYear: number;
  year: number;
}
