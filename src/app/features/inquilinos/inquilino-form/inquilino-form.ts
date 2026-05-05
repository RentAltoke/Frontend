import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inquilino-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './inquilino-form.html',
  styleUrls: ['./inquilino-form.css']
})
export class InquilinoForm {

  imagenes: string[] = [
    'inquilinos_nuevos/EXT-INQ-013.jpg',
    'inquilinos_nuevos/EXT-INQ-014.jpg',
    'inquilinos_nuevos/EXT-INQ-015.jpg',
    'inquilinos_nuevos/EXT-INQ-016.jpg',
    'inquilinos_nuevos/EXT-INQ-017.jpg',
    'inquilinos_nuevos/EXT-INQ-018.jpg',
    'inquilinos_nuevos/EXT-INQ-019.jpg'
  ];

  index = 0;

  nuevoInquilino: any = {
    codigo: '',
    tipoPersona: 'NATURAL',
    nombreCompleto: '',
    documentoIdentidad: '',
    telefono: '',
    email: '',
    foto_url: ''
  };

  contrato: any = {
    unidad_id: null,
    monto_renta: 0,
    dia_pago: 5
  };

  constructor(private router: Router) {}

  siguiente() {
    this.index = (this.index + 1) % this.imagenes.length;
  }

  anterior() {
    this.index = (this.index - 1 + this.imagenes.length) % this.imagenes.length;
  }

  elegirImagen() {
    this.nuevoInquilino.foto_url = this.imagenes[this.index];

    const nombre = this.imagenes[this.index].split('/').pop();
    this.nuevoInquilino.codigo = nombre?.replace('.jpg', '');
  }

  guardar() {

    // 🚨 validación básica
    if (!this.nuevoInquilino.foto_url) {
      alert('Debes elegir una imagen');
      return;
    }

    const nuevo = {
      id: Date.now(), // 🔥 ID automático
      ...this.nuevoInquilino,
      contrato: this.contrato
    };

    const data = JSON.parse(localStorage.getItem('inquilinos') || '[]');

    data.push(nuevo);

    localStorage.setItem('inquilinos', JSON.stringify(data));

    alert('Inquilino guardado (local)');
    this.router.navigate(['/inquilinos']);
  }
}