import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // 🔥 IMPORTANTE
import { Router } from '@angular/router';
@Component({
  selector: 'app-inquilino-form',
  standalone: true,
  imports: [CommonModule, FormsModule], // 🔥 AQUÍ
  templateUrl: './inquilino-form.html',
  styleUrls: ['./inquilino-form.css']
})
export class InquilinoForm {

nuevoInquilino = {
    id: '',
    tipo_persona: 'NATURAL',
    datos_personales: {
      nombre_completo: '',
      documento_identidad: '',
      telefono: '',
      email: ''
    },
    contrato: {
      id_unidad_alquilada: null,
      id_inmueble: null,
      fecha_inicio: '',
      dia_pago: 5,
      monto_renta_pactado: 0,
      moneda: 'PEN'
    }
  };

  constructor(private router: Router) {}

  guardarInquilino() {
    // Aquí iría la lógica para enviar al backend
    console.log('Guardando inquilino:', this.nuevoInquilino);
    
    // Simulación de éxito y regreso a la lista
    alert('Inquilino registrado con éxito');
    this.router.navigate(['/inquilinos']);
  }

  cancelar() {
    this.router.navigate(['/inquilinos']);
  }

}