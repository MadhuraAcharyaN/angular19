import { Injectable, signal } from '@angular/core';
import { Investment, InvestmentResult } from '../model/investment.model';

@Injectable({
  providedIn: 'root',
})
export class InvestmentService {
  result = signal<InvestmentResult[]>([]);
  calculateInvestmentResults(data: Investment): void {
    const { initialInvestment, duration, expectedReturn, annualInvestment } =
      data;
    const annualData = [];
    let investmentValue = initialInvestment;

    for (let i = 0; i < duration; i++) {
      const year = i + 1;
      const interestEarnedInYear = investmentValue * (expectedReturn / 100);
      investmentValue += interestEarnedInYear + annualInvestment;
      const totalInterest =
        investmentValue - annualInvestment * year - initialInvestment;
      annualData.push({
        year: year,
        interest: interestEarnedInYear,
        valueEndOfYear: investmentValue,
        annualInvestment: annualInvestment,
        totalInterest: totalInterest,
        totalAmountInvested: initialInvestment + annualInvestment * year,
      });
    }
    this.result.set(annualData);
    // return annualData;
  }
}
