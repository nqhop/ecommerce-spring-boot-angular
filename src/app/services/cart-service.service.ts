import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item.model';
import { Product } from '../common/product';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartServiceService {
  cartItems: CartItem[] = [];
  tempTotalPrice: number = 0;
  tempTotalQuantity: number = 0;
  totalPrice = new Subject<number>();
  totalQuantity = new Subject<number>();
  constructor() {}

  addTocart(product: Product) {
    const indexOfCartItem = this.cartItems.findIndex(
      (cartItem) => cartItem.id === product.id
    );
    if (indexOfCartItem == -1) {
      this.cartItems.push(new CartItem(product));
    } else {
      this.cartItems[indexOfCartItem].quantity += 1;
    }
    this.tempTotalQuantity += 1;
    this.tempTotalPrice += product.unitPrice;
    this.totalPrice.next(this.tempTotalPrice);
    this.totalQuantity.next(this.tempTotalQuantity);
  }
}
