import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-inquilino-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './inquilino-list.html',
  styleUrls: ['./inquilino-list.css'],
})
export class InquilinoList {

  inquilinos = [
    { nombre: 'Juan', dni: '12345678' },
    { nombre: 'Ana', dni: '87654321' }
  ];

}