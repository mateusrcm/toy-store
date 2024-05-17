import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ProductsHttpService } from './products.http.service';

import { Product } from '../../components/product/product.type';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private productHttp: ProductsHttpService) {}

  getAll(page: number, qtty: number = 40): Observable<Product[]> {
    return this.productHttp.getAll(page, qtty);
  }

  post(product: Product): Observable<Product> {
    return this.productHttp.post(product);
  }

  put(product: Product): Observable<Product> {
    const id = product.id;

    return this.productHttp.put(id!, product);
  }

  patch(product: Partial<Product>): Observable<Product> {
    const id = product.id;

    return this.productHttp.patch(id!, product);
  }
}
