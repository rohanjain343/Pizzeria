import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CartService } from 'src/app/services/cart.service';
import { FoodService } from 'src/app/services/food.service';
import { Food } from 'src/app/shared/models/Food';
import { HomeComponent } from './home.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NotFoundComponent } from '../../partials/not-found/not-found.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let foodService: FoodService;
  let cartService: CartService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [HomeComponent,NotFoundComponent],
      providers: [FoodService, CartService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    foodService = TestBed.inject(FoodService);
    cartService = TestBed.inject(CartService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get all foods from food service on init', () => {
    spyOn(foodService, 'getAll').and.returnValue([]);
    component.ngOnInit();
    expect(foodService.getAll).toHaveBeenCalled();
    expect(component.foods).toEqual([]);
  });

  it('should get foods by search term from food service on search', () => {
    spyOn(foodService, 'getAllFoodsBySearchTerm').and.returnValue([]);
    const searchTerm = 'pizza';
    component.search(searchTerm);
    expect(foodService.getAllFoodsBySearchTerm).toHaveBeenCalledWith(searchTerm);
    expect(component.foods).toEqual([]);
  });

  it('should add food to cart service on addToCart', () => {
    spyOn(cartService, 'addToCart');
    spyOn(window, 'alert');
    const mockFood: Food = {
      id: '1',
      name: 'Pizza',
      price: 10,
      imageUrl: 'assets/food-1.jpg',
      pizzaBase: { name: 'Normal Crust', price: 49, id: 1 },
      ingredient: [],
      extraToppings: []
    };
    component.addToCart(mockFood);
    expect(cartService.addToCart).toHaveBeenCalledWith(mockFood);
    expect(window.alert).toHaveBeenCalledWith('item added in cart successfully');
  });
});
