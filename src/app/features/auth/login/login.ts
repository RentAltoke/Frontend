import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../usuario/auth.service';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})

export class Login {
// Datos que el usuario escribe
  userInput: string = '';
  passwordInput: string = '';
  errorMessage: string = '';

  constructor(private router: Router, private authService: AuthService) {}

  async login() {
    this.errorMessage = '';

    try {
      const success = await this.authService.login(
        this.userInput,
        this.passwordInput
      );

      if (success) {
        console.log('Login exitoso');
        this.router.navigate(['/inicio']);
      } else {
        this.errorMessage = 'Usuario o contraseña incorrectos';
      }

    } catch (error) {
      this.errorMessage = 'Error al conectar con el servidor';
      console.error(error);
    }
  }
}