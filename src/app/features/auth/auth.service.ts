import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
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

  private apiUrl = 'http://localhost:8081/api/auth';

  constructor(private http: HttpClient) {}

  login(credentials: any): Observable<any> {

    return this.http.post<any>(
      `${this.apiUrl}/login`,
      credentials
    ).pipe(
      tap(response => {

        if (typeof window !== 'undefined') {
          localStorage.setItem('token', response.token);
        }

      })
    );
  }

  logout(): void {

    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }

  }

  isLoggedIn(): boolean {

    if (typeof window === 'undefined') {
      return false;
    }

    return !!window.localStorage.getItem('token');
  }

  */
  getUsuario() {

    if (typeof window === 'undefined') {
      return {};
    }

    return JSON.parse(
      window.localStorage.getItem('usuario') || '{}'
    );
  }
  
}