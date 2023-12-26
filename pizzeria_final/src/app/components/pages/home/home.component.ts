import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { FoodService } from 'src/app/services/food.service';
import { Food } from 'src/app/shared/models/Food';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  foods: Food[] = [];
  constructor(private foodService: FoodService,
    private cartService:CartService) {

  }

  search(searchTerm:string) {
    this.foods = this.foodService.getAllFoodsBySearchTerm(searchTerm);
  }

  addToCart(food:Food){
    alert("item added in cart successfully");
    this.cartService.addToCart(food);
  }

  ngOnInit(): void {
    this.foods = this.foodService.getAll();
  }

}
