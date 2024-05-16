import { Component } from '@angular/core';

import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { ProductModule } from '../../../../components/product/product.module';

import { ProductsService } from '../../../../shared/services/products.service';

import { Product } from '../../../../components/product/product.type';

@Component({
  selector: 'ts-products',
  standalone: true,
  imports: [NzCardModule, NzGridModule, NzIconModule, ProductModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.less',
})
export class ProductsComponent {
  productList!: Product[];

  constructor(private products: ProductsService) {}

  ngOnInit(): void {
    this.products.loadProducts(1).subscribe((result) => {
      this.productList = result;
    });
  }
}
