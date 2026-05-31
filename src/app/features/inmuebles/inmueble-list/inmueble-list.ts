import { CommonModule } from '@angular/common';
import { InmuebleService } from '../inmueble.service';
import { ChangeDetectorRef,Component,OnInit } from '@angular/core';
import { Router,RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
@Component({
  standalone: true,
  imports: [CommonModule, RouterModule,FormsModule],
  templateUrl: './inmueble-list.html',
  styleUrls: ['./inmueble-list.css']
})
export class InmuebleList implements OnInit {
  inmueblesFiltrados: any[] = [];
  textoBusqueda: string = '';
  inmuebles: any[] = [];

  constructor(
    private service: InmuebleService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  async ngOnInit() {
    console.log("ENTRA INMUEBLES");
    this.service.getAll().subscribe(data => {
      this.inmuebles = data;
      this.inmueblesFiltrados = [...data];
      console.log(this.inmuebles);
      this.cdr.detectChanges(); 
    });
  }

  filtrarInmuebles() {

  const texto = this.textoBusqueda.toLowerCase();

  this.inmueblesFiltrados = this.inmuebles.filter(i =>
      i.nombre?.toLowerCase().includes(texto) ||
      i.ciudad?.toLowerCase().includes(texto) ||
      i.direccion?.toLowerCase().includes(texto) ||
      i.tipo?.toLowerCase().includes(texto)
  );

  }

  nuevo() {
    this.router.navigate(['/inmuebles/nuevo']);
  }

  editar(id: number) {
    this.router.navigate(['/inmuebles/editar', id]);
  }

  eliminar(id: number) {
    this.service.delete(id).subscribe(() => {
      this.inmuebles = this.inmuebles.filter(i => i.id !== id);
    });
  }
}