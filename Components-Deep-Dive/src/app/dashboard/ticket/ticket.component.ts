import { Component, signal } from '@angular/core';
import { NewTicketComponent } from './new-ticket/new-ticket.component';
import { Ticket } from '../../model/ticket.model';
import { TicketsComponent } from './tickets/tickets.component';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.css',
  standalone: true,
  imports: [NewTicketComponent, TicketsComponent],
})
export class TicketComponent {
  tickets = signal<Ticket[]>([]);

  onAddNewTicket(ticket: Partial<Ticket>): void {
    const newTicket: Ticket = {
      title: ticket.title!,
      request: ticket.request!,
      id: Math.random().toString(),
      status: 'open',
    };
    this.tickets.update((tickets) => [...tickets, newTicket]);
    // this.tickets.push(newTicket);
  }

  onCloseTicket(id: string): void {
    this.tickets.update((tickets) => {
      return tickets.map((t) => {
        return {
          ...t,
          status: t.id === id ? 'closed' : t.status,
        };
      });
    });
  }
}
