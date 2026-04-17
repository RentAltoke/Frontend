
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

let contratoEncontrado = null;

const inquilino = this.inquilinos.find(inq => {
  contratoEncontrado = inq.contratos?.find((c: any) =>
    c.id_unidad_alquilada === unidad.id &&
    c.id_inmueble === inmueble.id
  );
  return contratoEncontrado;
});



const unidadData = {
  ...unidad,
  inmuebleNombre: inmueble.nombre,
  inmuebleId: inmueble.id,
  inquilino: inquilino || null,
  contrato: contratoEncontrado || null
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

  const nuevoContrato = {
    id_unidad_alquilada: unidad.id,
    id_inmueble: unidad.inmuebleId,
    fecha_inicio: new Date().toISOString().split('T')[0],
    fecha_final: '2027-01-01',
    dia_pago: 5,
    monto_renta_pactado: 2000,
    moneda: 'PEN'
  };

  // 🔥 IMPORTANTE: agregar al array
  if (!inquilino.contratos) {
    inquilino.contratos = [];
  }

  inquilino.contratos.push(nuevoContrato);

  unidad.estado = 'Ocupado';
  unidad.inquilino = inquilino;
  unidad.contrato = nuevoContrato;

  this.unidadesDisponibles = this.unidadesDisponibles.filter(u => u.id !== unidad.id);
  this.unidadesOcupadas.push(unidad);

  alert(`Unidad ${unidad.letra} alquilada a ${inquilino.datos_personales.nombre_completo}`);
}


desalquilarUnidad(unidad: any) {

  const inquilino = unidad.inquilino;

  if (inquilino && inquilino.contratos) {
    inquilino.contratos = inquilino.contratos.filter((c: any) =>
      !(c.id_unidad_alquilada === unidad.id &&
        c.id_inmueble === unidad.inmuebleId)
    );
  }

  unidad.estado = 'Disponible';
  unidad.inquilino = null;
  unidad.contrato = null;

  this.unidadesOcupadas = this.unidadesOcupadas.filter(u => u.id !== unidad.id);
  this.unidadesDisponibles.push(unidad);

  alert(`Unidad ${unidad.letra} ahora está disponible`);
}
}