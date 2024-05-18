import { Component, Input } from '@angular/core';

import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { ProductModule } from '../../../../components/product/product.module';

import { ProductsService } from '../../../../shared/services/products.service';

import { ProductFormComponent } from './product-form/product-form.component';

import { Product } from '../../../../components/product/product.type';
import { NzTabPosition } from 'ng-zorro-antd/tabs';

@Component({
  selector: 'ts-products',
  standalone: true,
  imports: [
    NzCardModule,
    NzGridModule,
    NzIconModule,
    NzDrawerModule,
    ProductModule,
    ProductFormComponent,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.less',
})
export class ProductsComponent {
  @Input({ required: true }) position!: NzTabPosition;
  productList!: Product[];
  product!: Product;

  isDrawerOpen: boolean = false;

  constructor(private products: ProductsService) {}

  ngOnInit(): void {
    this.products.getAll(1).subscribe((result) => {
      this.productList = result;
    });
  }

  createNewProduct(): void {
    this.product = {
      name: '',
      description: '',
      avaliationsCount: 0,
      averageRate: 0,
      price: 0,
      stock: 0,
      tags: [],
      enabled: true,
    };

    this.isDrawerOpen = true;
  }

  editProduct(product: Product): void {
    this.product = product;
    this.isDrawerOpen = true;
  }

  onSave(product: Product): void {
    const index = this.productList.indexOf(this.product);
    this.productList.splice(index, 1, product);

    this.product = null!;
    this.isDrawerOpen = false;
  }

  close(): void {
    this.product = null!;
    this.isDrawerOpen = false;
  }
}
