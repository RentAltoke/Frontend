import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { InquilinoService, Inquilino } from '../inquilino.service';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-inquilino-list',
  standalone: true,
 imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './inquilino-list.html',
  styleUrls: ['./inquilino-list.css'],
})
export class InquilinoListComponent implements OnInit {

  inquilinos: Inquilino[] = [];
  inquilinosFiltrados: Inquilino[] = [];

  textoBusqueda = '';
  tipoPersonaFiltro = '';
  constructor(private inquilinoService: InquilinoService,
              private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargarInquilinos();

  }

  cargarInquilinos() {
    this.inquilinoService.listar().subscribe({
      next: (data) => {
        this.inquilinos = data;
        this.inquilinosFiltrados = [...data];
        
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al cargar inquilinos:', err);
      }
    });
  }

  filtrarInquilinos(): void {

  const texto = this.textoBusqueda.toLowerCase();

  this.inquilinosFiltrados = this.inquilinos.filter(inq => {

    const coincideTexto =

      inq.nombreCompleto?.toLowerCase().includes(texto) ||

      inq.codigo?.toLowerCase().includes(texto) ||

      inq.documentoIdentidad?.toLowerCase().includes(texto) ||

      inq.email?.toLowerCase().includes(texto) ||

      inq.telefono?.toLowerCase().includes(texto);

    const coincideTipo =

      !this.tipoPersonaFiltro ||

      inq.tipoPersona === this.tipoPersonaFiltro;

    return coincideTexto && coincideTipo;

  });

}
}