
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CartService } from 'src/app/services/cart.service';
import { CustomPizzaService } from 'src/app/services/custom-pizza.service';
import { Food } from 'src/app/shared/models/Food';
import { PizzaBase } from 'src/app/shared/models/pizzaBase';
import { Toppings } from 'src/app/shared/models/Toppings';
import { CustomPizzaComponent } from './custom-pizza.component';
import { NotFoundComponent } from '../../partials/not-found/not-found.component';
import { TitleComponent } from '../../partials/title/title.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CustomPizzaComponent', () => {
  let component: CustomPizzaComponent;
  let fixture: ComponentFixture<CustomPizzaComponent>;
  let cartService: CartService;
  let customPizzaService: CustomPizzaService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomPizzaComponent, NotFoundComponent, TitleComponent],
      imports: [RouterTestingModule,HttpClientTestingModule],
      providers: [CartService, CustomPizzaService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomPizzaComponent);
    component = fixture.componentInstance;
    cartService = TestBed.inject(CartService);
    customPizzaService = TestBed.inject(CustomPizzaService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create a new pizza on initialization', () => {
    expect(component.customPizza).toBeDefined();
    expect(component.customPizza.id).toMatch(/^\d+$/);
    expect(component.customPizza.pizzaBase).toEqual(customPizzaService.getPizzaBaseFromId(parseInt(component.customPizza.id)));
    expect(component.totalCost).toEqual(customPizzaService.updateCost(component.customPizza));
  });

  it('should get the pizza base options and toppings on initialization', () => {
    expect(component.pizzaBaseOptions).toEqual(customPizzaService.getPizzaBaseOption());
    expect(component.pizzaToppings).toEqual(customPizzaService.getPizzaToppingOptions());
  });

  it('should return true for canLeave if the pizza is pristine', () => {
    expect(component.canLeave()).toBeTrue();
  });

  it('should change the pizza base and update the cost when changePizzaBase is called', () => {
    const baseId = '2';
    const base = customPizzaService.getPizzaBaseFromId(parseInt(baseId));
    component.changePizzaBase(baseId);
    expect(component.customPizza.pizzaBase).toEqual(base);
    expect(component.isPristine).toBeFalse();
    expect(component.totalCost).toEqual(customPizzaService.updateCost(component.customPizza));
  });

  it('should remove a topping from the pizza and update the cost when removeToppingFromPizza is called', () => {
    const topping = component.pizzaToppings[0];
    component.changeToppingQuantity(topping, '1');
    component.removeToppingFromPizza(topping);
    expect(component.customPizza.extraToppings).not.toContain(topping);
    expect(component.isPristine).toBeFalse();
    expect(component.totalCost).toEqual(customPizzaService.updateCost(component.customPizza));
  });

  it('should change the topping quantity and update the cost when changeToppingQuantity is called', () => {
    const topping = component.pizzaToppings[0];
    const quantity = '2';
    component.changeToppingQuantity(topping, quantity);
    expect(component.customPizza.extraToppings).toContain(topping);
    expect(topping.count).toEqual(parseInt(quantity));
    expect(component.isPristine).toBeFalse();
    expect(component.totalCost).toEqual(customPizzaService.updateCost(component.customPizza));
  });

});
