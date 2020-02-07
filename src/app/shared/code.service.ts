import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Projet} from '../module/Projet';
import {HttpClient} from '@angular/common/http';
import {Code} from '../module/Code';
import {Reference} from '../module/Reference';

@Injectable({
  providedIn: 'root'
})
export class CodeService {

  constructor(private http: HttpClient) { }

  getAllCodes(): Observable<Code[]> {
    return this.http.get<Code[]>('http://localhost:8087/code/list');
  }

  getFreeCodes(): Observable<Code[]> {
    return this.http.get<Code[]>('http://localhost:8087/code/listFree');
  }

  getAddCode(code: Code): Observable<Code> {
    return this.http.post<Code>('http://localhost:8087/code/add', code);
  }

  deleteCode(id: number): Observable<number> {
    return this.http.delete<number>(`http://localhost:8087/code/delete?id=${id}`);
  }

  getById(id: number): Observable<Code> {
    return this.http.get<Code>(`http://localhost:8087/code?id=${id}`);
  }

  getCodeNumero(name: string): Observable<Code> {
    return this.http.get<Code>(`http://localhost:8087/code/name?name=${name}`);
  }
}
