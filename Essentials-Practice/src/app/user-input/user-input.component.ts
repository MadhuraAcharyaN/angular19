import { Component, inject, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Investment } from '../model/investment.model';
import { InvestmentService } from '../services/investment.service';

@Component({
  selector: 'app-user-input',
  templateUrl: './user-input.component.html',
  styleUrl: './user-input.component.css',
  standalone: true,
  imports: [FormsModule],
})
export class UserInputComponent {
  //   calculate = output<Investment>();

  initialInvestment = signal<number>(0);
  annualInvestment = signal<number>(0);
  expectedReturn = signal<number>(5);
  duration = signal<number>(10);

  investmentService = inject(InvestmentService);

  onSubmit(): void {
    // this.calculate.emit({
    //   initialInvestment: +this.initialInvestment(),
    //   annualInvestment: +this.annualInvestment(),
    //   expectedReturn: +this.expectedReturn(),
    //   duration: +this.duration(),
    // });
    this.investmentService.calculateInvestmentResults({
      initialInvestment: +this.initialInvestment(),
      annualInvestment: +this.annualInvestment(),
      expectedReturn: +this.expectedReturn(),
      duration: +this.duration(),
    });
    this.initialInvestment.set(0);
    this.annualInvestment.set(0);
    this.expectedReturn.set(5);
    this.duration.set(10);
  }
}
