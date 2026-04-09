import { Component } from '@angular/core';
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
export class InmuebleForm {

  inmueble: any = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: InmuebleService
  ) {}

  async ngOnInit() {
    await this.service.loadData();

    const id = this.route.snapshot.params['id'];

    if (id) {
      this.inmueble = this.service.getById(+id);
    }
  }

  guardar() {
    if (this.inmueble.id) {
      this.service.update(this.inmueble);
    } else {
      this.service.add(this.inmueble);
    }

    this.router.navigate(['/inmuebles']);
  }
}