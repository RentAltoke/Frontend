import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { InmuebleService } from '../../inmuebles/inmueble.service';
import { ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { UnidadService } from '../unidad.service';
@Component({
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './unidad-list.html',
  styleUrls: ['./unidad-list.css']
})
export class UnidadList {

  unidades: any[] = [];
  inmueble: any;
  inmuebleId!: number;
constructor(
  private route: ActivatedRoute,
  private inmuebleService: InmuebleService,
  private cdr: ChangeDetectorRef,
  private router: Router,
  private unidadService: UnidadService,
) {}

async ngOnInit() {
  this.inmuebleId = +this.route.snapshot.params['id'];

  await this.inmuebleService.loadData();

  this.inmueble = this.inmuebleService.getById(this.inmuebleId);
  this.unidades = this.inmueble?.unidades || [];

  this.cdr.detectChanges(); // 🔥 CLAVE
}

  nuevaUnidad() {
    this.router.navigate(['/unidades', this.inmuebleId, 'nueva']);
  }

eliminarUnidad(uid: number) {
  // eliminar directamente del inmueble
  this.inmueble.unidades = this.inmueble.unidades.filter(
    (u: any) => u.id !== uid
  );

  // guardar cambios
  this.inmuebleService.update(this.inmueble);

  // refrescar vista
  this.unidades = [...this.inmueble.unidades];
}

}