import { Component } from '@angular/core';
import { SignupService } from '../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  credentials = {
    username: '',
    password: ''
  };

  errorMessage = '';
  successMessage = '';

  constructor(private authService: SignupService, private router: Router) {}


  onSubmit() {
    this.authService.login(this.credentials).subscribe(
      (response: any) => {
        this.successMessage = 'Logged in successfully!';
        this.errorMessage = '';
  
        this.authService.setLoggedIn(true);
  
        this.router.navigate(['/cart']); 
      },
      (error: any) => {
        this.errorMessage = error.error?.error || 'Login failed. Please try again.';
        this.successMessage = '';
      }
    );
  }
  logout() {
    this.authService.logout().subscribe(
      () => {
        this.authService.clearLoggedIn();
  
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Logout failed:', error);
      }
    );
  }
  
}