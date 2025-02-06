import { Component, computed, signal } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { UserComponent } from './user/user.component';
import { DUMMY_USERS } from './users';
import { JsonPipe } from '@angular/common';
import { TasksComponent } from './tasks/tasks.component';
import { User } from './model/user';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, UserComponent, JsonPipe, TasksComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  users = signal(DUMMY_USERS);
  selectedUser = signal<User | null>(null);

  onSelect(id: string): void {
    // this.selectedUser = this.users.find((user) => user.id === id)!;
    this.selectedUser.set(this.users().find((user) => user.id === id)!);
  }
}
