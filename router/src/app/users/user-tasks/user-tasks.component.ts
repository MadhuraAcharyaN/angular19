import {
  Component,
  computed,
  DestroyRef,
  inject,
  input,
  OnInit,
} from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Params,
  ResolveFn,
  RouterLink,
  RouterOutlet,
  RouterStateSnapshot,
} from '@angular/router';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
  imports: [RouterOutlet, RouterLink],
})
export class UserTasksComponent implements OnInit {
  private userService = inject(UsersService);

  // userId = input.required<string>();
  message = input.required<string>();
  userName = input.required<string>();

  private activatedRoute = inject(ActivatedRoute);
  private destoryRef = inject(DestroyRef);

  // user = computed(() =>
  //   this.userService.users.find((user) => user.id === this.userId())
  // );

  // userName: string = '';

  ngOnInit(): void {
    console.log(this.activatedRoute.snapshot, this.message());

    // this.activatedRoute.data.subscribe((data) => {
    //   console.log(data);
    // });
    // const subscription = this.activatedRoute.paramMap.subscribe({
    //   next: (params) => {
    //     this.userName =
    //       this.userService.users.find(
    //         (user) => user.id === params.get('userId')
    //       )?.name ?? '';
    //   },
    // });

    // this.destoryRef.onDestroy(() => subscription.unsubscribe());
  }
}

export const resolveUserName: ResolveFn<string> = (
  activateRoute: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const userService = inject(UsersService);
  const userName =
    userService.users.find(
      (user) => user.id === activateRoute.paramMap.get('userId')
    )?.name ?? '';
  return userName;
};

export const resolveTitle: ResolveFn<string> = (
  activateRoute: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  return resolveUserName(activateRoute, state) + "'s Tasks";
};
