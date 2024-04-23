import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = 'http://localhost:8080/api/products';

  // dependency injection
  // By declaring and injecting the httpClient property in the constructor, 
  // Angular automatically creates and assigns an instance of HttpClient to that property
  //  when creating an instance of the ProductService class.
  constructor(private httpClient: HttpClient) {}

  getProductList(): Observable<Product[]> {
    return this.httpClient
      .get<GetResponse>(this.baseUrl)
      .pipe(map((response) => response._embedded.products));
  }
}

// represent the structure of the response received from the server
interface GetResponse {
  _embedded: {
    products: Product[];
  };
}
