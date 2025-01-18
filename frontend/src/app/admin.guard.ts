import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './services/auth/auth.service'; // Adjust the path as necessary

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const isAdmin = this.authService.isAdminUser();

    if (!isAdmin) {
      this.router.navigate(['/']); 
      return false;
    }
    return true;
  }
}