import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private users: any[] = [];
  private currentUser: any = null;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    // Load currentUser from localStorage only in browser
    if (isPlatformBrowser(this.platformId)) {
      const storedUser = localStorage.getItem('currentUser');
      if (storedUser) {
        this.currentUser = JSON.parse(storedUser);
      }
    }
  }

  // Carga el JSON de usuarios
  async loadUserData() {
    if (this.users.length) return;

    let url = (typeof window !== 'undefined') 
      ? '/data/usuarios.json' 
      : 'http://localhost:4200/data/usuarios.json';

    try {
      const res = await fetch(url);
      const data = await res.json();
      this.users = data.usuario || [];
    } catch (error) {
      console.error("Error cargando usuarios.json:", error);
    }
  }

  // Valida las credenciales
  async login(email: string, pass: string): Promise<boolean> {
    await this.loadUserData();
    this.currentUser = this.users.find(
      user => user.email === email && user.password === pass
    ) ?? null;
    if (this.currentUser && isPlatformBrowser(this.platformId)) {
      localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
    }
    return !!this.currentUser;
  }

  logout() {
    this.currentUser = null;
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('currentUser');
    }
  }

  getCurrentUser() {
    return this.currentUser;
  }
}