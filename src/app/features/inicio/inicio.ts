import { Component, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router'; // Asegúrate de tener el router
@Component({
  selector: 'app-inicio',
  imports: [],
  templateUrl: './inicio.html',
  styleUrl: './inicio.css',
})
export class Inicio {
role: string = 'SECRETARIO ADMINISTRADOR';
constructor(
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  // Esta es la función que debes llamar desde el (click) en tu HTML
  navegarAModulo(ruta: string) {
    this.router.navigate([ruta]).then((nav) => {
      if(nav) {
        console.log('Navegación exitosa');
      } else {
        // Si la navegación falla o se queda "pegada", forzamos el chequeo
        this.cdr.detectChanges();
      }
    }).catch(err => {
      console.error(err);
      this.cdr.detectChanges();
    });

    // TIP EXTRA: A veces, envolverlo en un microtask ayuda a sincronizar la UI
    this.cdr.detectChanges(); 
  }
}
