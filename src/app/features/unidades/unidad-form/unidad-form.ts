import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UnidadService } from '../unidad.service';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './unidad-form.html'
})
export class UnidadForm {

  unidad: any = {};
  inmuebleId!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: UnidadService
  ) {}

  ngOnInit() {
    this.inmuebleId = +this.route.snapshot.params['id'];

    this.unidad.inmuebleId = this.inmuebleId;
  }

  guardar() {
    if (this.unidad.id) {
      this.service.update(this.unidad);
    } else {
      this.service.add(this.unidad);
    }

    this.router.navigate(['/unidades', this.inmuebleId]);
  }
}