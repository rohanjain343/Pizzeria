
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { CustomPizzaService } from 'src/app/services/custom-pizza.service';
import { FoodService } from 'src/app/services/food.service';
import { Food } from 'src/app/shared/models/Food';
import { FoodPageComponent } from './food-page.component';
import { NotFoundComponent } from '../../partials/not-found/not-found.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('FoodPageComponent', () => {
  let component: FoodPageComponent;
  let fixture: ComponentFixture<FoodPageComponent>;
  let activatedRoute: ActivatedRoute;
  let foodService: FoodService;
  let cartService: CartService;
  let customPizzaService: CustomPizzaService;
  let router: Router;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FoodPageComponent ,NotFoundComponent],
      imports: [RouterTestingModule,HttpClientTestingModule],
      providers: [
        FoodService,
        CartService,
        CustomPizzaService,
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: '1' })
          }
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodPageComponent);
    component = fixture.componentInstance;
    activatedRoute = TestBed.inject(ActivatedRoute);
    foodService = TestBed.inject(FoodService);
    cartService = TestBed.inject(CartService);
    customPizzaService = TestBed.inject(CustomPizzaService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add food to cart service and navigate to cart page on addToCart', () => {
    spyOn(cartService, 'addToCart');
    spyOn(router, 'navigateByUrl');
    component.addToCart();
    expect(cartService.addToCart).toHaveBeenCalledWith(component.food);
    expect(router.navigateByUrl).toHaveBeenCalledWith('/cart-page');
  });
});
