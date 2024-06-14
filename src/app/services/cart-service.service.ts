import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item.model';
import { Product } from '../common/product';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartServiceService {
  cartItems: CartItem[] = [];
  tempTotalPrice: number = 0;
  tempTotalQuantity: number = 0;
  totalPrice = new BehaviorSubject<number>(0);
  totalQuantity = new BehaviorSubject<number>(0);
  constructor() {}

  addTocart(cartItem: CartItem) {
    const indexOfCartItem = this.cartItems.findIndex(
      (tempCartItem) => tempCartItem.id === cartItem.id
    );
    if (indexOfCartItem == -1) {
      this.cartItems.push(cartItem);
    } else {
      this.cartItems[indexOfCartItem].quantity += 1;
    }
    this.updateTotalPriceAndTotalQuantity(cartItem);
  }

  updateTotalPriceAndTotalQuantity(
    cartItem: CartItem,
    isAdd: Boolean = true,
    isRemove: Boolean = false
  ) {
    if (isRemove) {
      this.tempTotalQuantity -= cartItem.quantity;
      this.tempTotalPrice -= cartItem.quantity * cartItem.unitPrice;
    } else if (isAdd) {
      this.tempTotalQuantity += 1;
      this.tempTotalPrice += cartItem.unitPrice;
    } else {
      this.tempTotalQuantity--;
      this.tempTotalPrice -= cartItem.unitPrice;
    }
    this.totalPrice.next(this.tempTotalPrice);
    this.totalQuantity.next(this.tempTotalQuantity);
  }

  resetCart(){
    this.cartItems = [];
    this.tempTotalPrice = 0;
    this.tempTotalQuantity = 0;
    this.totalPrice.next(0);
    this.totalQuantity.next(0);
  }

  dropItemFromCart(cartItem: CartItem, isRemove: Boolean = false) {
    const indexOfCartItem = this.cartItems.findIndex(
      (tempCartItem) => tempCartItem.id === cartItem.id
    );
    if (isRemove) {
      this.cartItems.splice(indexOfCartItem, 1);
      this.updateTotalPriceAndTotalQuantity(cartItem, undefined, true);
      return;
    }
    if (this.cartItems[indexOfCartItem].quantity == 1) {
      this.cartItems.splice(indexOfCartItem, 1);
    } else {
      this.cartItems[indexOfCartItem].quantity--;
    }
    this.updateTotalPriceAndTotalQuantity(cartItem, false);
  }
}
