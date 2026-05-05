import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UnidadService {

  private apiUrl = 'http://localhost:8081/api';

  constructor(private http: HttpClient) {}

  // 🔥 unidades por inmueble
  getByInmueble(inmuebleId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/inmuebles/${inmuebleId}/unidades`);
  }

  // 🔥 CREAR unidad
  add(unidad: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/unidades`, unidad);
  }

  // 🔥 ACTUALIZAR unidad
  update(id: number, unidad: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/unidades/${id}`, unidad);
  }

  // 🔥 ELIMINAR unidad
  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/unidades/${id}`);
  }
}