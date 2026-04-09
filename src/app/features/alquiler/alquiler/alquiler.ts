import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UnidadService } from '../../unidades/unidad.service';
import { InquilinoService } from '../../inquilinos/inquilino.service';
@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './alquiler.html'
})
export class Alquiler {

  unidades: any[] = [];
  inquilinos: any[] = [];

  unidadId!: number;
  inquilinoId!: number;

  constructor(
    private unidadService: UnidadService,
    private inquilinoService: InquilinoService
  ) {}

  ngOnInit() {
    this.unidades = this.unidadService.getAll().filter((u: any) => u.estado === 'Disponible');
    this.inquilinos = this.inquilinoService.getAll();
  }

  alquilar() {
    this.unidadService.alquilar(this.unidadId, this.inquilinoId);
    alert('Alquilado correctamente');
  }

  desalquilar() {
    this.unidadService.desalquilar(this.unidadId);
    alert('Desalquilado');
  }
}