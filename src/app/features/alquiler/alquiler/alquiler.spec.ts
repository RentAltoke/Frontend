import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, } from '@angular/core';
import { of } from 'rxjs';
import { describe, beforeEach, it, expect, vi } from 'vitest';
import Swal from 'sweetalert2';

import { Alquiler } from './alquiler';

vi.mock('sweetalert2', () => ({
  default: {
    fire: vi.fn()
  }
}));

describe('Alquiler Component', () => {

  let component: Alquiler;
  let fixture: ComponentFixture<Alquiler>;

  const httpMock = {
    get: vi.fn()
  };

  const cdrMock = {
    detectChanges: vi.fn()
  };

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [Alquiler],
      providers: [
        { provide: HttpClient, useValue: httpMock },
        { provide: ChangeDetectorRef, useValue: cdrMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Alquiler);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });


  it('mostrarDisponibles debe retornar true cuando no hay filtro', () => {

    component.estadoFiltro = '';

    expect(component.mostrarDisponibles).toBe(true);
  });

  it('mostrarDisponibles debe retornar true cuando filtro es Disponible', () => {

    component.estadoFiltro = 'Disponible';

    expect(component.mostrarDisponibles).toBe(true);
  });

  it('mostrarDisponibles debe retornar false cuando filtro es Ocupado', () => {

    component.estadoFiltro = 'Ocupado';

    expect(component.mostrarDisponibles).toBe(false);
  });

  it('mostrarOcupadas debe retornar true cuando filtro es Ocupado', () => {

    component.estadoFiltro = 'Ocupado';

    expect(component.mostrarOcupadas).toBe(true);
  });

  it('trackByUnidadId debe retornar el id', () => {

    const unidad = {
      id: 100
    };

    expect(component.trackByUnidadId(0, unidad))
      .toBe(100);
  });




  //--------------------
it('debe separar unidades disponibles y ocupadas', () => {

  const data = [

    {
      id: 1,
      codigo: '101',
      estado: 'Disponible',
      inmuebleNombre: 'Edificio A'
    },

    {
      id: 2,
      codigo: '102',
      estado: 'Ocupado',
      inmuebleNombre: 'Edificio A',
      inquilinoNombre: 'Juan',
      montoRenta: 1500
    }
  ];

  component.procesarUnidades(data);

  expect(component.unidadesDisponibles.length)
    .toBe(1);

  expect(component.unidadesOcupadas.length)
    .toBe(1);

  expect(
    component.unidadesOcupadas[0].inquilino.nombreCompleto
  ).toBe('Juan');
});
  //--------------------
it('debe filtrar por estado', () => {

  component.unidadesDisponibles = [
    {
      id: 1,
      estado: 'Disponible',
      codigo: '101',
      inmuebleNombre: 'A'
    }
  ];

  component.unidadesOcupadas = [
    {
      id: 2,
      estado: 'Ocupado',
      codigo: '102',
      inmuebleNombre: 'B',
      inquilino: {
        nombreCompleto: 'Carlos'
      }
    }
  ];

  component.estadoFiltro = 'Ocupado';

  const resultado = component.unidadesFiltradas;

  expect(resultado.length).toBe(1);
  expect(resultado[0].id).toBe(2);
});
  //--------------------
  //--------------------
  it('debe mostrar alerta si no se selecciona inquilino', async () => {

  const unidad = {
    id: 1
  };

  await component.alquilarUnidad(unidad);

  expect(Swal.fire).toHaveBeenCalled();
});
  //--------------------
it('debe desalquilar una unidad correctamente', async () => {

  const unidad = {

    id: 1,
    codigo: '101',
    inmuebleId: 10,
    estado: 'Ocupado',

    inquilino: {
      contratos: [
        {
          id_unidad_alquilada: 1,
          id_inmueble: 10
        }
      ]
    },

    contrato: {}
  };

  component.unidadesOcupadas = [unidad];

  vi.mocked(Swal.fire)
    .mockResolvedValueOnce({
      isConfirmed: true
    } as any)
    .mockResolvedValueOnce({} as any);

  await component.desalquilarUnidad(unidad);

  expect(unidad.estado)
    .toBe('Disponible');

  expect(unidad.inquilino)
    .toBeNull();

  expect(component.unidadesDisponibles.length)
    .toBe(1);

  expect(component.unidadesOcupadas.length)
    .toBe(0);
});

});