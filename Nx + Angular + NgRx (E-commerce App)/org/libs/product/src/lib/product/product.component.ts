import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { productActions } from '../store/product.action';
import { productFeature } from '../store/product.state';
import { MatCardModule } from '@angular/material/card'
import { MatButtonModule } from '@angular/material/button'
import { Product } from '../store/product';

@Component({
  selector: 'org-product',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent {
  @Input() set categoryName(categoryName: string) {
    if (categoryName) {
      this.store.dispatch(productActions.loadProductByCategory({ category: categoryName }));
    } else {
      this.store.dispatch(productActions.loadProduct());
    }
  }
  // @Input() test!: string; Testing data from appRoutes

  products$ = this.store.select(productFeature.selectProducts);

  constructor(private readonly store: Store) {}

  addToCart(product: Product) {
    console.log(product);
  }

}
