import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CartService } from './cart.service';
import { sample_foods, toppings } from 'src/data';
import { PizzaBase } from '../shared/models/pizzaBase';
import { Toppings } from '../shared/models/Toppings';
import { Food } from '../shared/models/Food';
import { Cart } from '../shared/models/Cart';
import { CartItem } from '../shared/models/CartItem';
import { Observable } from 'rxjs';

describe('CartService', () => {
  let service: CartService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CartService]
    });
    service = TestBed.inject(CartService);
    httpMock = TestBed.inject(HttpTestingController);
    service.clearCart();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add food to cart from addToCart()', () => {
    const mockFood: Food = sample_foods[0];
    service.addToCart(mockFood);
    const cart = service.getCurrentCart();
    expect(cart.items[0].food).toEqual(mockFood);
  });

  it('should not add duplicate food to cart from addToCart()', () => {
    const mockFood: Food = sample_foods[0];
    service.addToCart(mockFood);
    service.addToCart(mockFood);
    const cart = service.getCurrentCart();
    expect(cart.items.length).toBe(1);
    expect(cart.items[0].food).toEqual(mockFood);
  });

  it('should remove food from cart by id from removeFromCart()', () => {
    const mockFood: Food = sample_foods[0];
    service.addToCart(mockFood);
    service.removeFromCart(mockFood.id);
    const cart = service.getCurrentCart();
    expect(cart.items.length).toBe(0);
  });

  it('should remove topping from cart item from removeTopingFromCart()', () => {
    const mockFood: Food = sample_foods[0];
    mockFood.extraToppings = [toppings[0]];
    service.addToCart(mockFood);
    const cartItem = service.getCurrentCart().items[0];
    service.removeTopingFromCart(cartItem, toppings[0]);
    expect(cartItem.food.extraToppings.length).toBe(0);
  });

  it('should change quantity of cart item from changeQuantity()', () => {
    const mockFood: Food = sample_foods[0];
    service.addToCart(mockFood);
    const cartItem = service.getCurrentCart().items[0];
    service.changeQuantity(mockFood.id, 2);
    expect(cartItem.quantity).toBe(2);
    expect(cartItem.price).toBe(798);
  });

  it('should clear cart from clearCart()', () => {
    const mockFood: Food = sample_foods[0];
    service.addToCart(mockFood);
    service.clearCart();
    const cart = service.getCurrentCart();
    expect(cart.items.length).toBe(0);
    expect(cart.totalPrice).toBe(0);
    expect(cart.totalCount).toBe(0);
  });

  it('should return cart observable from getCartObservable()', () => {
    const cartObservable = service.getCartObservable();
    expect(cartObservable).toBeInstanceOf(Observable);
  });

  it('should place order through API from placeOrderThroughAPI()', () => {
    const mockCart: Cart = {
      items: [
        { food: sample_foods[0], quantity: 1, price: 399, extraTopingPrice: 0, foodItem: sample_foods[0] }
      ],
      totalPrice: 399,
      totalCount: 1
    };

    service.placeOrderThroughAPI(mockCart).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne('localhost:4202/api/order/placeOrderThroughAPI');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(JSON.stringify(mockCart));
    req.flush({ success: true });
  });
});
