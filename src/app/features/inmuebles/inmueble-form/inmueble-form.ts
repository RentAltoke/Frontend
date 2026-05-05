import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InmuebleService } from '../inmueble.service';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './inmueble-form.html',
  styleUrls: ['./inmueble-form.css']
})
export class InmuebleForm implements OnInit {

  inmueble: any = {};
  id!: number;
imagenes: string[] = [
  '/inmuebles_nuevos/15.jpg',
  '/inmuebles_nuevos/16.jpg',
  '/inmuebles_nuevos/17.jpg',
  '/inmuebles_nuevos/18.jpg',
  
  '/inmuebles_nuevos/25.jpg',
  '/inmuebles_nuevos/26.jpg',
  '/inmuebles_nuevos/27.jpg',
  '/inmuebles_nuevos/28.jpg',

  '/inmuebles_nuevos/37.jpg',
  '/inmuebles_nuevos/38.jpg',
  '/inmuebles_nuevos/39.jpg',
  '/inmuebles_nuevos/310.jpg',

  '/inmuebles_nuevos/46.jpg',
  '/inmuebles_nuevos/47.jpg',
  '/inmuebles_nuevos/48.jpg',
  '/inmuebles_nuevos/49.jpg',
  '/inmuebles_nuevos/410.jpg',
  '/inmuebles_nuevos/411.jpg',



];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: InmuebleService
  ) {}


  seleccionarImagen(img: string) {
  this.inmueble.imagenUrl = img;
}

index: number = 0;

// 🔥 navegar
siguiente() {
  this.index = (this.index + 1) % this.imagenes.length;
}

anterior() {
  this.index = (this.index - 1 + this.imagenes.length) % this.imagenes.length;
}

// 🔥 elegir imagen
elegirImagen() {
  this.inmueble.imagenUrl = this.imagenes[this.index];
}

  ngOnInit() {
    const idParam = this.route.snapshot.params['id'];

    if (idParam) {
      this.id = +idParam;

      // 🔥 cargar desde backend
      this.service.getById(this.id).subscribe(data => {
        this.inmueble = data;
      });
    }
  }

  guardar() {
    if (this.inmueble.id) {
      // 🔥 UPDATE
      this.service.update(this.inmueble.id, this.inmueble).subscribe(() => {
        this.router.navigate(['/inmuebles']);
      });
    } else {
      // 🔥 CREATE
      this.service.add(this.inmueble).subscribe(() => {
        this.router.navigate(['/inmuebles']);
      });
    }
  }
}