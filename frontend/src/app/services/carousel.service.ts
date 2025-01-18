import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../interfaces/product.model';

@Injectable({
  providedIn: 'root'
})
export class CarouselService {

  private apiUrl = 'http://localhost:3000/products/carousel';

  constructor(private http: HttpClient) {}

  getCarouselProducts(gender?: string): Observable<Product[]> {
    let url: string;
    if (gender) {
      url = `${this.apiUrl}?gender=${gender}`;
    } else {
      url = this.apiUrl;
    }
    
      return this.http.get<Product[]>(url);
  }
}
