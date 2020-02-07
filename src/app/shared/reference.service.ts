import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Reference} from '../module/Reference';
import {Product} from '../module/Product';

@Injectable({
  providedIn: 'root'
})
export class ReferenceService {

  constructor(private http: HttpClient) { }

  getAllReference(): Observable<Reference[]> {
    return this.http.get<Reference[]>('http://localhost:8087/reference/list');
  }

  getFreeReference(): Observable<Reference[]> {
    return this.http.get<Reference[]>('http://localhost:8087/reference/listFree');
  }

  addReference(ref: Reference): Observable<Reference> {
    return this.http.post<Reference>('http://localhost:8087/reference/add', ref);
  }

  deleteReference(id: number): Observable<number> {
    return this.http.delete<number>(`http://localhost:8087/reference/delete?id=${id}`);
  }

  getReferencesByProduit(): Observable<Reference[]> {
    return this.http.get<Reference[]>('http://localhost:8087/reference/list');
  }

  getReferenceById(id: number) {
    return this.http.get<Reference>(`http://localhost:8087/reference?id=${id}`);
  }
}
