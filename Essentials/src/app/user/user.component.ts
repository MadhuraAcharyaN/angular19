import {
  Component,
  EventEmitter,
  Input,
  Output,
  computed,
  input,
  output,
  signal,
} from '@angular/core';
import { DUMMY_USERS } from '../users';
import { User } from '../model/user';
import { CardComponent } from '../shared/card/card.component';

// type User = {
//   id: string,
//   avatar: string,
//   name: string
// }

// const randomIndex = Math.floor(Math.random() * DUMMY_USERS.length);

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent {
  // @Input({ required: true }) avatar!: string;
  // @Input({ required: true }) name!: string;
  // @Output() select = new EventEmitter<string>();

  // avatar = input.required<string>();
  // name = input.required<string>();
  // id = input.required<string>();
  user = input.required<User>();
  selected = input.required<boolean>();

  select = output<string>();
  // selectedUser = signal(DUMMY_USERS[randomIndex]);
  // imagePath = computed(() => 'assets/users/' + this.selectedUser().avatar);
  imagePath = computed(() => 'assets/users/' + this.user().avatar);
  // get imagePath() {
  //   return 'assets/users/' + this.avatar();
  // }

  onSelectUser() {
    // const randomIndex = Math.floor(Math.random() * DUMMY_USERS.length);
    // this.selectedUser.set(DUMMY_USERS[randomIndex]);
    //this.selectedUser = DUMMY_USERS[randomIndex];
    this.select.emit(this.user().id);
  }
}
