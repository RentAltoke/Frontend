import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InmuebleService {

  private inmuebles: any[] = [];

  // 🔥 cargar JSON UNA sola vez
async loadData() {
  if (this.inmuebles.length === 0) {

    let url = '';

    if (typeof window !== 'undefined') {
      // 🌐 navegador
      url = '/data/inmuebles.json';
    } else {
      // 🖥️ SSR (Node)
      url = 'http://localhost:4200/data/inmuebles.json';
    }

    const res = await fetch(url);
    this.inmuebles = await res.json();
  }
}

  getAll() {
    return this.inmuebles;
  }

  add(inmueble: any) {
    inmueble.id = Date.now();
    this.inmuebles.push(inmueble);
  }

  delete(id: number) {
    this.inmuebles = this.inmuebles.filter(i => i.id !== id);
  }

  getById(id: number) {
    return this.inmuebles.find(i => i.id == id);
  }

  update(inmueble: any) {
    const index = this.inmuebles.findIndex(i => i.id === inmueble.id);
    this.inmuebles[index] = inmueble;
  }
}