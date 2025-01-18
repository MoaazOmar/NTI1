import { Component } from '@angular/core';
import { CartService } from '../services/cart-service.service'; // Import the service

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  item = { productID: '123', amount: 2, name: 'Product A', price: 20 };
cartItems: any;

  constructor(private cartService: CartService) {}

  addItemToCart() {
    this.cartService.addItemToCart(this.item).subscribe(
      response => {
        console.log('Item added to cart', response);
      },
      error => {
        console.error('Error adding item to cart', error);
      }
    );
  }
}
