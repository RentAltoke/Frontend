import { describe, it, expect, beforeEach, vi } from 'vitest';
import { of, Subject } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { Caja } from './caja';

describe('Caja Component', () => {

  let component: Caja;

  let httpMock: {
    get: ReturnType<typeof vi.fn>;
  };

  let cdrMock: {
    detectChanges: ReturnType<typeof vi.fn>;
  };

  let paramMapSubject: Subject<any>;

  beforeEach(() => {

    paramMapSubject = new Subject();

    const routeMock = {
      paramMap: paramMapSubject.asObservable()
    } as ActivatedRoute;

    httpMock = {
      get: vi.fn()
    };

    cdrMock = {
      detectChanges: vi.fn()
    };

component = new Caja(
  routeMock,
  httpMock as any,
  cdrMock as unknown as ChangeDetectorRef
);
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });
//----
  it('debe cargar el id del inquilino en ngOnInit', () => {
    httpMock.get.mockReturnValue(of([]));
    const spyInquilino =
      vi.spyOn(component, 'cargarInquilino');

    const spyMovimientos =
      vi.spyOn(component, 'cargarMovimientos');

    component.ngOnInit();

    paramMapSubject.next({
      get: () => '5'
    });

    expect(component.inquilinoId).toBe(5);

    expect(spyInquilino).toHaveBeenCalled();
    expect(spyMovimientos).toHaveBeenCalled();
  });

  //-----------
  it('no debe llamar API si no existe inquilinoId en cargarInquilino', () => {

    component.inquilinoId = null;

    component.cargarInquilino();

    expect(httpMock.get).not.toHaveBeenCalled();
  });

  it('debe cargar nombre del inquilino correctamente', () => {

    component.inquilinoId = 2;

    httpMock.get.mockReturnValue(
      of([
        {
          id: 1,
          nombreCompleto: 'Juan Perez'
        },
        {
          id: 2,
          nombreCompleto: 'Maria Lopez'
        }
      ])
    );

    component.cargarInquilino();

    expect(component.inquilinoNombre)
      .toBe('Maria Lopez');
  });

  it('debe mostrar mensaje cuando no encuentra inquilino', () => {

    component.inquilinoId = 99;

    httpMock.get.mockReturnValue(
      of([
        {
          id: 1,
          nombreCompleto: 'Juan Perez'
        }
      ])
    );

    component.cargarInquilino();

    expect(component.inquilinoNombre)
      .toBe('Inquilino no encontrado');
  });

  it('no debe llamar API de movimientos si no existe inquilinoId', () => {

    component.inquilinoId = null;

    component.cargarMovimientos();

    expect(httpMock.get).not.toHaveBeenCalled();
  });

  it('debe cargar movimientos correctamente', () => {

    component.inquilinoId = 1;

    httpMock.get.mockReturnValue(
      of([
        {
          codigo: 'M001',
          fecha: '2025-01-01',
          tipo: 'INGRESO',
          categoria: 'ALQUILER',
          monto: 1000,
          descripcion: 'Pago',
          unidad: {
            codigo: 'A101',
            inmueble: {
              nombre: 'Edificio Central'
            }
          },
          cuenta: {
            banco: {
              nombre: 'BCP'
            }
          }
        }
      ])
    );

    component.cargarMovimientos();

    expect(component.movimientos.length)
      .toBe(1);

    expect(component.movimientos[0]).toEqual({
      codigo: 'M001',
      fecha: '2025-01-01',
      tipo: 'INGRESO',
      categoria: 'ALQUILER',
      monto: 1000,
      descripcion: 'Pago',
      unidad: 'A101',
      inmueble: 'Edificio Central',
      banco: 'BCP'
    });

    expect(cdrMock.detectChanges)
      .toHaveBeenCalled();
  });

  it('debe calcular ingresos, gastos y balance correctamente', () => {

    component.inquilinoId = 1;

    httpMock.get.mockReturnValue(
      of([
        {
          codigo: '1',
          tipo: 'INGRESO',
          monto: 1000
        },
        {
          codigo: '2',
          tipo: 'INGRESO',
          monto: 500
        },
        {
          codigo: '3',
          tipo: 'GASTO',
          monto: 300
        }
      ])
    );

    component.cargarMovimientos();

    expect(component.totalIngresos)
      .toBe(1500);

    expect(component.totalGastos)
      .toBe(300);

    expect(component.balance)
      .toBe(1200);
  });
//--------------
it('debe generar descarga PDF correctamente', () => {

  const blob = new Blob(['pdf']);

  component.inquilinoId = 1;

  httpMock.get.mockReturnValue(of(blob));

  const createObjectURLSpy =
    vi.spyOn(window.URL, 'createObjectURL')
      .mockReturnValue('blob:test');

  const revokeSpy =
    vi.spyOn(window.URL, 'revokeObjectURL')
      .mockImplementation(() => {});

  const anchorMock = {
    href: '',
    download: '',
    click: vi.fn()
  };

  vi.spyOn(document, 'createElement')
    .mockReturnValue(anchorMock as any);

  const appendSpy =
    vi.spyOn(document.body, 'appendChild')
      .mockImplementation(() => anchorMock as any);

  const removeSpy =
    vi.spyOn(document.body, 'removeChild')
      .mockImplementation(() => anchorMock as any);

  component.descargarPdf();

  expect(createObjectURLSpy)
    .toHaveBeenCalledWith(blob);

  expect(anchorMock.click)
    .toHaveBeenCalled();

  expect(appendSpy)
    .toHaveBeenCalled();

  expect(removeSpy)
    .toHaveBeenCalled();

  expect(revokeSpy)
    .toHaveBeenCalled();
});
//--------------

  it('no debe descargar PDF si no existe inquilinoId', () => {

    component.inquilinoId = null;

    component.descargarPdf();

    expect(httpMock.get)
      .not.toHaveBeenCalled();
  });

});