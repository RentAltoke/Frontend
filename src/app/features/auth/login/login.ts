import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router'; // 👈 IMPORTANTE
import { FormsModule } from '@angular/forms'; // 👈 Necesario para [(ngModel)]
import { AuthService } from '../../usuario/auth.service'; // 👈 Import AuthService

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

  constructor(private router: Router, private authService: AuthService) {} // 👈 Inject AuthService

  async login() {
    const success = await this.authService.login(this.userInput, this.passwordInput);
    if (success) {
      console.log('Login exitoso');
      this.router.navigate(['/inicio']); 
    } else {
      alert('Usuario o contraseña incorrectos.');
    }
  }
}