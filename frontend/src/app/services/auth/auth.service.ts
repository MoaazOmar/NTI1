import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Signup, login } from '../../../interfaces/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUri = 'http://localhost:3000';
  private isLoggedIn = false; 
  public isAdmin = false; // Ensure isAdmin is public

  constructor(private http: HttpClient) {
    this.isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
    this.isAdmin = sessionStorage.getItem('isAdmin') === 'true'; 
  }

  signup(userData: Signup): Observable<Signup> {
    return this.http.post<Signup>(`${this.apiUri}/signup`, userData, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    });
  }

  login(credentials: login): Observable<any> {
    return this.http.post<any>(`${this.apiUri}/login`, credentials, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    });
  }

  logout(): Observable<any> {
    return this.http.get(`${this.apiUri}/logout`);
  }

  isLogged(): boolean {
    return this.isLoggedIn;
  }

  setLoggedIn(value: boolean, isAdmin: boolean = false): void {
    this.isLoggedIn = value;
    this.isAdmin = isAdmin;
    sessionStorage.setItem('isLoggedIn', value.toString());
    sessionStorage.setItem('isAdmin', isAdmin.toString()); 
  }

  clearLoggedIn(): void {
    this.isLoggedIn = false;
    this.isAdmin = false; 
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('isAdmin'); 
  }

  isAdminUser(): boolean { 
    return this.isAdmin; 
  }  
}
