import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cart } from '../shared/models/Cart';
import { CartItem } from '../shared/models/CartItem';
import { Food } from '../shared/models/Food';
import { Toppings } from '../shared/models/Toppings';
import { BaseApi } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class CartService extends BaseApi {
  private cart: Cart = this.getCartFromLocalStorage();
  private cartSubject: BehaviorSubject<Cart> = new BehaviorSubject(this.cart);

  addToCart(food: Food): void {
    let cartItem = this.cart.items
      .find(item => item.food.id === food.id);
    if (cartItem)
      return;

    this.cart.items.push(new CartItem(food));
    this.setCartToLocalStorage();
  }

  removeFromCart(foodId: string): void {
    this.cart.items = this.cart.items
      .filter(item => item.food.id != foodId);
    this.setCartToLocalStorage();
  }

  removeTopingFromCart(cartItem: CartItem, topping: Toppings): void {
    cartItem.food.extraToppings = cartItem.food.extraToppings
    .filter(item => item.id != topping.id);
    this.setCartToLocalStorage();
  }

  private calculateExtraTopingCharges(cartItem:CartItem) {
    let extraTopingCharges = 0;
    cartItem.food.extraToppings.forEach((top: Toppings) => {
      extraTopingCharges = extraTopingCharges + top.count * top.price;
    })
    return extraTopingCharges;
  }

  changeQuantity(foodId: string, quantity: number) {
    let cartItem = this.cart.items
      .find(item => item.food.id === foodId);
    if (!cartItem) return;

    cartItem.quantity = quantity;
   
    cartItem.extraTopingPrice =  this.calculateExtraTopingCharges(cartItem);
    cartItem.price = quantity * cartItem.food.price;
    
    this.setCartToLocalStorage();
  }

  clearCart() {
    this.cart = new Cart();
    this.setCartToLocalStorage();
  }

  getCartObservable(): Observable<Cart> {
    return this.cartSubject.asObservable();
  }

  getCurrentCart(): Cart {
    return this.cart;
  }

  private setCartToLocalStorage(): void {
    this.cart.totalPrice = this.cart.items
      .reduce((prevSum, currentItem) => prevSum + currentItem.price + this.calculateExtraTopingCharges(currentItem), 0);
    this.cart.totalCount = this.cart.items
      .reduce((prevSum, currentItem) => prevSum + currentItem.quantity, 0);

    const cartJson = JSON.stringify(this.cart);
    localStorage.setItem('Cart', cartJson);
    this.cartSubject.next(this.cart);
  }

  private getCartFromLocalStorage(): Cart {
    const cartJson = localStorage.getItem('Cart');
    return cartJson ? JSON.parse(cartJson) : new Cart();
  }

  placeOrderThroughAPI(cart:Cart): Observable<any> {
    return this.post('localhost:4202/api/order/placeOrderThroughAPI',JSON.stringify(cart));
  }
}
