import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { environment } from '../../environments/environment';

import { Product } from '../../components/product/product.type';

const BASE_URL = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class ProductsHttpService {
  constructor(private http: HttpClient) {}

  getAll(page: number, qtty: number = 40): Observable<Product[]> {
    const url = `${BASE_URL}/products?_page=${page}&_limit=${qtty}&_embed=product_images`;

    return this.http.get<Product[]>(url);
  }

  post(product: Product): Observable<Product> {
    const url = `${BASE_URL}/products`;

    const formattedProduct: Partial<Product> = { ...product };
    delete formattedProduct.id;
    delete formattedProduct.product_images;

    return this.http.post<Product>(url, formattedProduct);
  }

  put(id: number, product: Product): Observable<Product> {
    const url = `${BASE_URL}/products/${id}`;

    const formattedProduct: Partial<Product> = { ...product };
    delete formattedProduct.product_images;

    return this.http.put<Product>(url, formattedProduct);
  }

  patch(id: number, product: Partial<Product>): Observable<Product> {
    const url = `${BASE_URL}/products/${id}`;

    const formattedProduct: Partial<Product> = { ...product };
    delete formattedProduct.product_images;

    return this.http.patch<Product>(url, formattedProduct);
  }
}
