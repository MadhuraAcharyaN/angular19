import { Component } from '@angular/core';
import { ServerStatusComponent } from './server-status/server-status.component';
import { TrafficComponent } from './traffic/traffic.component';
import { TicketComponent } from './ticket/ticket.component';
import { DashboardItemComponent } from './dashboard-item/dashboard-item.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  standalone: true,
  imports: [
    ServerStatusComponent,
    TrafficComponent,
    TicketComponent,
    DashboardItemComponent,
  ],
})
export class DashboardComponent {}
