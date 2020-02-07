import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product} from '../module/Product';
import {Projet} from '../module/Projet';

@Injectable({
  providedIn: 'root'
})
export class ProjetService {


  // API_PRODUCTS_ALL: string = 'http://localhost:8087/projet/list';

  constructor(private http: HttpClient) { }


  getAllProjet(): Observable<Projet[]> {
    return this.http.get<Projet[]>('http://localhost:8087/projet/list');
  }
  addProjet(pr: Projet): Observable<Projet> {
    return this.http.post<Projet>('http://localhost:8087/projet/add', pr);
  }

  deleteProjet(id: number): Observable<number> {
    return this.http.delete<number>(`http://localhost:8087/projet/delete?id=${id}`);
  }

  updateProjet(pr: Projet): Observable<Projet> {
    return this.http.put<Projet>('http://localhost:8087/projet/update', pr);
  }

  getProjetById(id: number): Observable<Projet> {
    return this.http.get<Projet>(`http://localhost:8087/projet?id=${id}`);
  }
}
