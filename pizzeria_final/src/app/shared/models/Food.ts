import { Toppings } from "./Toppings";
import { PizzaBase } from "./pizzaBase";

export class Food {
  id!: string;
  name: string= 'custom pizza';
  price: number = 99;
  imageUrl: string = 'assets/defaultBase.jpg';
  pizzaBase!:PizzaBase;
  ingredient: string[] = [];
  extraToppings: Toppings[] = [];
}
