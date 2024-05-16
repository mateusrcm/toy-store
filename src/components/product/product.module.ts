import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzRateModule } from 'ng-zorro-antd/rate';

import { ProductCardComponent } from './product-card/product-card.component';
import { ProductItemComponent } from './product-item/product-item.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NzButtonModule,
    NzImageModule,
    NzSpaceModule,
    NzCardModule,
    NzGridModule,
    NzIconModule,
    NzRateModule,
  ],
  declarations: [ProductItemComponent, ProductCardComponent],
  exports: [ProductItemComponent, ProductCardComponent],
})
export class ProductModule {}
