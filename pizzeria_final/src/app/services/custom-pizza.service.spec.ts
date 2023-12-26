import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CustomPizzaService } from './custom-pizza.service';
import { sample_foods, toppings } from 'src/data';
import { PizzaBase } from '../shared/models/pizzaBase';
import { Toppings } from '../shared/models/Toppings';
import { Food } from '../shared/models/Food';
import { Cart } from '../shared/models/Cart';
import { CartItem } from '../shared/models/CartItem';

describe('CustomPizzaService', () => {
  let service: CustomPizzaService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CustomPizzaService]
    });
    service = TestBed.inject(CustomPizzaService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return pizza base options from getPizzaBaseOption()', () => {
    const result = service.getPizzaBaseOption();
    expect(result.length).toEqual(2);
  });

  it('should return pizza topping options from getPizzaToppingOptions()', () => {
    const result = service.getPizzaToppingOptions();
    expect(result).toEqual(toppings);
  });

  it('should return pizza base from id from getPizzaBaseFromId()', () => {
    const id = 1;
    const result = service.getPizzaBaseFromId(id);
    expect(result.price).toEqual(sample_foods[0].pizzaBase.price);
  });

  it('should return default pizza base if id is not found from getPizzaBaseFromId()', () => {
    const id = 44;
    const result = service.getPizzaBaseFromId(id);
    expect(result).toEqual(sample_foods[0].pizzaBase);
  });

  it('should return updated cost from updateCost()', () => {
    const mockPizza: Food = {
      id: '1',
      name: 'Custom Pizza',
      price: 10,
      imageUrl: 'assets/defaultBase.jpg',
      pizzaBase: sample_foods[0].pizzaBase,
      ingredient: [],
      extraToppings: [
        { id: 1, name: 'Cheese', price: 1, count: 2, icon: '🧀' },
        { id: 2, name: 'Tomato', price: 0.5, count: 1, icon: '🍅' }
      ]
    };
    const result = service.updateCost(mockPizza);
    expect(result).toEqual(12.5);
  });

  it('should return pizza base options from API from getPizzaBaseOptionFromAPI()', () => {
    const mockPizzaBases: PizzaBase[] = [
      { id: 1, name: 'Thin Crust', price: 2 },
      { id: 2, name: 'Thick Crust', price: 3 }
    ];

    service.getPizzaBaseOptionFromAPI().subscribe(pizzaBases => {
      expect(pizzaBases.length).toBe(2);
      expect(pizzaBases).toEqual(mockPizzaBases);
    });

    const req = httpMock.expectOne('localhost:4202/api/food/getPizzaBaseOption');
    expect(req.request.method).toBe('GET');
    req.flush(mockPizzaBases);
  });

  it('should return pizza topping options from API from getPizzaToppingOptionsFromAPI()', () => {
    const mockToppings: Toppings[] = [
      { id: 1, name: 'Cheese', price: 1, count: 0, icon: '🧀' },
      { id: 2, name: 'Tomato', price: 0.5, count: 0, icon: '🍅' }
    ];

    service.getPizzaToppingOptionsFromAPI().subscribe(toppings => {
      expect(toppings.length).toBe(2);
      expect(toppings).toEqual(mockToppings);
    });

    const req = httpMock.expectOne('localhost:4202/api/food/getPizzaToppingOptions');
    expect(req.request.method).toBe('GET');
    req.flush(mockToppings);
  });
});
