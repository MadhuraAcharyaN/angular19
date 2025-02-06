import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ContentChild,
  ElementRef,
  HostBinding,
  HostListener,
  ViewEncapsulation,
  afterNextRender,
  afterRender,
  contentChild,
  inject,
  input,
} from '@angular/core';

@Component({
  selector: 'app-control',
  standalone: true,
  imports: [],
  templateUrl: './control.component.html',
  styleUrl: './control.component.css',
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'control',
    '(click)': 'onClick()',
  },
})
export class ControlComponent implements AfterContentInit {
  // @HostBinding('class') className = 'control';

  label = input.required<string>();
  private el = inject(ElementRef);

  // @ContentChild('input') private control?: ElementRef<
  //   HTMLInputElement | HTMLTextAreaElement
  // >;

  private control =
    contentChild<ElementRef<HTMLInputElement | HTMLTextAreaElement>>('input');

  constructor() {
    afterRender(() => {
      console.log('AFTER RENDER');
    });

    afterNextRender(() => {
      console.log('AFTER NEXT RENDER');
    });
  }

  ngAfterContentInit(): void {
    console.log('AFTER CONTENT INIT');
    console.log(this.control());
  }

  // @HostListener('click')
  onClick() {
    console.log('click');
    console.log(this.control());
  }
}
