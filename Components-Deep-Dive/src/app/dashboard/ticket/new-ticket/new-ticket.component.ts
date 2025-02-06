import {
  AfterViewInit,
  Component,
  ElementRef,
  output,
  signal,
  viewChild,
  ViewChild,
} from '@angular/core';
import { ButtonComponent } from '../../../shared/button/button.component';
import { ControlComponent } from '../../../shared/control/control.component';
import { FormsModule } from '@angular/forms';
import { Ticket } from '../../../model/ticket.model';

@Component({
  selector: 'app-new-ticket',
  standalone: true,
  imports: [ButtonComponent, ControlComponent, FormsModule],
  templateUrl: './new-ticket.component.html',
  styleUrl: './new-ticket.component.css',
})
export class NewTicketComponent implements AfterViewInit {
  // @ViewChild('form') form?: ElementRef<HTMLFormElement>;
  private form = viewChild.required<ElementRef<HTMLFormElement>>('form');

  create = output<Partial<Ticket>>();

  title = signal<string>('');
  request = signal<string>('');

  ngAfterViewInit(): void {
    console.log('AFTERVIEW INIT');
    console.log(this.form());
  }

  createNewTicket(): void {
    // console.log(titleElement);
    // console.log(requestElement);

    if (this.title() && this.request()) {
      this.create.emit({ title: this.title(), request: this.request() });
      this.form().nativeElement.reset();
    }

    // this.form?.nativeElement.reset();
  }
}
