// combined-products.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, switchMap } from 'rxjs';
import { Product } from '../../interfaces/product.model';

@Injectable({
  providedIn: 'root'
})
export class CombinedProductsService {
  private carouselApiUrl = 'http://localhost:3000/products/carousel';
  private paginatedApiUrl = 'http://localhost:3000/products/gender-paginated';

  constructor(private http: HttpClient) {}

  getCombinedProducts(gender: string, page: number, pageSize: number): Observable<any> {
    const carouselUrl = `${this.carouselApiUrl}?gender=${gender}`;
    const paginatedUrl = `${this.paginatedApiUrl}?gender=${gender}&page=${page}&pageSize=${pageSize}`; // Ensure pageSize is included
  
    return this.http.get<any>(carouselUrl).pipe(
      switchMap((carouselProducts: any) => {
        return this.http.get<any>(paginatedUrl).pipe(
          map((paginatedProducts: any) => {
            return { carouselProducts, paginatedProducts };
          })
        );
      })
    );
  }}