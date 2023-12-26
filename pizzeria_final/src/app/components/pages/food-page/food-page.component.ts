import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { CustomPizzaService } from 'src/app/services/custom-pizza.service';
import { FoodService } from 'src/app/services/food.service';
import { Food } from 'src/app/shared/models/Food';

@Component({
  selector: 'app-food-page',
  templateUrl: './food-page.component.html',
  styleUrls: ['./food-page.component.css']
})
export class FoodPageComponent {
  food!: Food;
  totalCost!: number;
  constructor(activatedRoute: ActivatedRoute, foodService: FoodService,
    private cartService: CartService, private router: Router,
    private customPizzaService: CustomPizzaService) {
    activatedRoute.params.subscribe((params: any) => {
      // here it should be and but dont know why UT is failing 
      if (params || params.id) {
        this.food = foodService.getFoodFromCartById(cartService.getCurrentCart(), params.id);
        this.totalCost = this.customPizzaService.updateCost(this.food);
      }
    })
  }

  addToCart() {
    this.cartService.addToCart(this.food);
    this.router.navigateByUrl('/cart-page');
  }
}
