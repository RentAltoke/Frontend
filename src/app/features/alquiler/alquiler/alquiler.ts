import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-alquiler',
  standalone: true,
    imports: [CommonModule, FormsModule],
  templateUrl: './alquiler.html',
  styleUrls: ['./alquiler.css']

})

export class Alquiler implements OnInit {
estadoFiltro: string = '';
inmuebleFiltro: string = '';
inquilinoFiltro: string = '';
unidadFiltro: string = '';

  inmuebles: any[] = [];
  inquilinos: any[] = [];
  unidadesDisponibles: any[] = [];
  unidadesOcupadas: any[] = [];
  seleccionInquilino: { [key: number]: number | null } = {};





  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargarDatos();
  }

cargarDatos() {

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


  this.http.get<any[]>('http://localhost:8081/api/inquilinos').subscribe({
    next: (data) => {
      this.inquilinos = data;
    }
  });
}

get mostrarDisponibles(): boolean {
  return this.estadoFiltro === '' || this.estadoFiltro === 'Disponible';
}

get mostrarOcupadas(): boolean {
  return this.estadoFiltro === '' || this.estadoFiltro === 'Ocupado';
}

get unidadesFiltradas() {

  const todas = [
    ...this.unidadesDisponibles,
    ...this.unidadesOcupadas
  ];

  return todas.filter(u => {

    const cumpleEstado =
      !this.estadoFiltro ||
      u.estado.toLowerCase() === this.estadoFiltro.toLowerCase();

    const cumpleInmueble =
      !this.inmuebleFiltro ||
      u.inmuebleNombre
        .toLowerCase()
        .includes(this.inmuebleFiltro.toLowerCase());

    const cumpleInquilino =
      !this.inquilinoFiltro ||
      (u.inquilino?.nombreCompleto || '')
        .toLowerCase()
        .includes(this.inquilinoFiltro.toLowerCase());

    const cumpleUnidad =
      !this.unidadFiltro ||
      u.codigo
        .toLowerCase()
        .includes(this.unidadFiltro.toLowerCase());

    return (
      cumpleEstado &&
      cumpleInmueble &&
      cumpleInquilino &&
      cumpleUnidad
    );
  });
}

get disponiblesFiltradas() {
  console.log("GET DISPONIBLES");
  return this.unidadesDisponibles.filter(u => {

    const inmueble =
      !this.inmuebleFiltro ||
      u.inmuebleNombre.toLowerCase()
      .includes(this.inmuebleFiltro.toLowerCase());

    const unidad =
      !this.unidadFiltro ||
      u.codigo.toLowerCase()
      .includes(this.unidadFiltro.toLowerCase());

    return inmueble && unidad;
  });
}

get ocupadasFiltradas() {
  return this.unidadesOcupadas.filter(u => {

    
    const inmueble =
      !this.inmuebleFiltro ||
      u.inmuebleNombre.toLowerCase()
      .includes(this.inmuebleFiltro.toLowerCase());

    const unidad =
      !this.unidadFiltro ||
      u.codigo.toLowerCase()
      .includes(this.unidadFiltro.toLowerCase());

    const inquilino =
      !this.inquilinoFiltro ||
      (u.inquilino?.nombreCompleto || '')
      .toLowerCase()
      .includes(this.inquilinoFiltro.toLowerCase());

    return inmueble && unidad && inquilino;
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

}
else if (
  unidad.estado.toLowerCase() === 'ocupado' &&
  unidad.inquilinoNombre
) {

  this.unidadesOcupadas.push(unidadData);

}
  });

  unidades.forEach(unidad => {

  console.log(
    unidad.codigo,
    unidad.estado,
    unidad.inquilinoNombre
  );

});

}

async  alquilarUnidad(unidad: any) {

  
  const inquilinoId = this.seleccionInquilino[unidad.id];

  if (inquilinoId == null) {
    alert('Selecciona un inquilino');
    return;
  }

  const inquilino = this.inquilinos.find(i => i.id === inquilinoId);

  if (!inquilino) {
    alert('No se encontró el inquilino');
    return;
  }

  const nuevoContrato = {
    id_unidad_alquilada: unidad.id,
    id_inmueble: unidad.inmuebleId,
    fecha_inicio: new Date().toISOString().split('T')[0],
    fecha_final: '2027-01-01',
    dia_pago: 5,
    monto_renta_pactado: 2000,
    moneda: 'PEN'
  };

  if (!inquilino.contratos) {
    inquilino.contratos = [];
  }

  inquilino.contratos.push(nuevoContrato);

  unidad.estado = 'Ocupado';
  unidad.inquilino = inquilino;
  unidad.contrato = nuevoContrato;

  this.unidadesDisponibles = this.unidadesDisponibles.filter(u => u.id !== unidad.id);
  this.unidadesOcupadas.push(unidad);

  alert(`Unidad ${unidad.codigo} alquilada a ${inquilino.nombreCompleto}`);
}


async desalquilarUnidad(unidad: any) {

    const result = await Swal.fire({
    title: 'Liberar unidad',
    text: `¿Desea desalquilar la unidad ${unidad.codigo}?`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, desalquilar',
    cancelButtonText: 'Cancelar',
    confirmButtonColor: '#D9301C'
  });

  if (!result.isConfirmed) {
    return;
  }
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

this.unidadesOcupadas =this.unidadesOcupadas.filter(u => u.id !== unidad.id);
this.unidadesDisponibles = [...this.unidadesDisponibles,unidad];
this.cdr.detectChanges();
  Swal.fire({
  icon: 'info',
  title: 'Unidad liberada',
  html: `
    La unidad <b>${unidad.codigo}</b><br>
    ahora se encuentra disponible.
  `,
  confirmButtonText: 'Aceptar',
  confirmButtonColor: '#D9301C',
  background: '#ffffff',
  color: '#1E293B'
});
}

trackByUnidadId(_: number, unidad: any): number {
  return unidad.id;
}



}