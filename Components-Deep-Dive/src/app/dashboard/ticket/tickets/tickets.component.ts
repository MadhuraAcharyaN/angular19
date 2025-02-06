import { Component, input, output, signal } from '@angular/core';
import { Ticket } from '../../../model/ticket.model';

@Component({
  selector: 'app-tickets',
  standalone: true,
  imports: [],
  templateUrl: './tickets.component.html',
  styleUrl: './tickets.component.css',
})
export class TicketsComponent {
  ticket = input.required<Ticket>({ alias: 'data' });
  close = output<string>();

  detailsVisible = signal(false);

  onToggleDetails(): void {
    this.detailsVisible.update((visible) => !visible);
  }

  onClose(): void {
    this.close.emit(this.ticket().id);
  }
}
