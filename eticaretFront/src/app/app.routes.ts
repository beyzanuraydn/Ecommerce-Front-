import { Routes } from '@angular/router';

import { ProductListComponent } from './conmponents/product-list/product-list.component';
import { ProductDetailsComponent } from './conmponents/product-details/product-details.component';
import { CartDetailsComponent } from './conmponents/cart-details/cart-details.component';
import { CheckoutComponent } from './conmponents/checkout/checkout.component';

export const routes: Routes = [
  { path: 'checkout', component: CheckoutComponent },
  { path: 'cart-details', component: CartDetailsComponent },
  { path: 'search/:keyword', component: ProductListComponent },
  { path: 'products/:id', component: ProductDetailsComponent },
  { path: 'category/:id', component: ProductListComponent },
  { path: 'category', component: ProductListComponent },
  { path: 'products', component: ProductListComponent },
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: '**', redirectTo: '/products', pathMatch: 'full' },
];
