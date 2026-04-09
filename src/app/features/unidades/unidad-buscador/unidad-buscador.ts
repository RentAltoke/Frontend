import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-unidad-buscador',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './unidad-buscador.html',
  styleUrls: ['./unidad-buscador.css'],
})
export class UnidadBuscador {

  unidades = [
    { piso: '101', estado: 'Disponible' },
    { piso: '102', estado: 'Disponible' },
    { piso: '103', estado: 'Alquilado' }
  ];

}