import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { HomeComponent } from 'app/home/home.component';
import { AboutComponent } from 'app/about/about.component';
import { ContactComponent } from 'app/contact/contact.component';
import { ProductComponent } from 'app/product/product.component';
import { CheckoutComponent } from 'app/checkout/checkout.component';
import { OrderPlaceComponent } from 'app/order-place/order-place.component';
import { FaqComponent } from 'app/faq/faq.component';
import { PrivacyComponent } from 'app/privacy/privacy.component';
import { TncComponent } from 'app/tnc/tnc.component';
import { ReturnComponent } from 'app/return/return.component';



const ROUTES: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent},
  { path: 'about', component: AboutComponent},
  { path: 'contact', component: ContactComponent},
  { path: 'product/:id',component: ProductComponent},
  {path: 'checkout', component: CheckoutComponent},
  {path: 'order-place', component: OrderPlaceComponent},
  {path:"faq",component:FaqComponent},
  {path:"privacy",component:PrivacyComponent},
  {path:"tnc",component:TncComponent},
  {path:"return",component:ReturnComponent},
  { path: '**', redirectTo: 'home' }
];

// export class AppRoutingModule { }
export const ROUTING: ModuleWithProviders = RouterModule.forRoot(ROUTES, {
  useHash: true,
  preloadingStrategy: PreloadAllModules
});
