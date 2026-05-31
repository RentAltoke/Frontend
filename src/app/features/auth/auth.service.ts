import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8081/api/auth';

  constructor(private http: HttpClient) {}

  login(credentials: any): Observable<any> {

    return this.http.post<any>(
      `${this.apiUrl}/login`,
      credentials
    ).pipe(

      tap(response => {
      console.log(response.token);
        localStorage.setItem(
          'token',
          response.token
        );

      })

    );
  }
  logout(): void {

    localStorage.removeItem('token');

  }

  isLoggedIn(): boolean {

    return !!localStorage.getItem('token');

  }


/*

login(usuario: any) {
  localStorage.setItem('usuario', JSON.stringify(usuario));
  }

logout() {
  localStorage.clear(); 
}

  isLoggedIn(): boolean {
    return !!localStorage.getItem('usuario');
  }

  */
  getUsuario() {
    return JSON.parse(localStorage.getItem('usuario') || '{}');
  }
  
}