import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UnidadService {

  private unidades: any[] = [];

  getByInmueble(inmuebleId: number) {
    return this.unidades.filter(u => u.inmuebleId == inmuebleId);
  }

  add(unidad: any) {
    unidad.id = Date.now();
    unidad.estado = 'Disponible';
    this.unidades.push(unidad);
  }

  delete(id: number) {
    this.unidades = this.unidades.filter(u => u.id !== id);
  }

  getById(id: number) {
    return this.unidades.find(u => u.id == id);
  }

  update(unidad: any) {
    const index = this.unidades.findIndex(u => u.id === unidad.id);
    this.unidades[index] = unidad;
  }

alquilar(unidadId: number, inquilinoId: number) {
  const unidad = this.getById(unidadId);

  if (unidad.estado === 'Alquilado') {
    alert('Ya está alquilado');
    return;
  }

  unidad.estado = 'Alquilado';
  unidad.inquilinoId = inquilinoId;
}

desalquilar(unidadId: number) {
  const unidad = this.getById(unidadId);

  unidad.estado = 'Disponible';
  unidad.inquilinoId = null;
}

getAll() {
  return this.unidades;
}
}

