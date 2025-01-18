import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../interfaces/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsShoppingService {

  constructor(private http:HttpClient) { }
  private apiUrl = 'http://localhost:3000/products/gender-paginated';
  getPaginatedProducts(gender: string = '', page: number, pageSize: number): Observable<any> { 
    return this.http.get<any>(`${this.apiUrl}?gender=${gender}&page=${page}&pageSize=${pageSize}`);
  }
}