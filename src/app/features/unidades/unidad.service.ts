import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UnidadService {

  private apiUrl = `${environment.apiUrl}/api`;

  constructor(private http: HttpClient) {}

  getByInmueble(inmuebleId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/inmuebles/${inmuebleId}/unidades`);
  }


  add(unidad: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/unidades`, unidad);
  }

  update(id: number, unidad: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/unidades/${id}`, unidad);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/unidades/${id}`);
  }
}