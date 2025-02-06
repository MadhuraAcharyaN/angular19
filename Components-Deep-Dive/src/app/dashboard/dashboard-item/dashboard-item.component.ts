import { Component, input, signal } from '@angular/core';

@Component({
  selector: 'app-dashboard-item',
  templateUrl: './dashboard-item.component.html',
  styleUrl: './dashboard-item.component.css',
  standalone: true,
  // host: {
  //   class: 'dashboard-item',
  // },
})
export class DashboardItemComponent {
  img = input.required<string>();
  title = input.required<string>();
}
