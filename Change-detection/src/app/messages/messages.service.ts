import { Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  //   messages: string[] = []; //signal<string[]>([]);
  private messages = signal<string[]>([]);
  //   messages$ = new BehaviorSubject<string[]>([]);

  allMessages = this.messages.asReadonly();

  addMessage(message: string) {
    // this.messages = [...this.messages, message];
    // this.messages$.next(this.messages);
    this.messages.update((pre) => [...pre, message]);
  }
}
