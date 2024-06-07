import { Component, OnInit } from '@angular/core';
import { CartItem } from '../../common/cart-item.model';
import { CartServiceService } from '../../services/cart-service.service';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrl: './cart-details.component.css',
})
export class CartDetailsComponent implements OnInit {
  cartItems: CartItem[] = [];
  totalQuantity: number = this.cartService.tempTotalQuantity;
  totalPrice: number = this.cartService.tempTotalPrice;
  constructor(private cartService: CartServiceService) {}
  ngOnInit(): void {
    this.loadCartItems();
  }

  loadCartItems() {
    this.cartItems = this.cartService.cartItems;
    this.cartService.totalQuantity.subscribe(
      (data) => (this.totalQuantity = data)
    );
    this.cartService.totalPrice.subscribe((data) => (this.totalPrice = data));
  }

  incrementQuantity(tempCartItem: CartItem) {
    this.cartService.addTocart(tempCartItem);
  }

  decrementQuantity(tempCartItem: CartItem) {
    this.cartService.dropItemFromCart(tempCartItem);
  }

  remove(tempCartItem: CartItem) {
    this.cartService.dropItemFromCart(tempCartItem, true);
  }
}
