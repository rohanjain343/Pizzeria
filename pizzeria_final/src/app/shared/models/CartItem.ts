import { Food } from "./Food";

export class CartItem{
  constructor(public food:Food){ }
  quantity:number = 1 ;
  price: number = this.food.price;
  extraTopingPrice: number = this.food.price;
  foodItem:Food = this.food;
}
