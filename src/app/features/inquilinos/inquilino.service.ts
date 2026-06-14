import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
export interface Inquilino {
  id: number;
  codigo: string;
  nombreCompleto: string;
  email: string;
  documentoIdentidad: string;
  telefono: string;
  tipoPersona: string;
}

@Injectable({
  providedIn: 'root'
})
export class InquilinoService {

  private apiUrl = `${environment.apiUrl}/api/inquilinos`;

  constructor(private http: HttpClient) {}

  listar(): Observable<Inquilino[]> {
    return this.http.get<Inquilino[]>(this.apiUrl);
  }

  morosos(): Observable<Inquilino[]> {
    return this.http.get<Inquilino[]>(`${this.apiUrl}/morosos`);
  }


  guardar(inquilino: Inquilino): Observable<any> {
    return this.http.post(this.apiUrl, inquilino);
  }

}