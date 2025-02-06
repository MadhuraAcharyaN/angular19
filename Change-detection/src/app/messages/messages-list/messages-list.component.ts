import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  computed,
  DestroyRef,
  inject,
  input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { MessageService } from '../messages.service';
import { AsyncPipe } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-messages-list',
  standalone: true,
  templateUrl: './messages-list.component.html',
  styleUrl: './messages-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AsyncPipe],
})
export class MessagesListComponent {
  // messages = input.required<string[]>();
  // private cd = inject(ChangeDetectorRef);
  private messageService = inject(MessageService);
  // private destoryRef = inject(DestroyRef);
  // messages$ = this.messageService.messages$;
  // messages: string[] = [];

  // ngOnInit(): void {
  //   // const destroy$ = new Subject<void>();
  //   // this.messageService.messages$.pipe(takeUntil(destroy$)).subscribe((m) => {
  //   //   this.messages = m;
  //   //   this.cd.markForCheck();
  //   // });
  //   // this.destoryRef.onDestroy(() => {
  //   //   destroy$.next();
  //   //   destroy$.complete();
  //   // });
  // }

  messages = this.messageService.allMessages;

  // get messages() {
  //   return this.messageService.messages;
  // }

  get debugOutput() {
    console.log('[MessagesList] "debugOutput" binding re-evaluated.');
    return 'MessagesList Component Debug Output';
  }
}
