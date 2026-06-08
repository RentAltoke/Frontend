import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangeDetectorRef } from '@angular/core';
import { of } from 'rxjs';
import { InquilinoListComponent } from './inquilino-list';
import { InquilinoService } from '../inquilino.service';

describe('InquilinoListComponent', () => {

  let component: InquilinoListComponent;
  let fixture: ComponentFixture<InquilinoListComponent>;

  let serviceSpy: jasmine.SpyObj<InquilinoService>;
  let cdrSpy: jasmine.SpyObj<ChangeDetectorRef>;

  const mockInquilinos = [
    {
      id: 1,
      codigo: 'EXT-INQ-001',
      nombreCompleto: 'Carlos Ruiz',
      email: 'carlos@gmail.com',
      documentoIdentidad: '12345678',
      telefono: '999888777',
      tipoPersona: 'NATURAL'
    },
    {
      id: 2,
      codigo: 'EXT-INQ-002',
      nombreCompleto: 'Empresa ABC SAC',
      email: 'empresa@gmail.com',
      documentoIdentidad: '20123456789',
      telefono: '014567890',
      tipoPersona: 'JURIDICA'
    }
  ];

  beforeEach(async () => {

    serviceSpy = jasmine.createSpyObj(
      'InquilinoService',
      ['listar']
    );

    cdrSpy = jasmine.createSpyObj(
      'ChangeDetectorRef',
      ['detectChanges']
    );

    serviceSpy.listar.and.returnValue(
      of(mockInquilinos)
    );

    await TestBed.configureTestingModule({
      imports: [InquilinoListComponent],
      providers: [
        {
          provide: InquilinoService,
          useValue: serviceSpy
        },
        {
          provide: ChangeDetectorRef,
          useValue: cdrSpy
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(
      InquilinoListComponent
    );

    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debe cargar los inquilinos al iniciar', () => {

    expect(serviceSpy.listar)
      .toHaveBeenCalled();

    expect(component.inquilinos.length)
      .toBe(2);

    expect(component.inquilinosFiltrados.length)
      .toBe(2);

  });

  it('debe llamar detectChanges después de cargar', () => {

    expect(cdrSpy.detectChanges)
      .toHaveBeenCalled();

  });

  it('debe filtrar por nombre', () => {

    component.textoBusqueda = 'carlos';

    component.filtrarInquilinos();

    expect(component.inquilinosFiltrados.length)
      .toBe(1);

    expect(
      component.inquilinosFiltrados[0].nombreCompleto
    ).toContain('Carlos');

  });

  it('debe filtrar por código', () => {

    component.textoBusqueda = 'EXT-INQ-002';

    component.filtrarInquilinos();

    expect(component.inquilinosFiltrados.length)
      .toBe(1);

    expect(
      component.inquilinosFiltrados[0].codigo
    ).toBe('EXT-INQ-002');

  });

  it('debe filtrar por email', () => {

    component.textoBusqueda = 'empresa@gmail.com';

    component.filtrarInquilinos();

    expect(component.inquilinosFiltrados.length)
      .toBe(1);

  });

  it('debe filtrar por DNI o RUC', () => {

    component.textoBusqueda = '12345678';

    component.filtrarInquilinos();

    expect(component.inquilinosFiltrados.length)
      .toBe(1);

  });

  it('debe filtrar por teléfono', () => {

    component.textoBusqueda = '999888777';

    component.filtrarInquilinos();

    expect(component.inquilinosFiltrados.length)
      .toBe(1);

  });

  it('debe filtrar por tipo NATURAL', () => {

    component.tipoPersonaFiltro = 'NATURAL';

    component.filtrarInquilinos();

    expect(component.inquilinosFiltrados.length)
      .toBe(1);

    expect(
      component.inquilinosFiltrados[0].tipoPersona
    ).toBe('NATURAL');

  });

  it('debe filtrar por tipo JURIDICA', () => {

    component.tipoPersonaFiltro = 'JURIDICA';

    component.filtrarInquilinos();

    expect(component.inquilinosFiltrados.length)
      .toBe(1);

    expect(
      component.inquilinosFiltrados[0].tipoPersona
    ).toBe('JURIDICA');

  });

  it('debe filtrar por texto y tipo al mismo tiempo', () => {

    component.textoBusqueda = 'empresa';
    component.tipoPersonaFiltro = 'JURIDICA';

    component.filtrarInquilinos();

    expect(component.inquilinosFiltrados.length)
      .toBe(1);

  });

  it('debe retornar lista vacía cuando no existan coincidencias', () => {

    component.textoBusqueda = 'xxxxxxxx';

    component.filtrarInquilinos();

    expect(component.inquilinosFiltrados.length)
      .toBe(0);

  });

});