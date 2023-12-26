import { TestBed } from '@angular/core/testing';

import { FoodService } from './food.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { sample_foods } from 'src/data';
import { Food } from '../shared/models/Food';
import { of } from 'rxjs';
import { Cart } from '../shared/models/Cart';
describe('FoodService', () => {
  let service: FoodService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(FoodService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should return sample foods from getAll()', () => {
    const result = service.getAll();
    expect(result).toEqual(sample_foods);
  });

  it('should return foods from API from getAllFromAPI()', () => {
    const mockFoods: any[] = [
      { id: '1', name: 'Pizza', price: 10 },
      { id: '2', name: 'Burger', price: 5 }
    ];

    spyOn(service, "getAllFromAPI").and.callFake(() => {
      return of(mockFoods);
    });
    service.getAllFromAPI().subscribe(foods => {
      expect(foods.length).toBe(2);
      expect(foods).toEqual(mockFoods);
    });
  });

  it('should return foods by search term from getAllFoodsBySearchTerm()', () => {
    const searchTerm = 'pepika';
    const result = service.getAllFoodsBySearchTerm(searchTerm);
    expect(result.length).toBe(1);
    expect(result[0].name).toContain(searchTerm);
  });

  it('should return food from cart by id from getFoodFromCartById()', () => {
    const mockCart: Cart = {
      "items": [
        {
          "food": {
            "id": "2",
            "name": "Soyaball",
            "price": 299,
            "imageUrl": "assets/food-2.jpg",
            "pizzaBase": {
              "name": "Normal Crust",
              "price": 49,
              "id": 1
            },
            "ingredient": [
              "Oregano",
              "Chilli flakes",
              "Sugar"
            ],
            "extraToppings": []
          },
          "quantity": 1,
          "price": 299,
          "extraTopingPrice": 299,
          "foodItem": {
            "id": "2",
            "name": "Soyaball",
            "price": 299,
            "imageUrl": "assets/food-2.jpg",
            "pizzaBase": {
              "name": "Normal Crust",
              "price": 49,
              "id": 1
            },
            "ingredient": [
              "Oregano",
              "Chilli flakes",
              "Sugar"
            ],
            "extraToppings": []
          }
        }
      ],
      "totalPrice": 0,
      "totalCount": 0
    };
    const foodId = '2';
    const result = service.getFoodFromCartById(mockCart, foodId);
    expect(result).toBeDefined();
  });

  it('should return new food if cart is empty or food id is not found from getFoodFromCartById()', () => {
    const mockCart: Cart = {
      "items": [
        {
          "food": {
            "id": "2",
            "name": "Soyaball",
            "price": 299,
            "imageUrl": "assets/food-2.jpg",
            "pizzaBase": {
              "name": "Normal Crust",
              "price": 49,
              "id": 1
            },
            "ingredient": [
              "Oregano",
              "Chilli flakes",
              "Sugar"
            ],
            "extraToppings": []
          },
          "quantity": 1,
          "price": 299,
          "extraTopingPrice": 299,
          "foodItem": {
            "id": "2",
            "name": "Soyaball",
            "price": 299,
            "imageUrl": "assets/food-2.jpg",
            "pizzaBase": {
              "name": "Normal Crust",
              "price": 49,
              "id": 1
            },
            "ingredient": [
              "Oregano",
              "Chilli flakes",
              "Sugar"
            ],
            "extraToppings": []
          }
        }
      ],
      "totalPrice": 0,
      "totalCount": 0
    };
    const foodId = '3';
    const result = service.getFoodFromCartById(mockCart, foodId);
    expect(result).toEqual(new Food());
  });
});
