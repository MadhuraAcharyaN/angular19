import { Component, inject, signal } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { UserInputComponent } from './user-input/user-input.component';
import { Investment, InvestmentResult } from './model/investment.model';
import { InvestmentResultComponent } from './investment-result/investment-result.component';
import { InvestmentService } from './services/investment.service';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [HeaderComponent, UserInputComponent, InvestmentResultComponent],
})
export class AppComponent {
  // annualDate = signal<InvestmentResult[]>([]);
  //  investmentService = inject(InvestmentService);
  // calculateInvestmentResults(data: Investment) {
  //   this.annualDate.set(
  //     this.investmentService.calculateInvestmentResults(data)
  //   );
  // }
}
