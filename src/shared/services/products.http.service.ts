import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

import { Product } from '../../components/product/product.type';

const BASE_URL = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class ProductsHttpService {
  constructor(private http: HttpClient) {}

  loadProducts(page: number, qtty: number = 40): Observable<Product[]> {
    const url = `${BASE_URL}/products?_page=${page}&_limit=${qtty}&_embed=product_avaliations&_embed=product_images`;

    return this.http.get<Product[]>(url);
  }
}
