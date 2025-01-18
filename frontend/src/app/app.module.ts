import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { BannerComponent } from './home/banner/banner.component';
import { CallupSectionComponent } from './home/callup-section/callup-section.component';
import { AboutSectionComponent } from './home/about-section/about-section.component';
import { ProductHomeComponent } from './home/product-home/product-home.component';
import { SignupletterComponent } from './home/signupletter/signupletter.component';
import { ContactComponent } from './home/contact/contact.component';
import { FooterComponent } from './footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { SearchinputComponent } from './header/searchinput/searchinput.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { ShoppingComponent } from './shopping/shopping.component';
import { ProductsComponent } from './shopping/products/products.component';
import { SearchPipe } from './pipes/search.pipe';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { OrdersComponent } from './orders/orders.component';
import { LogoutComponent } from './logout/logout.component';
import { CommonModule } from '@angular/common';
import { ProductslistComponent } from './productslist/productslist.component';
import { ProductmangComponent } from './productmang/productmang.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    BannerComponent,
    CallupSectionComponent,
    AboutSectionComponent,
    ProductHomeComponent,
    SignupletterComponent,
    ContactComponent,
    FooterComponent,
    SearchinputComponent,
    SearchResultsComponent,
    ShoppingComponent,
    ProductsComponent,
    SearchPipe,
    LoginComponent,
    SignupComponent,
    CheckoutComponent,
    OrdersComponent,
    LogoutComponent,
    CartComponent,
    ProductslistComponent,
    ProductmangComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
