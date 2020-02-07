import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Code} from '../module/Code';
import {HttpClient} from '@angular/common/http';
import {Reference} from '../module/Reference';
import {HistRef} from '../module/HistRef';

@Injectable({
  providedIn: 'root'
})
export class HistRefService {

  constructor(private http: HttpClient) { }

  getAllHistRef(): Observable<HistRef[]> {
    return this.http.get<HistRef[]>('http://localhost:8087/histref/list');
  }

  getHistRefByRef(id: number): Observable<HistRef[]> {
    return this.http.get<HistRef[]>(`http://localhost:8087/histref/getByRef?id=${id}`);
  }

  getHistRefByProduit(id: number): Observable<HistRef[]> {
    return this.http.get<HistRef[]>(`http://localhost:8087/histref/getByProduit?id=${id}`);
  }
}
