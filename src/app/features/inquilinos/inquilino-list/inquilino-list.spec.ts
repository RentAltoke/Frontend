import { describe, it, expect, beforeEach, vi } from 'vitest';
import { of, throwError } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';

import { InquilinoListComponent } from './inquilino-list';

describe('InquilinoListComponent', () => {

  let component: InquilinoListComponent;

  let inquilinoServiceMock: {
    listar: ReturnType<typeof vi.fn>;
  };

  let cdrMock: Partial<ChangeDetectorRef>;

  beforeEach(() => {

    inquilinoServiceMock = {
      listar: vi.fn()
    };

    cdrMock = {
      detectChanges: vi.fn()
    };

    component = new InquilinoListComponent(
      inquilinoServiceMock as any,
      cdrMock as ChangeDetectorRef
    );

  });

  const mockInquilinos = [
    {
      id:1,
      codigo: 'I001',
      nombreCompleto: 'Juan Perez',
      documentoIdentidad: '12345678',
      email: 'juan@gmail.com',
      telefono: '999111222',
      tipoPersona: 'NATURAL'
    },
    {
      id:2,
      codigo: 'I002',
      nombreCompleto: 'Empresa SAC',
      documentoIdentidad: '20123456789',
      email: 'empresa@gmail.com',
      telefono: '999333444',
      tipoPersona: 'JURIDICA'
    }
  ];

  it('debe crear el componente', () => {

    expect(component).toBeTruthy();

  });

  it('debe llamar cargarInquilinos en ngOnInit', () => {

    const spy = vi.spyOn(component, 'cargarInquilinos')
      .mockImplementation(() => {});

    component.ngOnInit();

    expect(spy).toHaveBeenCalled();

  });

  it('debe cargar inquilinos correctamente', () => {

    inquilinoServiceMock.listar.mockReturnValue(
      of(mockInquilinos)
    );

    component.cargarInquilinos();

    expect(component.inquilinos)
      .toEqual(mockInquilinos);

    expect(component.inquilinosFiltrados)
      .toEqual(mockInquilinos);

  });

  it('debe llamar detectChanges', () => {

    inquilinoServiceMock.listar.mockReturnValue(
      of(mockInquilinos)
    );

    component.cargarInquilinos();

    expect(cdrMock.detectChanges)
      .toHaveBeenCalled();

  });

  it('debe manejar errores al cargar inquilinos', () => {

    const consoleSpy =
      vi.spyOn(console, 'error')
        .mockImplementation(() => {});

    inquilinoServiceMock.listar.mockReturnValue(
      throwError(() => new Error('Error'))
    );

    component.cargarInquilinos();

    expect(consoleSpy)
      .toHaveBeenCalled();

  });

  it('debe filtrar por nombre', () => {

    component.inquilinos = mockInquilinos;

    component.textoBusqueda = 'juan';

    component.filtrarInquilinos();

    expect(component.inquilinosFiltrados.length)
      .toBe(1);

  });

  it('debe filtrar por codigo', () => {

    component.inquilinos = mockInquilinos;

    component.textoBusqueda = 'I001';

    component.filtrarInquilinos();

    expect(component.inquilinosFiltrados.length)
      .toBe(1);

  });



  it('debe filtrar por email', () => {
    component.inquilinos = mockInquilinos;
    component.textoBusqueda = 'empresa@gmail.com';
    component.filtrarInquilinos();
    expect(component.inquilinosFiltrados.length)
      .toBe(1);
  });
  it('debe filtrar por telefono', () => {
    component.inquilinos = mockInquilinos;
    component.textoBusqueda = '999111222';
    component.filtrarInquilinos();
    expect(component.inquilinosFiltrados.length)
      .toBe(1);
  });
  it('debe filtrar por tipoPersona', () => {
    component.inquilinos = mockInquilinos;
    component.tipoPersonaFiltro = 'JURIDICA';
    component.filtrarInquilinos();
    expect(component.inquilinosFiltrados.length)
      .toBe(1);
    expect(component.inquilinosFiltrados[0].codigo)
      .toBe('I002');
  });
  it('debe filtrar por texto y tipoPersona', () => {
    component.inquilinos = mockInquilinos;
    component.textoBusqueda = 'empresa';
    component.tipoPersonaFiltro = 'JURIDICA';
    component.filtrarInquilinos();
    expect(component.inquilinosFiltrados.length)
      .toBe(1);
  });

  it('no debe retornar resultados si no encuentra coincidencias', () => {
    component.inquilinos = mockInquilinos;
    component.textoBusqueda = 'XXXX';
    component.filtrarInquilinos();
    expect(component.inquilinosFiltrados.length)
      .toBe(0);
  });

  it('debe mostrar todos cuando no hay filtros', () => {
    component.inquilinos = mockInquilinos;
    component.textoBusqueda = '';
    component.tipoPersonaFiltro = '';
    component.filtrarInquilinos();
    expect(component.inquilinosFiltrados.length)
      .toBe(2);
  });

});