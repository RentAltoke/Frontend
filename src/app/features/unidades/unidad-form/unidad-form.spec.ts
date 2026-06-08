import { describe, it, expect, beforeEach, vi } from 'vitest';
import { of } from 'rxjs';

import { UnidadForm } from './unidad-form';
import { ActivatedRoute, Router } from '@angular/router';

describe('UnidadForm', () => {

  let component: UnidadForm;

  let routeMock: Partial<ActivatedRoute>;
  let routerMock: Partial<Router>;

  let serviceMock: {
    add: ReturnType<typeof vi.fn>;
    update: ReturnType<typeof vi.fn>;
  };

  beforeEach(() => {

routeMock = {
  snapshot: {
    params: {
      id: 10
    }
  }
} as any;

    routerMock = {
      navigate: vi.fn()
    };

    serviceMock = {
      add: vi.fn(),
      update: vi.fn()
    };

    component = new UnidadForm(
      routeMock as ActivatedRoute,
      routerMock as Router,
      serviceMock as any
    );

  });

  it('debe crear el componente', () => {

    expect(component).toBeTruthy();

  });

  it('debe cargar inmuebleId en ngOnInit', () => {

    component.ngOnInit();

    expect(component.inmuebleId)
      .toBe(10);

  });

  it('debe asignar inmueble a la unidad en ngOnInit', () => {

    component.ngOnInit();

    expect(component.unidad.inmueble)
      .toEqual({
        id: 10
      });

  });

  it('debe actualizar una unidad existente', () => {

    component.inmuebleId = 10;

    component.unidad = {
      id: 5,
      codigo: 'A101'
    };

    serviceMock.update.mockReturnValue(
      of({})
    );

    component.guardar();

    expect(serviceMock.update)
      .toHaveBeenCalledWith(
        5,
        component.unidad
      );

  });

  it('debe navegar despues de actualizar', () => {

    component.inmuebleId = 10;

    component.unidad = {
      id: 5
    };

    serviceMock.update.mockReturnValue(
      of({})
    );

    component.guardar();

    expect(routerMock.navigate)
      .toHaveBeenCalledWith([
        '/unidades',
        10
      ]);

  });

  it('debe agregar una nueva unidad', () => {

    component.inmuebleId = 10;

    component.unidad = {
      codigo: 'A101'
    };

    serviceMock.add.mockReturnValue(
      of({})
    );

    component.guardar();

    expect(serviceMock.add)
      .toHaveBeenCalledWith(
        component.unidad
      );

  });

  it('debe navegar despues de agregar', () => {

    component.inmuebleId = 10;

    component.unidad = {};

    serviceMock.add.mockReturnValue(
      of({})
    );

    component.guardar();

    expect(routerMock.navigate)
      .toHaveBeenCalledWith([
        '/unidades',
        10
      ]);

  });

  it('debe volver a la lista de unidades', () => {

    component.inmuebleId = 10;

    component.volver();

    expect(routerMock.navigate)
      .toHaveBeenCalledWith([
        '/unidades',
        10
      ]);

  });

});