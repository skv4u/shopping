import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ROUTING } from './app-routing.module';
import { AppComponent } from './app.component';
// import { NgxImageZoomModule } from 'ngx-image-zoom';


import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { ProductComponent } from './product/product.component';
import { CartTopComponent } from './cart-top/cart-top.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { OrderPlaceComponent } from './order-place/order-place.component';
import { FaqComponent } from './faq/faq.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { TncComponent } from './tnc/tnc.component';
import { ReturnComponent } from './return/return.component';
import { CategoryComponent } from './category/category.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ContactComponent,
    AboutComponent,
    ProductComponent,
    CartTopComponent,
    CheckoutComponent,
    OrderPlaceComponent,
    FaqComponent,
    PrivacyComponent,
    TncComponent,
    ReturnComponent,
    CategoryComponent
  ],
  imports: [
    BrowserModule,
    ROUTING,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
