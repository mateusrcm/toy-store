import { Component } from '@angular/core';
import { ProductModule } from '../../components/product/product.module';

import { NzGridModule } from 'ng-zorro-antd/grid';

import { Product } from '../../components/product/product.type';
import { ProductsService } from '../../shared/services/products.service';

@Component({
  selector: 'ts-home',
  standalone: true,
  imports: [NzGridModule, ProductModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.less',
})
export class HomeComponent {
  productList!: Product[];

  constructor(private products: ProductsService) {}

  ngOnInit(): void {
    this.products.getAll(1).subscribe((result) => {
      this.productList = result;
    });
  }
}
