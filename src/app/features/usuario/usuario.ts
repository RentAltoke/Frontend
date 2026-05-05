import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth/auth.service';

@Component({
  standalone: true,
  selector: 'app-usuario',
  imports: [CommonModule],
  templateUrl: './usuario.html',
  styleUrls: ['./usuario.css'],
})
export class Usuario implements OnInit {

  usuario: any = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.usuario = this.authService.getUsuario();
  }
}