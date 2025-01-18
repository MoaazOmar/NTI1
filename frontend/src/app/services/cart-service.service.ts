import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = 'http://localhost:3000/cart'; 

  constructor(private httpClient: HttpClient) {}

  addItemToCart(data: any): Observable<any> {
    return this.httpClient.post(this.apiUrl, data, { withCredentials: true });
  }
  getCartItems(): Observable<any> {
    return this.httpClient.get(this.apiUrl);
  }

}
