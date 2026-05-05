
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
  // 🔥 traer unidades desde backend
  this.http.get<any[]>('http://localhost:8081/api/inmuebles/unidades').subscribe({
    next: (data) => {

      const unidadesMapeadas = data.map(row => ({
        id: row[0],
        codigo: row[1],
        tipo: row[2],
        planta: row[3],
        estado: row[4],

        inmuebleId: row[5],
        inmuebleNombre: row[6],
        direccion: row[7],

        inquilinoNombre: row[8],
        montoRenta: row[9]
      }));

      this.procesarUnidades(unidadesMapeadas);
      this.cdr.detectChanges();
    },
    error: err => console.error(err)
  });

  // 🔥 inquilinos (esto sí sigue igual)
  this.http.get<any[]>('http://localhost:8081/api/inquilinos').subscribe({
    next: (data) => {
      this.inquilinos = data;
    }
  });
}

procesarUnidades(unidades: any[]) {
  this.unidadesDisponibles = [];
  this.unidadesOcupadas = [];

  unidades.forEach(unidad => {

    const unidadData = {
      ...unidad,
      inquilino: unidad.inquilinoNombre
        ? { nombreCompleto: unidad.inquilinoNombre }
        : null,

      contrato: unidad.montoRenta
        ? {
            monto_renta_pactado: unidad.montoRenta
          }
        : null
    };

    if (unidad.estado.toLowerCase() === 'disponible') {
      this.unidadesDisponibles.push(unidadData);
    } else if (unidad.estado.toLowerCase() === 'ocupado') {
      this.unidadesOcupadas.push(unidadData);
    }
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