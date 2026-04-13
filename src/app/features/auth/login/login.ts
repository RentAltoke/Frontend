import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router'; // 👈 IMPORTANTE
import { FormsModule } from '@angular/forms'; // 👈 Necesario para [(ngModel)]

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [CommonModule, RouterModule, FormsModule], // 👈 Agrégalo aquí
  templateUrl: './login.html',
   styleUrls: ['./login.css'],
})
export class Login {
// Datos que el usuario escribe
  userInput: string = '';
  passwordInput: string = '';

  mockUser = {
    email: "alexander@rentaltoke.com",
    password: "123"
  };
  constructor(private router: Router) {} // 👈 inyección

  login() {
  if (this.userInput === this.mockUser.email && this.passwordInput === this.mockUser.password) {
      console.log('Login exitoso');
      this.router.navigate(['/inicio']); 
    } else {
      alert('Usuario o contraseña incorrectos. Intenta con: alexander@rentaltoke.com');
    }
  }
}