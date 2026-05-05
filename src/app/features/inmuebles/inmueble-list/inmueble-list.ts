import { CommonModule } from '@angular/common';
import { InmuebleService } from '../inmueble.service';
import { ChangeDetectorRef,Component,OnInit } from '@angular/core';
import { Router,RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './inmueble-list.html',
  styleUrls: ['./inmueble-list.css']
})
export class InmuebleList implements OnInit {

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
        console.log(this.inmuebles);

  this.cdr.detectChanges(); 
    });


}


  nuevo() {
    this.router.navigate(['/inmuebles/nuevo']);
  }
  editar(id: number) {
    this.router.navigate(['/inmuebles/editar', id]);
  }

    eliminar(id: number) {
    this.service.delete(id).subscribe(() => {
      // 🔥 refrescar lista después de eliminar
      this.inmuebles = this.inmuebles.filter(i => i.id !== id);
    });
  }

}