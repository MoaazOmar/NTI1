import { ProductsComponent } from './shopping/products/products.component';
import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchResultsComponent } from './search-results/search-results.component';
import { HomeComponent } from './home/home.component';
import { ShoppingComponent } from './shopping/shopping.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { OrdersComponent } from './orders/orders.component';
import {AuthGuard} from './auth.guard'
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'search-results/:query', component: SearchResultsComponent },
  { path: 'shopping', component:ShoppingComponent},
  { path: 'shopping-products', component: ProductsComponent },
    {path: 'login' , component:LoginComponent},
    {path:'signup' , component:SignupComponent},
    { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
  { path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard] },
  { path: 'orders', component: OrdersComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/cart', pathMatch: 'full' },

  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }
