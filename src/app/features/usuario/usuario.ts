import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
// 👇 Ahora están en el mismo nivel
import { AuthService } from './auth.service'; 

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './usuario.html',
  styleUrl: './usuario.css',
})
export class Usuario implements OnInit {
  user: any = null;

  // 1. Inyectamos el servicio en el constructor
  constructor(private authService: AuthService) {}

  async ngOnInit() {
    // 2. Intentamos obtener el usuario actual
    this.user = this.authService.getCurrentUser();
    
    // 3. Si es null (porque recargaste la página), lo cargamos de nuevo
    if (!this.user) {
      await this.authService.loadUserData();
      this.user = this.authService.getCurrentUser();
    }
  }
}