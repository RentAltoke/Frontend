import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
@Component({
  selector: 'app-caja',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './caja.html',
  styleUrls: ['./caja.css'],
})
export class Caja implements OnInit {
  totalIngresos = 0;
  totalGastos = 0;
  balance = 0;
  inquilinoId: number | null = null;

  inquilinoNombre: string = '';
  movimientos: any[] = [];

constructor(
  private route: ActivatedRoute,
  private http: HttpClient,
  private cdr: ChangeDetectorRef
) {}

ngOnInit(): void {
  this.route.paramMap.subscribe(params => {
    this.inquilinoId = Number(params.get('id'));

    console.log('Inquilino ID:', this.inquilinoId);
    this.cargarInquilino();
    this.cargarMovimientos();
  });
}

cargarInquilino() {
  if (!this.inquilinoId) return;

  this.http.get<any[]>(`${environment.apiUrl}/api/inquilinos`)
    .subscribe(data => {

      const inquilino = data.find(i => i.id === this.inquilinoId);

      this.inquilinoNombre = inquilino
        ? inquilino.nombreCompleto
        : 'Inquilino no encontrado';

    });
}

cargarMovimientos() {
  if (!this.inquilinoId) return;

  this.http.get<any[]>(`${environment.apiUrl}/api/movimientos/inquilino/${this.inquilinoId}`)
    .subscribe(data => {

      this.movimientos = data.map(m => ({
        
        codigo: m.codigo,
        fecha: m.fecha,
        tipo: m.tipo,
        categoria: m.categoria,
        monto: m.monto,
        descripcion: m.descripcion,

        unidad: m.unidad?.codigo,
        inmueble: m.unidad?.inmueble?.nombre,
        banco: m.cuenta?.banco?.nombre
      }));

      console.log(this.movimientos);
      data.forEach(m => {
  console.log(m.tipo, m.monto);
});
      this.totalIngresos = this.movimientos
        .filter(m => m.tipo === 'INGRESO')
        .reduce((sum, m) => sum + m.monto, 0);

      this.totalGastos = this.movimientos
        .filter(m => m.tipo === 'GASTO')
        .reduce((sum, m) => sum + m.monto, 0);

      this.balance = this.totalIngresos - this.totalGastos;
      console.log('Datos');
      console.log('Ingresos:', this.totalIngresos);
      console.log('Gastos:', this.totalGastos);
      console.log('Balance:', this.balance);
     this.cdr.detectChanges();
    });
}


descargarPdf() {

  if (!this.inquilinoId) return;

  this.http.get(
    `${environment.apiUrl}/api/reportes/caja/${this.inquilinoId}`,
    {
      responseType: 'blob'
    }
  ).subscribe({

    next: (blob) => {

      const url = window.URL.createObjectURL(blob);

      const a = document.createElement('a');

      a.href = url;
      a.download = `reporte-caja-${this.inquilinoId}.pdf`;

      document.body.appendChild(a);

      a.click();

      document.body.removeChild(a);

      window.URL.revokeObjectURL(url);
    },

    error: (err) => {
      console.error('Error descargando PDF', err);
    }

  });
}


}