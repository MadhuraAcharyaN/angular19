import { Component, computed, inject, input, signal } from '@angular/core';
import { InvestmentResult } from '../model/investment.model';
import { CurrencyPipe } from '@angular/common';
import { InvestmentService } from '../services/investment.service';
import { single } from 'rxjs';

@Component({
  selector: 'app-investment-result',
  templateUrl: './investment-result.component.html',
  styleUrl: './investment-result.component.css',
  standalone: true,
  imports: [CurrencyPipe],
})
export class InvestmentResultComponent {
  // investmentResult = input.required<InvestmentResult[]>();

  investmentService = inject(InvestmentService);

  result = computed(() => this.investmentService.result());
}
