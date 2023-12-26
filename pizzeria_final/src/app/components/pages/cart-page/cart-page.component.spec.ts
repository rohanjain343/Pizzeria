import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { Cart } from 'src/app/shared/models/Cart';
import { CartItem } from 'src/app/shared/models/CartItem';
import { Toppings } from 'src/app/shared/models/Toppings';
import { CartPageComponent } from './cart-page.component';
import { NotFoundComponent } from '../../partials/not-found/not-found.component';
import { TitleComponent } from '../../partials/title/title.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('CartPageComponent', () => {
  let component: CartPageComponent;
  let fixture: ComponentFixture<CartPageComponent>;
  let cartService: CartService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartPageComponent ,NotFoundComponent,TitleComponent],
      imports:[RouterTestingModule,HttpClientTestingModule],
      providers: [CartService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartPageComponent);
    component = fixture.componentInstance;
    cartService = TestBed.inject(CartService);
    // mock the getCartObservable method to return a fake cart object
    spyOn(cartService, 'getCartObservable').and.returnValue(of({
      items: [
        {
          food: {
            id: '1',
            name: 'Pizza pepika',
            price: 399,
            imageUrl: 'assets/food-1.jpg',
            pizzaBase: { name: 'Normal Crust', price: 0, id: 1 },
            ingredient: ["Oregano", "Chilli flakes", "Sugar"],
            extraToppings: []
          },
          quantity: 1,
          price: 399,
          extraTopingPrice: 0,
          foodItem: {
            id: '1',
            name: 'Pizza pepika',
            price: 399,
            imageUrl: 'assets/food-1.jpg',
            pizzaBase: { name: 'Normal Crust', price: 0, id: 1 },
            ingredient: ["Oregano", "Chilli flakes", "Sugar"],
            extraToppings: []
          }
        }
      ],
      totalPrice: 399,
      totalCount: 1
    }));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call the removeFromCart method of the service when removeFromCart is called', () => {
    const cartItem = component.cart.items[0];
    const serviceSpy = spyOn(cartService, 'removeFromCart');
    component.removeFromCart(cartItem);
    expect(serviceSpy).toHaveBeenCalledWith(cartItem.food.id);
  });

  it('should call the removeTopingFromCart method of the service when removeToppingFromPizza is called', () => {
    const cartItem = component.cart.items[0];
    const topping = {
      name: "pepika",
      count: 1,
      price: 89,
      icon: "🍕",
      id: 1
    };
    const serviceSpy = spyOn(cartService, 'removeTopingFromCart');
    component.removeToppingFromPizza(cartItem, topping);
    expect(serviceSpy).toHaveBeenCalledWith(cartItem, topping);
  });

  it('should call the changeQuantity method of the service when changeQuantity is called', () => {
    const cartItem = component.cart.items[0];
    const quantity = '2';
    const serviceSpy = spyOn(cartService, 'changeQuantity');
    component.changeQuantity(cartItem, quantity);
    expect(serviceSpy).toHaveBeenCalledWith(cartItem.food.id, parseInt(quantity));
  });

  it('should change the topping quantity and call the changeQuantity method of the service when changeToppingQuantity is called', () => {
    const cartItem = component.cart.items[0];
    const topping = {
      name: "pepika",
      count: 2,
      price: 89,
      icon: "🍕",
      id: 1
    };
    const quantity = '2';
    const serviceSpy = spyOn(cartService, 'changeQuantity');
    component.changeToppingQuantity(cartItem, topping, quantity);
    expect(topping.count).toEqual(parseInt(quantity));
    expect(serviceSpy).toHaveBeenCalledWith(cartItem.food.id, cartItem.quantity);
  });

});
