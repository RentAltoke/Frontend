import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
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

  constructor(private authService: AuthService) {}

  async ngOnInit() {
    this.user = this.authService.getCurrentUser();
    
    if (!this.user) {
      await this.authService.loadUserData();
      this.user = this.authService.getCurrentUser();
    }
  }
}