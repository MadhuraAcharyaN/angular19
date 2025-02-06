import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  signal,
} from '@angular/core';
import { InfoMessageComponent } from '../info-message/info-message.component';

@Component({
  selector: 'app-counter',
  standalone: true,
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css',
  imports: [InfoMessageComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CounterComponent implements OnInit {
  count = 0; //signal(0);

  // private zone = inject(NgZone);

  ngOnInit(): void {
    setTimeout(() => {
      this.count = 0; //.set(0);
    }, 4000);

    // this.zone.runOutsideAngular(() => {
    setTimeout(() => {
      console.log('timer expired');
    }, 5000);
    // });
  }

  get debugOutput() {
    console.log('[Counter] "debugOutput" binding re-evaluated.');
    return 'Counter Component Debug Output';
  }

  onDecrement() {
    this.count = this.count - 1; //.update((prevCount) => prevCount - 1);
  }

  onIncrement() {
    this.count = this.count + 1; //.update((prevCount) => prevCount + 1);
  }
}
