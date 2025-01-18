import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../../interfaces/product.model';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) { }
  private apiUrl: string = 'http://localhost:3000/products/suggestions';

  getSuggestions(query: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}?query=${query}`);
  }
}
