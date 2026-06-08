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

async eliminar(id: number) {
 console.log("ANTES:", this.inmueblesFiltrados.length);
  const inmueble = this.inmuebles.find(i => i.id === id);

console.log("ID recibido:", id);

this.inmuebles.forEach(i => {
  console.log(i.id, typeof i.id);
});

console.log("Tipo id:", typeof id);

  const result = await Swal.fire({
    title: 'Eliminar inmueble',
    html: `
      ¿Desea eliminar el inmueble?<br>
      <b>${inmueble?.nombre}</b>
    `,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar',
    confirmButtonColor: '#D9301C'
  });

  if (!result.isConfirmed) {
    return;
  }


 // inmueble.removing = true;

setTimeout(() => {

this.inmuebles =
  this.inmuebles.filter(i => Number(i.id) !== Number(id));

this.inmueblesFiltrados =
  this.inmueblesFiltrados.filter(i => Number(i.id) !== Number(id));
  
this.cdr.detectChanges();
 Swal.fire({
  icon: 'success',
  title: 'Inmueble eliminado',
    html: `
      <b>${inmueble.nombre}</b><br>
      fue retirado de la lista.
      `,
      confirmButtonColor: '#D9301C',
      timer: 2500,
      timerProgressBar: true
      
    });
  }, 400);
  console.log("DESPUÉS:", this.inmueblesFiltrados.length);
  this.cdr.detectChanges();

}
trackById(_: number, item: any): number {
  return item.id;
}


}