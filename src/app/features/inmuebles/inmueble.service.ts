import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InmuebleService {

  private apiUrl = 'http://localhost:8081/api/inmuebles';

  constructor(private http: HttpClient) {}

  // 🔥 GET ALL
  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // 🔥 GET BY ID
  getById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // 🔥 CREATE
  add(inmueble: any): Observable<any> {
    return this.http.post(this.apiUrl, inmueble);
  }

  // 🔥 UPDATE
  update(id: number, inmueble: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, inmueble);
  }

  // 🔥 DELETE
  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}