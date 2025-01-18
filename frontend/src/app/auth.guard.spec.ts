import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SignupService } from './services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: SignupService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isLogged()) {
      return true; 
    } else {
      this.router.navigate(['/login']); 
      return false; 
    }
  }
}