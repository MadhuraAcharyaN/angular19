import {
  Component,
  computed,
  DestroyRef,
  effect,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { interval, map, Observable, single } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  clickedCount = signal(0);
  clickCount$ = toObservable(this.clickedCount);
  destroy = inject(DestroyRef);

  // interval = signal(0);
  interval$ = interval(1000);
  intervalSignal = toSignal(this.interval$, { initialValue: 0 });
  // doubleInterval = computed(() => this.interval() * 2);

  customInterval$ = new Observable((subscriber) => {
    let count = 0;
    const i = setInterval(() => {
      // subscriber.error();
      if (count > 3) {
        clearInterval(i);
        subscriber.complete();
        return;
      }
      console.log('Emitting new value...');
      subscriber.next({ message: `New Value ${count}` });
      count++;
    }, 2000);
  });

  constructor() {
    // effect(() => {
    //   console.log('Clicked button ' + this.clickedCount() + ' times');
    // });
    // toObservable(this.clickedCount)
  }

  ngOnInit(): void {
    this.customInterval$.subscribe({
      next: (val) => console.log(val),
      complete: () => console.log('completed'),
      error: () => console.log('error'),
    });
    // setInterval(() => {
    //   this.interval.update((pre) => pre + 1);
    // }, 100);

    this.clickCount$.subscribe({
      next: (v) => console.log(v),
    });
    // const first$ = interval(1000).pipe(map((i) => i * 2));
    // const f = first$.subscribe({
    //   next: (i) => console.log(i),
    //   complete: () => console.log('completed'),
    //   error: (e) => console.log(e),
    // });
    // this.destroy.onDestroy(() => {
    //   f.unsubscribe();
    // });
  }

  onClick() {
    this.clickedCount.update((pre) => pre + 1);
  }
}
