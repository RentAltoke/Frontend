import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { InquilinoService, Inquilino } from '../inquilino.service';
@Component({
  selector: 'app-inquilino-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './inquilino-form.html',
  styleUrls: ['./inquilino-form.css']
})
export class InquilinoForm {

  imagenes: string[] = [
    'inquilinos/EXT-INQ-013.jpg',
    'inquilinos/EXT-INQ-014.jpg',
    'inquilinos/EXT-INQ-015.jpg',
    'inquilinos/EXT-INQ-016.jpg',
    'inquilinos/EXT-INQ-017.jpg',
    'inquilinos/EXT-INQ-018.jpg',
    'inquilinos/EXT-INQ-019.jpg'
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

  constructor(private inquilinoService: InquilinoService,private router: Router) {}

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
    if (!this.nuevoInquilino.foto_url) {
      alert('Debes elegir una imagen');
      return;
    }

  const request = {
     id: this.nuevoInquilino.number,
    codigo: this.nuevoInquilino.codigo,
    tipoPersona: this.nuevoInquilino.tipoPersona,
    nombreCompleto: this.nuevoInquilino.nombreCompleto,
    documentoIdentidad: this.nuevoInquilino.documentoIdentidad,
    telefono: this.nuevoInquilino.telefono,
    email: this.nuevoInquilino.email
  };

  this.inquilinoService.guardar(request).subscribe({
    next: (resp) => {

      console.log(resp);

      alert('Inquilino guardado en BD');

      this.router.navigate(['/inquilinos']);
    },

    error: (err) => {
      console.error(err);
      alert('Error al guardar');
    }
  });




}


  volver() {
    this.router.navigate(['/inquilinos']);
  }

}