import { Component, signal } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ProductListComponent } from './conmponents/product-list/product-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from './services/product.service';
import { ProductCategoryMenu } from './conmponents/product-category-menu/product-category-menu';
import { SearchComponent } from './conmponents/search/search.component';
import { ProductDetailsComponent } from './conmponents/product-details/product-details.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CartStatusComponent } from './conmponents/cart-status/cart-status.component';
import { FormService } from './services/form.service';
import { CheckoutService } from './services/checkout.service';
import { LoginComponent } from './conmponents/login/login.component';
import { LoginStatusComponent } from './conmponents/login-status/login-status.component';
import { OKTA_CONFIG } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    LoginComponent,
    LoginStatusComponent,
    CartStatusComponent,
    ProductListComponent,
    ProductCategoryMenu,
    SearchComponent,
    NgbModule,
    HttpClientModule,
    RouterModule,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
  providers: [
    ProductService,
    FormService,
    CheckoutService,
    { provide: OKTA_CONFIG, useValue: { OktaAuth } },
  ],
})
export class App {
  protected readonly title = signal('eticaretFront');
}
