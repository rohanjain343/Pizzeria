import { Food } from './app/shared/models/Food';
import { Toppings } from './app/shared/models/Toppings';
import { PizzaBase } from './app/shared/models/pizzaBase';

export const sample_foods: Food[] = [
  {
    id: '1',
    name: 'Pizza pepika',
    price: 399,
    imageUrl: 'assets/food-1.jpg',
    pizzaBase: { name: 'Normal Crust', price: 0, id: 1 },
    ingredient: ["Oregano", "Chilli flakes", "Sugar"],
    extraToppings: []
  },
  {
    id: '2',
    name: 'Soyaball',
    price: 299,
    imageUrl: 'assets/food-2.jpg',
    pizzaBase: { name: 'Normal Crust', price: 0, id: 1 },
    ingredient: ["Oregano", "Chilli flakes", "Sugar"],
    extraToppings: []
  },
  {
    id: '3',
    name: 'brocholliburger',
    price: 49,
    imageUrl: 'assets/food-3.jpg',
    pizzaBase: { name: 'Normal Crust', price: 0, id: 1 },
    ingredient: ["Oregano", "Chilli flakes", "Sugar"],
    extraToppings: []
  },
  {
    id: '4',
    name: 'Fried Potatoes',
    price: 79,
    imageUrl: 'assets/food-4.jpg',
    pizzaBase: { name: 'Normal Crust', price: 0, id: 1 },
    ingredient: [],
    extraToppings: []
  },
  {
    id: '5',
    name: 'Vegitable Soup',
    price: 129,
    imageUrl: 'assets/food-5.jpg',
    pizzaBase: { name: 'Normal Crust', price: 0, id: 1 },
    ingredient: ["Processed cheese", "Tomato", "Onion", "Capsicum", "Mushroom", "pepika",],
    extraToppings: []
  },
  {
    id: '6',
    name: 'Vegetables Pizza',
    price: 299,
    imageUrl: 'assets/food-6.jpg',
    pizzaBase: { name: 'Normal Crust', price: 0, id: 1 },
    ingredient: ["Processed cheese", "Tomato", "Onion", "Capsicum", "Mushroom", "pepika",],
    extraToppings: []
  },
  {
    id: '7',
    name: 'Spicy Cheese Burger',
    price: 499,
    imageUrl: 'assets/food-7.jpg',
    pizzaBase: { name: 'Normal Crust', price: 0, id: 1 },
    ingredient: ["Processed cheese", "Tomato", "Onion", "Capsicum", "Mushroom", "pepika",],
    extraToppings: []
  },
  {
    id: '8',
    name: 'Vegetables Magento Pizza',
    price: 299,
    imageUrl: 'assets/food-8.jpg',
    pizzaBase: { name: 'Normal Crust', price: 0, id: 1 },
    ingredient: [],
    extraToppings: []
  },
  {
    id: '9',
    name: '4 Cheese Pizza',
    price: 299,
    imageUrl: 'assets/food-9.jpg',
    pizzaBase: { name: 'Normal Crust', price: 0, id: 1 },
    ingredient: ["Salt", "Olive oil", "Tomato ketchup or sauce", "Mozzarella cheese",],
    extraToppings: []
  },
  {
    id: '10',
    name: 'Special Pizzeria Pizza',
    price: 299,
    imageUrl: 'assets/food-10.jpg',
    pizzaBase: { name: 'Normal Crust', price: 0, id: 1 },
    ingredient: ["Salt", "Olive oil", "Tomato ketchup or sauce", "Mozzarella cheese",],
    extraToppings: []
  }
]

export const toppings: Toppings[] =
  [
    { name: "pepika", count: 0, price: 89, icon: "🍕", id: 1 },
    { name: "mushrooms", count: 0, price: 79, icon: "🍄", id: 2 },
    { name: "green peppers", count: 0, price: 49, icon: "🌶️", id: 3 },
    { name: "paneer", count: 0, price: 59, icon: "P", id: 4 },
    { name: "brocholli", count: 0, price: 69, icon: "🥓", id: 5 },
    { name: "black olives", count: 0, price: 39, icon: "🫒", id: 6 },
    { name: "oregano", count: 0, price: 38, icon: "🌿", id: 7 },
    { name: "chilli flakes", count: 0, price: 38, icon: "🌶️", id: 8 },
    { name: "pineapple", count: 0, price: 38, icon: "🍍", id: 9 },
    { name: "achar", count: 0, price: 49, icon: "🥓", id: 10 },
    { name: "spinach", count: 0, price: 89, icon: "🥬", id: 11 },
    { name: "corn", count: 0, price: 69, icon: "🌽", id: 12 },
    { name: "jalapeños", count: 0, price: 89, icon: "🌶️", id: 13 },
    { name: "Avacados", count: 0, price: 99, icon: "Av", id: 14 },
    { name: "artichokes", count: 0, price: 59, icon: "🌱", id: 15 },
    { name: "mozerella cheese", count: 0, price: 39, icon: "M", id: 16 },
    { name: "plain cheese", count: 0, price: 29, icon: "P", id: 17 },
    { name: "chedder cheese", count: 0, price: 68, icon: "🫒", id: 18 },
    { name: "mix cheese", count: 0, price: 59, icon: "🫒", id: 19 }
  ];

export const ingredient: string[] = [
  "Flour",
  "Yeast",
  "Salt",
  "Olive oil",
  "Tomato ketchup or sauce",
  "Mozzarella cheese",
  "Processed cheese",
  "Tomato",
  "Onion",
  "Capsicum",
  "Mushroom",
  "pepika",
  "Oregano",
  "Chilli flakes",
  "Sugar"
];

export const pizzaBases: PizzaBase[] = [
  { name: 'Normal Crust', price: 0, id: 1 },
  { name: 'Thin Crust', price: 49, id: 2 }
] 