import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-usuario',
  imports: [CommonModule],
  templateUrl: './usuario.html',
  styleUrls: ['./usuario.css'],
})
export class Usuario implements OnInit {

  usuario: any = null;

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      this.usuario = {
        email: payload.sub,
        expira: new Date(payload.exp * 1000).toLocaleDateString('es-PE')
      };
    } catch {
      this.usuario = null;
    }
  }
}