import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { CustomPizzaService } from 'src/app/services/custom-pizza.service';
import { Food } from 'src/app/shared/models/Food';
import { iLeave } from 'src/app/shared/models/Ileave';
import { Toppings } from 'src/app/shared/models/Toppings';
import { PizzaBase } from 'src/app/shared/models/pizzaBase';

@Component({
  selector: 'app-custom-pizza',
  templateUrl: './custom-pizza.component.html',
  styleUrls: ['./custom-pizza.component.css']
})
export class CustomPizzaComponent implements OnInit,iLeave {
  customPizza!: Food;
  pizzaBaseOptions!: PizzaBase[];
  totalCost!: number;
  pizzaToppings!: Toppings[];
  isPristine = true;
  constructor(private customPizzaService: CustomPizzaService,
    private cartService: CartService,
    private router: Router) {
    this.createNewPizza();
  }

  createNewPizza() {
    this.customPizza = new Food();
    this.customPizza.id = Math.ceil(Math.random() * 100).toString();
    this.customPizza.pizzaBase = this.customPizzaService.getPizzaBaseFromId(parseInt(this.customPizza.id))
    this.totalCost = this.customPizzaService.updateCost(this.customPizza);
  }
  ngOnInit(): void {
    this.pizzaBaseOptions = this.customPizzaService.getPizzaBaseOption();
    this.pizzaToppings = this.customPizzaService.getPizzaToppingOptions();
  }

  canLeave(): boolean {
    return this.isPristine;
  }

  changePizzaBase(id: string) {
    const baseId = parseInt(id);
    this.customPizza.pizzaBase = this.customPizzaService.getPizzaBaseFromId(baseId);
    this.isPristine = false;
    this.totalCost = this.customPizzaService.updateCost(this.customPizza);
  }

  removeToppingFromPizza(topping: Toppings) {
    this.customPizza.extraToppings = this.customPizza.extraToppings.filter(item => item.id != topping.id);
    this.isPristine = false;
    this.totalCost = this.customPizzaService.updateCost(this.customPizza);
  }

  changeToppingQuantity(topping: Toppings, quantityInString: string) {
    const quantity = parseInt(quantityInString);
    const item = this.customPizza.extraToppings.find(item => item.id === topping.id);
    if (item)
      item.count = quantity;
    else {
      topping.count = quantity;
      this.customPizza.extraToppings.push(topping);
    }
    this.isPristine = false;
    this.totalCost = this.customPizzaService.updateCost(this.customPizza);
  }

  cancel() {
    this.router.navigateByUrl('/cart-page');
  }

  addPizzaToCart() {
    this.cartService.addToCart(this.customPizza);
    this.isPristine = true;
    this.router.navigateByUrl('/cart-page');
  }
}
