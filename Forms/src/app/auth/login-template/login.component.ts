// import {
//   afterNextRender,
//   Component,
//   DestroyRef,
//   inject,
//   viewChild,
// } from '@angular/core';
// import { FormsModule, NgForm } from '@angular/forms';
// import { debounceTime } from 'rxjs';

// @Component({
//   selector: 'app-login',
//   standalone: true,
//   templateUrl: './login.component.html',
//   styleUrl: './login.component.css',
//   imports: [FormsModule],
// })
// export class LoginComponent {
//   private form = viewChild.required<NgForm>('form');
//   private destroyRef = inject(DestroyRef);

//   constructor() {
//     afterNextRender(() => {
//       const email = window.localStorage.getItem('saved-login-form');

//       if (email) {
//         //controls is not created in template driven form
//         setTimeout(() => {
//           this.form().controls['email'].setValue(email);
//         }, 1);
//       }

//       const subscription = this.form()
//         .valueChanges?.pipe(debounceTime(500))
//         .subscribe({
//           next: (value) => {
//             console.log(value.email);
//             window.localStorage.setItem('saved-login-form', value.email);
//           },
//         });
//       this.destroyRef.onDestroy(() => subscription?.unsubscribe());
//     });
//   }
//   onSubmit(form: NgForm): void {
//     if (!form.form.valid) {
//       return;
//     }
//     console.log(form.value);

//     form.reset();
//   }
// }
