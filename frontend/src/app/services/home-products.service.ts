import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../../interfaces/product.model';
@Injectable({
  providedIn: 'root'
})
export class HomeProductsService {

  constructor(private _http: HttpClient) { }
  private apiUrl = 'http://localhost:3000';
  getProducts(gender: string = '', limit: number = 3, skip: number = 0): Observable<{ products: Product[] }> {
    let url = `${this.apiUrl}/?limit=${limit}&skip=${skip}`;
    if (gender) {
      url += `&gender=${gender}`;
    }
    return this._http.get<{ products: Product[] }>(url, { withCredentials: true });
  }
  
  getProductById(id: string): Observable<Product> {
    return this._http.get<any>(`${this.apiUrl}/product/${id}`);
  }
}
