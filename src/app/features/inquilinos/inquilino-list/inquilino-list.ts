import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { InquilinoService, Inquilino } from '../inquilino.service';

@Component({
  selector: 'app-inquilino-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './inquilino-list.html',
  styleUrls: ['./inquilino-list.css'],
})
export class InquilinoListComponent implements OnInit {

  inquilinos: Inquilino[] = [];

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
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al cargar inquilinos:', err);
      }
    });
   
  }


}