import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Cart } from 'src/app/shared/models/Cart';
import { CartItem } from 'src/app/shared/models/CartItem';
import { Toppings } from 'src/app/shared/models/Toppings';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {
  cart!: Cart;
  constructor(private cartService: CartService) {
   
  }

  ngOnInit(): void {
    this.cartService.getCartObservable().subscribe((cart) => {
      this.cart = cart;
    })
  }

  removeFromCart(cartItem: CartItem) {
    this.cartService.removeFromCart(cartItem.food.id);
  }

  removeToppingFromPizza(cartItem: CartItem, topping: Toppings) {
    this.cartService.removeTopingFromCart(cartItem, topping)
  }

  changeQuantity(cartItem: CartItem, quantityInString: string) {
    const quantity = parseInt(quantityInString);
    this.cartService.changeQuantity(cartItem.food.id, quantity);
  }

  changeToppingQuantity(cartItem: CartItem, topping: Toppings, quantityInString: string) {
    const quantity = parseInt(quantityInString);
    const item = cartItem?.food?.extraToppings.find(item => item.id === topping.id);
    if (item)
      item.count = quantity;
    this.cartService.changeQuantity(cartItem.food.id, cartItem.quantity)
  }

}
