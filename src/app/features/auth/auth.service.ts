import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  login(usuario: any) {
    localStorage.setItem('usuario', JSON.stringify(usuario));
  }

logout() {
  localStorage.clear(); // 💥 borra TODO (más seguro para tu caso)
}

  isLoggedIn(): boolean {
    return !!localStorage.getItem('usuario');
  }

  getUsuario() {
    return JSON.parse(localStorage.getItem('usuario') || '{}');
  }
}