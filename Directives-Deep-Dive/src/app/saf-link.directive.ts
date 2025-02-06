import { Directive, ElementRef, inject, input } from '@angular/core';
import { LogDirective } from './log.directive';

@Directive({
  selector: 'a[appSafeLink]',
  standalone: true,
  host: {
    '(click)': 'onConfirmLeavePage($event)',
  },
  hostDirectives: [LogDirective],
})
export class SafeLinkDirective {
  queryParams = input('myApp', { alias: 'appSafeLink' });

  private hostEl = inject<ElementRef<HTMLAnchorElement>>(ElementRef);

  constructor() {
    console.log('Directive is active');
  }

  onConfirmLeavePage(event: MouseEvent) {
    const leave = window.confirm('Do you want to leave the app ?');
    if (leave) {
      const address = this.hostEl.nativeElement.href;
      this.hostEl.nativeElement.href = address + this.queryParams();
      return;
    }
    event?.preventDefault();
  }
}
