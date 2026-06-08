import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})

export class Login implements OnInit {

  // 🧾 Datos del formulario
  userInput: string = '';
  passwordInput: string = '';
  errorMessage: string = '';

  constructor(
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/inicio']);
    }
  }

login() {

  this.errorMessage = '';

  if (!this.userInput || this.passwordInput.length < 8) {

    this.errorMessage = 'Ingrese datos válidos';
    return;

  }

  const credentials = {

    email: this.userInput,
    password: this.passwordInput

  };

  this.authService.login(credentials)
    .subscribe({

      next: () => {

        const returnUrl =
          this.route.snapshot.queryParams['returnUrl']
          || '/inicio';

        this.router.navigate([returnUrl]);

      },

      error: () => {

        this.errorMessage =
          'Usuario o contraseña incorrectos';

      }

    });

}



  /*

  login() {
    
  this.errorMessage = '';

    if (!this.userInput || this.passwordInput.length < 8) {
      this.errorMessage = 'Ingrese datos válidos';
      return;
    }

    // 🔥 LLAMADA AL BACKEND
    this.http.get<any[]>('http://localhost:8081/api/usuarios')
      .subscribe({
        next: (usuarios) => {

          const usuario = usuarios.find(u =>
            u.email === this.userInput &&
            u.passwordHash === this.passwordInput &&
            u.activo === true
          );

          if (usuario) {

            this.authService.login(usuario);
            const returnUrl =
              this.route.snapshot.queryParams['returnUrl'] || '/inicio';
            this.router.navigate([returnUrl]);
          } else {
            this.errorMessage = 'Usuario o contraseña incorrectos';
          }
        },
        error: () => {
          this.errorMessage = 'Error al conectar con el servidor';
        }
      });

    }
    
    
    */

}