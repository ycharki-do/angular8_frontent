import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Code} from '../module/Code';
import {HttpClient} from '@angular/common/http';
import {Projet} from '../module/Projet';
import {Product} from '../module/Product';
import {Reference} from '../module/Reference';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  getAllCode(): Observable<Code[]> {
    return this.http.get<Code[]>(`http://localhost:8087/code/list`);
  }

  getAllProjet(): Observable<Projet[]> {
    return this.http.get<Projet[]>(`http://localhost:8087/projet/list`);
  }

  getAllProduct(): Observable<Product[]> {
    return this.http.get<Product[]>(`http://localhost:8087/produit/list`);
  }

  getAllReference(): Observable<Reference[]> {
    return this.http.get<Reference[]>(`http://localhost:8087/reference/list`);
  }
}
