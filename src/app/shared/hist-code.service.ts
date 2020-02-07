import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {HistCode} from '../module/HistCode';

@Injectable({
  providedIn: 'root'
})
export class HistCodeService {
  constructor(private http: HttpClient) { }

  getAllHistCode(): Observable<HistCode[]> {
    return this.http.get<HistCode[]>('http://localhost:8087/histcode/list');
  }

  getHistCodeByRef(id: number): Observable<HistCode[]> {
    return this.http.get<HistCode[]>(`http://localhost:8087/histcode/getByRef?id=${id}`);
  }

  getHistCodeByCode(id: number): Observable<HistCode[]> {
    return this.http.get<HistCode[]>(`http://localhost:8087/histcode/getByCode?id=${id}`);
  }
}
