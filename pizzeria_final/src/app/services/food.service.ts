import { Injectable } from '@angular/core';
import { sample_foods } from 'src/data';
import { Food } from '../shared/models/Food';
import { Cart } from '../shared/models/Cart';
import { BaseApi } from './base.service';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class FoodService extends BaseApi  {

  getAll(): Food[] {
    return sample_foods;
  }

  getAllFromAPI(): Observable<Food[]> {
    return this.get('localhost:4202/api/food/getAllAvailableFood');
  }

  getAllFoodsBySearchTerm(searchTerm: string) {
    return this.getAll().filter(food => food.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1)
  }

  getFoodFromCartById(cart: Cart, foodId: string): Food {
    return cart.items.find(cartItem => cartItem.food.id == foodId)?.food ?? new Food();
  }

}
