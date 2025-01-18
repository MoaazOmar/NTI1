import { Component, OnInit } from '@angular/core';
import { HomeProductsService } from '../../services/home-products.service';
import { Product } from '../../../interfaces/product.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-home',
  templateUrl: './product-home.component.html',
  styleUrls: ['./product-home.component.css'],
})
export class ProductHomeComponent implements OnInit {
  products: Product[] = [];
  selectedCategory: string = 'all';
  limit: number = 3;
  skip: number = 0;
  isLoading: boolean = false;

  constructor(
    private homeProductsService: HomeProductsService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(gender: string = this.selectedCategory): void {
    this.isLoading = true;
    this.homeProductsService.getProducts(gender, this.limit, this.skip).subscribe({
      next: (response) => {
        if (response.products.length > 0) {
          this.products = [
            ...this.products,
            ...response.products.map((product) => ({
              ...product,
              image: `http://localhost:3000/images/${product.image}`,
              amount: 1, 
            })),
          ];
        } else {
          console.log('No more products available.');
        }
      },
      error: (err) => {
        console.error('Error fetching products:', err);
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }
  
  isHot(index: number): boolean {
    return index >= this.products.length - 6;
  }

  // Filtering the products
  selectCategory(category: string): void {
    this.selectedCategory = category;
  }

  applyFilter(event: Event): void {
    event.preventDefault();
    this.router.navigate([], {
      queryParams: { gender: this.selectedCategory },
      queryParamsHandling: 'merge', // Keeps existing query params
    });

    this.resetProducts();
  }

  // Reset pagination
  resetProducts(): void {
    this.products = [];
    this.skip = 0;
    this.loadProducts(this.selectedCategory);
  }

  // Pagination
  loadMore(): void {
    this.skip += this.limit;
    this.loadProducts(this.selectedCategory);
  }

  // Add to Cart/Bag
  addToCart(product: Product): void {
    const cartItem = {
      name: product.name,
      price: product.price,
      productID: product._id, 
      amount: product.amount || 1,
    };
    console.log(cartItem); 
    // This should now log the cart item to the console
    // Add further logic to handle the cart item, e.g., adding it to a cart service
}    
  //   this.cartService.addToCart(cartItem).subscribe(
  //     () => {
  //       alert('Product added to cart!');
  //     },
  //     (error) => {
  //       console.error('Failed to add product to cart:', error);
  //     }
  //   );
  // }
  }