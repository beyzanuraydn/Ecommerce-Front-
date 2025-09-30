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
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
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
  providers: [ProductService, FormService, CheckoutService],
})
export class App {
  protected readonly title = signal('eticaretFront');
}
