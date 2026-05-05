import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UnidadService } from '../unidad.service';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './unidad-form.html'
})
export class UnidadForm implements OnInit {

  unidad: any = {};
  inmuebleId!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: UnidadService
  ) {}

  ngOnInit() {
    this.inmuebleId = +this.route.snapshot.params['id'];

    // 🔥 importante para backend
    this.unidad.inmueble = { id: this.inmuebleId };
  }

  guardar() {
    if (this.unidad.id) {
      // 🔥 UPDATE
      this.service.update(this.unidad.id, this.unidad).subscribe(() => {
        this.router.navigate(['/unidades', this.inmuebleId]);
      });
    } else {
      // 🔥 CREATE
      this.service.add(this.unidad).subscribe(() => {
        this.router.navigate(['/unidades', this.inmuebleId]);
      });
    }
  }
}