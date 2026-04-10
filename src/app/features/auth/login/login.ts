import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router'; // 👈 IMPORTANTE

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [CommonModule, RouterModule],
  templateUrl: './login.html',
   styleUrls: ['./login.css'],
})
export class Login {


  constructor(private router: Router) {} // 👈 inyección

  login() {
    // 🔥 aquí iría tu validación (temporal o real)

    this.router.navigate(['/inicio']); // 👈 REDIRECCIÓN
  }


}