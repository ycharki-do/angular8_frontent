import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product} from '../module/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {


  // API_PRODUCTS_ALL: string = 'http://localhost:8087/projet/list';

  constructor(private http: HttpClient) { }

  getAllProduct(): Observable<Product[]> {
    return this.http.get<Product[]>('http://localhost:8087/produit/list');
  }

  addProduct(pr: Product): Observable<Product> {
    return this.http.post<Product>('http://localhost:8087/produit/add', pr);
  }

  deleteProduct(id: number): Observable<number> {
    return this.http.delete<number>(`http://localhost:8087/produit/delete?id=${id}`);
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`http://localhost:8087/produit?id=${id}`);
  }
}
