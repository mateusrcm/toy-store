import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NzCardModule } from 'ng-zorro-antd/card';

import { ProductCardComponent } from './product-card/product-card.component';
import { ProductItemComponent } from './product-item/product-item.component';

@NgModule({
  imports: [CommonModule, NzCardModule],
  declarations: [ProductItemComponent, ProductCardComponent],
  exports: [ProductItemComponent, ProductCardComponent],
})
export class ProductModule {}
