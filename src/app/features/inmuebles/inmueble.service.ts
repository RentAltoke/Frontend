import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InmuebleService {

  private apiUrl = 'http://localhost:8081/api/inmuebles';

  constructor(private http: HttpClient) {}


  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }


  getById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  add(inmueble: any): Observable<any> {
    return this.http.post(this.apiUrl, inmueble);
  }

  update(id: number, inmueble: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, inmueble);
  }


  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}