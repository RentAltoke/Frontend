import { Component, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [],
  templateUrl: './inicio.html',
  styleUrls: ['./inicio.css'],
})
export class Inicio {
  role: string = 'SECRETARIO ADMINISTRADOR';

  constructor(
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  navegarAModulo(ruta: string) {
    this.router.navigate([ruta]).then((nav) => {
      if(!nav) {
        this.cdr.detectChanges();
      }
    });
  }
}
