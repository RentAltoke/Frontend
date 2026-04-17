import { CommonModule } from '@angular/common';
import { InmuebleService } from '../inmueble.service';
import { ChangeDetectorRef,Component} from '@angular/core';
import { Router,RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './inmueble-list.html',
  styleUrls: ['./inmueble-list.css']
})
export class InmuebleList {

  inmuebles: any[] = [];

  constructor(
  private service: InmuebleService,
  private cdr: ChangeDetectorRef,
  private router: Router
) {}

async ngOnInit() {
  console.log("ENTRA INMUEBLES");

  await this.service.loadData();
  this.inmuebles = this.service.getAll();

  console.log(this.inmuebles);

  this.cdr.detectChanges(); // 🔥 SOLUCIÓN
}
nuevo() {
  this.router.navigate(['/inmuebles/nuevo']);
}

editar(id: number) {
  this.router.navigate(['/inmuebles/editar', id]);
}

  eliminar(id: number) {
    this.service.delete(id);
    this.inmuebles = this.service.getAll();
  }
}