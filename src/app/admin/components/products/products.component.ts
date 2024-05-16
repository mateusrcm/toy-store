import { Component } from '@angular/core';
import { ProductModule } from '../../../../components/product/product.module';
import { Product } from '../../../../components/product/product.type';
import { ProductsService } from '../../../../shared/services/products.service';

@Component({
  selector: 'ts-products',
  standalone: true,
  imports: [ProductModule],
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
