import { Component,ChangeDetectorRef,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { InmuebleService } from '../../inmuebles/inmueble.service';
import { UnidadService } from '../unidad.service';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './unidad-list.html',
  styleUrls: ['./unidad-list.css']
})
export class UnidadList implements OnInit {

  unidades: any[] = [];
  inmueble: any;
  inmuebleId!: number;

  constructor(
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private inmuebleService: InmuebleService,
    private unidadService: UnidadService,
    private router: Router
  ) {}

  ngOnInit() {
    this.inmuebleId = +this.route.snapshot.params['id'];

    this.inmuebleService.getById(this.inmuebleId).subscribe(data => {
      this.inmueble = data;
    });

    this.unidadService.getByInmueble(this.inmuebleId).subscribe(data => {
      this.unidades = data;
      this.cdr.detectChanges(); 
    });
  

  }

  nuevaUnidad() {
    this.router.navigate(['/unidades', this.inmuebleId, 'nueva']);
  }

  eliminarUnidad(uid: number) {
    this.unidadService.delete(uid).subscribe(() => {
      this.unidades = this.unidades.filter(u => u.id !== uid);
    });
  }
}