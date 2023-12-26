import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartPageComponent } from './components/pages/cart-page/cart-page.component';
import { FoodPageComponent } from './components/pages/food-page/food-page.component';
import { HomeComponent } from './components/pages/home/home.component';
import { CustomPizzaComponent } from './components/pages/custom-pizza/custom-pizza.component';
import { PageLeaveGuard } from './gaurd/page-leave.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'food-details/:id', component: FoodPageComponent },
  { path: 'custom-pizza', component: CustomPizzaComponent, canDeactivate: [PageLeaveGuard] },
  { path: 'cart-page', component: CartPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
