import { Component, OnInit } from '@angular/core';
import { PagiServService } from '../../services/pagi-serv.service';
import { Product } from '../../../interfaces/product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
addToCart(product:any) {
console.log(product)
}
  selectedCategory: string = 'all';
  products: Product[] = [];
  currentPage: number = 1;
  totalPages: number[] = [];
  productsPerPage: number = 2;
  searchTerm: string = ''; // Add this line

  constructor(private pagiServService: PagiServService) {}

  ngOnInit(): void {
    this.loadProducts(this.currentPage);
  }

  loadProducts(page: number): void {
    this.pagiServService.getProductsByPage(page, this.productsPerPage).subscribe(
      (products) => {
        this.products = products.map(product => ({
          ...product,
          image: `http://localhost:3000/images/${product.image}`
        }));
        this.totalPages = Array.from({ length: Math.ceil(products.length / this.productsPerPage) }, (_, i) => i + 1);
      },
      (error) => { console.error('Error fetching products:', error); }
    );
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages.length) {
      this.currentPage = page;
      this.loadProducts(page);
    }
  }
}