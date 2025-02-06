import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { debounceTime, delay, Observable, of } from 'rxjs';

// custom validation
function mustContainQuestionMark(control: AbstractControl) {
  if (control.value.includes('?')) {
    return null;
  }
  return { doesNotCOntainQuestionMark: true };
}

function isEmailExists(control: AbstractControl) {
  if (control.value !== 'test@gmail.com') {
    return of(null);
  }
  return of({ emailExists: true }).pipe(delay(10000));
}

const email = window.localStorage.getItem('email') || '';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [ReactiveFormsModule],
})
export class LoginComponent implements OnInit {
  destroyRef = inject(DestroyRef);

  loginForm = new FormGroup({
    email: new FormControl(email, {
      validators: [Validators.email, Validators.required],
      asyncValidators: [isEmailExists],
    }),
    password: new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(6),
        mustContainQuestionMark,
      ],
    }),
  });

  ngOnInit(): void {
    // const email = window.localStorage.getItem('email');
    // if (email) {
    //   this.loginForm.patchValue({ email });
    // }

    const subscription = this.loginForm.controls.email.valueChanges
      .pipe(debounceTime(500))
      ?.subscribe({
        next: (email) => window.localStorage.setItem('email', email!),
      });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  onSubmit(): void {
    console.log(this.loginForm);
    const { email, password } = this.loginForm.value;
    console.log(email, password);
  }

  get emailIsInvalid() {
    return (
      this.loginForm.controls.email.touched &&
      this.loginForm.controls.email.dirty &&
      this.loginForm.controls.email.invalid
    );
  }
  get passwordIsInvalid() {
    return (
      this.loginForm.controls.password.touched &&
      this.loginForm.controls.password.dirty &&
      this.loginForm.controls.password.invalid
    );
  }
}
