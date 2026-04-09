import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InquilinoService {

  private inquilinos: any[] = [];

  getAll() {
    return this.inquilinos;
  }

  add(inquilino: any) {
    inquilino.id = Date.now();
    this.inquilinos.push(inquilino);
  }

  delete(id: number) {
    this.inquilinos = this.inquilinos.filter(i => i.id !== id);
  }

  getById(id: number) {
    return this.inquilinos.find(i => i.id == id);
  }

  update(inquilino: any) {
    const index = this.inquilinos.findIndex(i => i.id === inquilino.id);
    this.inquilinos[index] = inquilino;
  }
}