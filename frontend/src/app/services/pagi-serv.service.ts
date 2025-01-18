// pagi-serv.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../interfaces/product.model';

@Injectable({
  providedIn: 'root'
})
export class PagiServService {
  
  constructor(private http: HttpClient) { }
  private apiUrl ='http://localhost:3000/products/paginated';
  getProductsByPage(pageNumber: number, productsPerPage: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}?page=${pageNumber}&perPage=${productsPerPage}`); 
  }
}
