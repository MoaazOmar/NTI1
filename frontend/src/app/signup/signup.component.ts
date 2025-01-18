import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignupService } from '../services/auth/auth.service';
import {  passwordsMatchValidator } from './customValidators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private authService: SignupService, private router: Router) {
    this.signupForm = new FormGroup({
      username: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', Validators.required)
    }, { validators: passwordsMatchValidator });
  }

  onSubmit() {
    if (this.signupForm.valid) {
      const { username, email, password } = this.signupForm.value;

      this.authService.signup({ username, email, password, confirmPassword: password }).subscribe(
        (_response: any) => {
          this.successMessage = 'Signup successful! Redirecting to login...';
          this.errorMessage = '';

          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2000);
        },
        (error: { error: { error: string } }) => {
          this.errorMessage = error.error.error || 'Signup failed. Please try again.';
          this.successMessage = '';
        }
      );
    } else {
      this.errorMessage = 'Please ensure all fields are correctly filled out.';
      this.successMessage = '';
    }
  }
}
