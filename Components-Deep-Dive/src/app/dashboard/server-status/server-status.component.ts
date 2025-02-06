import {
  Component,
  DestroyRef,
  effect,
  inject,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
@Component({
  selector: 'app-server-status',
  templateUrl: './server-status.component.html',
  styleUrl: './server-status.component.css',
  standalone: true,
})
export class ServerStatusComponent implements OnInit {
  currentStatus = signal<'online' | 'offline' | 'unknown'>('online');
  // private intervals?: ReturnType<typeof setInterval>;

  private destroyRef = inject(DestroyRef);

  constructor() {
    effect((onCleanUp) => {
      console.log(this.currentStatus());

      onCleanUp(() => {
        console.log('clean up');
      });
    });
  }
  ngOnInit(): void {
    console.log('ONINIT');
    const interval = setInterval(() => {
      const rnd = Math.random(); //0 - 0.99
      if (rnd < 0.5) {
        this.currentStatus.set('online');
      } else if (rnd < 0.9) {
        this.currentStatus.set('offline');
      } else {
        this.currentStatus.set('unknown');
      }
    }, 5000);

    this.destroyRef.onDestroy(() => {
      clearInterval(interval);
    });
  }

  // ngOnDestroy(): void {
  //   clearInterval(this.intervals);
  // }
}
