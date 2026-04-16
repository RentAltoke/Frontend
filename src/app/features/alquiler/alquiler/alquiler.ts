import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-alquiler',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './alquiler.html',
  styleUrls: ['./alquiler.css']
})


export class Alquiler implements OnInit {

  inmuebles: any[] = [];
  inquilinos: any[] = [];

  unidadesDisponibles: any[] = [];
  unidadesOcupadas: any[] = [];

  seleccionInquilino: { [key: number]: string } = {};

  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos() {
    this.http.get<any[]>('/data/inmuebles.json').subscribe({
      next: (inmueblesData) => {
        this.http.get<any>('/data/inquilinos.json').subscribe({
          next: (inquilinosData) => {
            this.inmuebles = inmueblesData;
            this.inquilinos = inquilinosData.inquilinos;

            this.procesarUnidades();
            this.cdr.detectChanges();
          }
        });
      }
    });
  }

  procesarUnidades() {
    this.unidadesDisponibles = [];
    this.unidadesOcupadas = [];

    this.inmuebles.forEach(inmueble => {
      inmueble.unidades.forEach((unidad: any) => {

        const inquilino = this.inquilinos.find(inq =>
          inq.contrato.id_unidad_alquilada === unidad.id &&
          inq.contrato.id_inmueble === inmueble.id
        );

        const unidadData = {
          ...unidad,
          inmuebleNombre: inmueble.nombre,
          inmuebleId: inmueble.id,
          inquilino: inquilino || null
        };

        if (unidad.estado.toLowerCase() === 'disponible') {
          this.unidadesDisponibles.push(unidadData);
        } else if (unidad.estado.toLowerCase() === 'ocupado') {
          this.unidadesOcupadas.push(unidadData);
        }
      });
    });
  }

  alquilarUnidad(unidad: any) {
    const inquilinoId = this.seleccionInquilino[unidad.id];

    if (!inquilinoId) {
      alert('Selecciona un inquilino');
      return;
    }

    const inquilino = this.inquilinos.find(i => i.id === inquilinoId);

    unidad.estado = 'Ocupado';
    unidad.inquilino = inquilino;

    this.unidadesDisponibles = this.unidadesDisponibles.filter(u => u.id !== unidad.id);
    this.unidadesOcupadas.push(unidad);

    alert(`Unidad ${unidad.letra} alquilada a ${inquilino.datos_personales.nombre_completo}`);
  }

  desalquilarUnidad(unidad: any) {
    unidad.estado = 'Disponible';
    unidad.inquilino = null;

    this.unidadesOcupadas = this.unidadesOcupadas.filter(u => u.id !== unidad.id);
    this.unidadesDisponibles.push(unidad);

    alert(`Unidad ${unidad.letra} ahora está disponible`);
  }
}