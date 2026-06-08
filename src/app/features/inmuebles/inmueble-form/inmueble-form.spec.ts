import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { InmuebleService } from '../inmueble.service';
import { FormBuilder } from '@angular/forms';
import { vi } from 'vitest';
import Swal from 'sweetalert2';

import { InmuebleForm } from './inmueble-form';
const mocks = vi.hoisted(() => ({
  fireMock: vi.fn(() =>
    Promise.resolve({ isConfirmed: true })
  )
}));

vi.mock('sweetalert2', () => ({
  default: {
    fire: mocks.fireMock
  }
}));


let component: InmuebleForm;

let routerMock: {
  navigate: ReturnType<typeof vi.fn>;
};

let serviceMock: {
  getById: ReturnType<typeof vi.fn>;
};

beforeEach(() => {

  routerMock = {
    navigate: vi.fn()
  };

  serviceMock = {
    getById: vi.fn()
  };

  component = new InmuebleForm(
    new FormBuilder(),
    {
      snapshot: {
        params: {}
      }
    } as any,
    routerMock as any,
    serviceMock as any
  );

});

it('debe crear el componente', () => {

  expect(component)
    .toBeTruthy();

});

it('debe crear el formulario', () => {

  component.ngOnInit();

  expect(component.form)
    .toBeDefined();

});

it('debe seleccionar imagen', () => {

  component.seleccionarImagen('/foto.jpg');

  expect(component.inmueble.imagenUrl)
    .toBe('/foto.jpg');

});

it('debe retroceder imagen', () => {

  component.index = 0;

  component.anterior();

  expect(component.index)
    .toBe(component.imagenes.length - 1);

});

it('debe avanzar imagen', () => {

  component.index = 0;

  component.siguiente();

  expect(component.index)
    .toBe(1);

});

it('debe cargar inmueble por id', () => {

  component = new InmuebleForm(
    new FormBuilder(),
    {
      snapshot: {
        params: {
          id: 5
        }
      }
    } as any,
    routerMock as any,
    serviceMock as any
  );

  serviceMock.getById.mockReturnValue(
    of({
      nombre: 'Edificio Central',
      tipo: 'RESIDENCIAL',
      ciudad: 'Lima',
      direccion: 'Av Peru',
      numero: '123',
      codigoPostal: '15001',
      descripcion: 'Desc',
      imagenUrl: '/foto.jpg'
    })
  );

  component.ngOnInit();

  expect(serviceMock.getById)
    .toHaveBeenCalledWith(5);

});


//--



