import { Component, signal } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ProductListComponent } from './conmponents/product-list/product-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from './services/product.service';
import { ProductCategoryMenu } from './conmponents/product-category-menu/product-category-menu';
import { SearchComponent } from './conmponents/search/search.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ProductListComponent,
    ProductCategoryMenu,
    SearchComponent,
    HttpClientModule,
    RouterModule,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
  providers: [ProductService],
})
export class App {
  protected readonly title = signal('eticaretFront');
}
