import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RefCode} from '../module/RefCode';
import {Observable} from 'rxjs';
import {Reference} from '../module/Reference';
import {Code} from '../module/Code';

@Injectable({
  providedIn: 'root'
})
export class RefCodeService {


  constructor(private http: HttpClient) { }

  addRefCode(refCode: RefCode): Observable<RefCode> {
    return this.http.post<RefCode>('http://localhost:8087/refcode/add', refCode);
  }
  //
  // getByProduit(): Observable<ProdRef[]> {
  //    return this.http.get<ProdRef[]>('http://localhost:8087/prodRef/getAll');
  // }

  getByCode(code: Code): Observable<RefCode[]> {
    return this.http.get<RefCode[]>(`http://localhost:8087/refcode/getByCode?id=${code.id}`);
  }

  getByReference(reference: Reference): Observable<RefCode[]> {
    return this.http.get<RefCode[]>(`http://localhost:8087/refcode/getByReference?id=${reference.id}`);
  }

  deleteRefCode(id: number) {
    return this.http.delete(`http://localhost:8087/refcode/delete?id=${id}`);
  }
}
