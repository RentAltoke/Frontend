import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUser: any = null;

  // Carga el JSON de usuarios
  async loadUserData() {
    if (this.currentUser) return;

    let url = (typeof window !== 'undefined') 
      ? '/data/usuarios.json' 
      : 'http://localhost:4200/data/usuarios.json';

    try {
      const res = await fetch(url);
      const data = await res.json();
      this.currentUser = data.usuario;
    } catch (error) {
      console.error("Error cargando usuarios.json:", error);
    }
  }

  // Valida las credenciales
  async login(email: string, pass: string): Promise<boolean> {
    await this.loadUserData();
    if (this.currentUser && this.currentUser.email === email && this.currentUser.password === pass) {
      return true;
    }
    return false;
  }

  getCurrentUser() {
    return this.currentUser;
  }
}