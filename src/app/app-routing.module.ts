import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { HomeComponent } from 'app/home/home.component';
import { AboutComponent } from 'app/about/about.component';
import { ContactComponent } from 'app/contact/contact.component';



const ROUTES: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent},
  { path: 'about', component: AboutComponent},
  { path: 'contact', component: ContactComponent},
  { path: '**', redirectTo: 'home' }
];

// export class AppRoutingModule { }
export const ROUTING: ModuleWithProviders = RouterModule.forRoot(ROUTES, {
  useHash: true,
  preloadingStrategy: PreloadAllModules
});
