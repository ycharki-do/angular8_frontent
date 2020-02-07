import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Reference} from '../module/Reference';
import {Observable, Subscription} from 'rxjs';
import {ProdRef} from '../module/ProdRef';
import {Product} from '../module/Product';
import {FullModel} from '../module/FullModel';
import {RefCode} from '../module/RefCode';

@Injectable({
  providedIn: 'root'
})
export class ProdRefService {

  constructor(private http: HttpClient) {
  }

  addProdRef(prodRef: ProdRef): Observable<ProdRef> {
    return this.http.post<ProdRef>('http://localhost:8087/prodRef/add', prodRef);
  }

  //
  // getByProduit(): Observable<ProdRef[]> {
  //    return this.http.get<ProdRef[]>('http://localhost:8087/prodRef/getAll');
  // }

  getByProduit(product: Product): Observable<ProdRef[]> {
    return this.http.get<ProdRef[]>(`http://localhost:8087/prodRef/getByProduit?id=${product.id}`);
  }

  getByReference(reference: Reference): Observable<ProdRef[]> {
    return this.http.get<ProdRef[]>(`http://localhost:8087/prodRef/getByReference?id=${reference.id}`);
  }

  deleteProdRef(id: number) {
    return this.http.delete(`http://localhost:8087/prodRef/delete?id=${id}`);
  }

  getAll(): Observable<FullModel[]> {
    return this.http.get<FullModel[]>(`http://localhost:8087/prodRef/all`);
  }
}

