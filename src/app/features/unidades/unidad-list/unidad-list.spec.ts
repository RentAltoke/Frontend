import { describe, it, expect, beforeEach, vi } from 'vitest';
import { of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';

import { UnidadList } from './unidad-list';

describe('UnidadList', () => {

  let component: UnidadList;

  let routeMock: Partial<ActivatedRoute>;
  let cdrMock: Partial<ChangeDetectorRef>;

  let inmuebleServiceMock: {
    getById: ReturnType<typeof vi.fn>;
  };

  let unidadServiceMock: {
    getByInmueble: ReturnType<typeof vi.fn>;
    delete: ReturnType<typeof vi.fn>;
  };

  let routerMock: {
    navigate: ReturnType<typeof vi.fn>;
  };

  beforeEach(() => {

    routeMock = {
      snapshot: {
        params: {
          id: 10
        }
      } as any
    };

    cdrMock = {
      detectChanges: vi.fn()
    };

    inmuebleServiceMock = {
      getById: vi.fn()
    };

    unidadServiceMock = {
      getByInmueble: vi.fn(),
      delete: vi.fn()
    };

    routerMock = {
      navigate: vi.fn()
    };

component = new UnidadList(
  routeMock as ActivatedRoute,
  cdrMock as ChangeDetectorRef,
  inmuebleServiceMock as any,
  unidadServiceMock as any,
  routerMock as unknown as Router
);

  });

  it('debe crear el componente', () => {

    expect(component)
      .toBeTruthy();

  });

  it('debe cargar inmueble y unidades en ngOnInit', () => {

    const inmuebleMock = {
      id: 10,
      nombre: 'Edificio Central'
    };

    const unidadesMock = [
      {
        id: 1,
        codigo: 'A101'
      },
      {
        id: 2,
        codigo: 'A102'
      }
    ];

    inmuebleServiceMock.getById
      .mockReturnValue(of(inmuebleMock));

    unidadServiceMock.getByInmueble
      .mockReturnValue(of(unidadesMock));

    component.ngOnInit();

    expect(component.inmuebleId)
      .toBe(10);

    expect(inmuebleServiceMock.getById)
      .toHaveBeenCalledWith(10);

    expect(unidadServiceMock.getByInmueble)
      .toHaveBeenCalledWith(10);

    expect(component.inmueble)
      .toEqual(inmuebleMock);

    expect(component.unidades)
      .toEqual(unidadesMock);

  });

  it('debe llamar detectChanges al cargar unidades', () => {

    inmuebleServiceMock.getById
      .mockReturnValue(of({}));

    unidadServiceMock.getByInmueble
      .mockReturnValue(of([]));

    component.ngOnInit();

    expect(cdrMock.detectChanges)
      .toHaveBeenCalled();

  });

  it('debe navegar a nueva unidad', () => {

    component.inmuebleId = 10;

    component.nuevaUnidad();

    expect(routerMock.navigate)
      .toHaveBeenCalledWith([
        '/unidades',
        10,
        'nueva'
      ]);

  });

  it('debe eliminar una unidad correctamente', () => {

    component.unidades = [
      {
        id: 1,
        codigo: 'A101'
      },
      {
        id: 2,
        codigo: 'A102'
      }
    ];

    unidadServiceMock.delete
      .mockReturnValue(of({}));

    component.eliminarUnidad(1);

    expect(unidadServiceMock.delete)
      .toHaveBeenCalledWith(1);

    expect(component.unidades.length)
      .toBe(1);

    expect(component.unidades[0].id)
      .toBe(2);

  });

  it('no debe eliminar otras unidades', () => {

    component.unidades = [
      {
        id: 1
      },
      {
        id: 2
      },
      {
        id: 3
      }
    ];

    unidadServiceMock.delete
      .mockReturnValue(of({}));

    component.eliminarUnidad(2);

    expect(component.unidades)
      .toEqual([
        { id: 1 },
        { id: 3 }
      ]);

  });

});