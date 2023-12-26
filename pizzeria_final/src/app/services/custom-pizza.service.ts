import { Injectable } from '@angular/core';
import { pizzaBases, toppings } from 'src/data';
import { PizzaBase } from '../shared/models/pizzaBase';
import { Toppings } from '../shared/models/Toppings';
import { Food } from '../shared/models/Food';
import { BaseApi } from './base.service';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class CustomPizzaService extends BaseApi {

  getPizzaBaseOptionFromAPI(): Observable<PizzaBase[]> {
    return this.get('localhost:4202/api/food/getPizzaBaseOption');
  }

  getPizzaToppingOptionsFromAPI(): Observable<Toppings[]> {
    return this.get('localhost:4202/api/food/getPizzaToppingOptions');
  }

  getPizzaBaseOption() {
    return pizzaBases;
  }

  getPizzaToppingOptions() {
    return toppings
  }

  getPizzaBaseFromId(id: number): PizzaBase {
    return pizzaBases.find(base => base.id === id) ?? pizzaBases[0];
  }

  updateCost(customPizza: Food): number {
    let extraTopingCharges = 0;
    customPizza.extraToppings.forEach((top: Toppings) => {
      extraTopingCharges = extraTopingCharges + top.count * top.price;
    })
    return customPizza.price + extraTopingCharges + customPizza.pizzaBase.price;
  }
}
