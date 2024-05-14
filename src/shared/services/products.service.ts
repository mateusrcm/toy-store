import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ProductsHttpService } from './products.http.service';

import { Product } from '../../components/product/product.type';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private productHttp: ProductsHttpService) {}

  loadProducts(page: number, qtty: number = 40): Observable<Product[]> {
    return this.productHttp.loadProducts(page, qtty);
  }
}
