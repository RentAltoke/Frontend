
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-inquilino-list',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './inquilino-list.html',
  styleUrls: ['./inquilino-list.css'],
})
export class InquilinoListComponent implements OnInit {
  inquilinos: any[] = [];

  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef 
  ) { }

  ngOnInit(): void {
    this.cargarInquilinos();
  }

  cargarInquilinos() {
    this.http.get<any>('data/inquilinos.json').subscribe({
      next: (data) => {
        this.inquilinos = data.inquilinos;
        
        this.cdr.detectChanges(); 
      },
      error: (err) => {
        console.error('Error al cargar inquilinos:', err);
      }
    });
  }
}