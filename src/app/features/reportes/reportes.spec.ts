import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Reportes } from './reportes';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

describe('Reportes', () => {

  let component: Reportes;
  let fixture: ComponentFixture<Reportes>;

  let httpSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(async () => {

    httpSpy = jasmine.createSpyObj(
      'HttpClient',
      ['get']
    );

    httpSpy.get.and.returnValue(
      of([
        {
          codigo_recibo: 'REC-001',
          tipo_unidad: 'Departamento',
          unidad: '101',
          inmueble: 'Edificio Central',
          inquilino: 'Carlos Ruiz',
          ipc: 10,
          agua: 50,
          igv: 20,
          luz: 40,
          renta: 1000,
          mantenimiento: 80,
          otros: 0,
          total_recibo: 1200,
          codigo_inquilino: 'EXT-INQ-001',
          imagen_url: '/img.jpg'
        }
      ])
    );

    await TestBed.configureTestingModule({
      imports: [Reportes],
      providers: [
        {
          provide: HttpClient,
          useValue: httpSpy
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Reportes);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debe cargar recibos en ngOnInit', () => {
    expect(component.recibos.length).toBe(1);
  });

  it('debe calcular totalGeneral', () => {
    expect(component.totalGeneral)
      .toBe(1200);
  });

  it('debe calcular promedioTotal', () => {
    expect(component.promedioTotal)
      .toBe(1200);
  });

  it('debe copiar recibos a recibosFiltrados', () => {
    expect(component.recibosFiltrados.length)
      .toBe(1);
  });

  it('debe filtrar por código', () => {

    component.codigoFiltro = 'REC-001';

    component.filtrarRecibos();

    expect(component.recibosFiltrados.length)
      .toBe(1);
  });

  it('debe filtrar por inmueble', () => {

    component.inmuebleFiltro = 'Central';

    component.filtrarRecibos();

    expect(component.recibosFiltrados.length)
      .toBe(1);
  });

  it('debe filtrar por inquilino', () => {

    component.inquilinoFiltro = 'Carlos';

    component.filtrarRecibos();

    expect(component.recibosFiltrados.length)
      .toBe(1);
  });

  it('debe filtrar por monto mínimo y máximo', () => {

    component.minValue = 1000;
    component.maxValue = 1300;

    component.filtrarRecibos();

    expect(component.recibosFiltrados.length)
      .toBe(1);
  });

  it('no debe devolver registros fuera del rango', () => {

    component.minValue = 2000;
    component.maxValue = 3000;

    component.filtrarRecibos();

    expect(component.recibosFiltrados.length)
      .toBe(0);
  });

  it('debe ejecutar cargarRecibos()', () => {

    component.recibos = [];

    component.cargarRecibos();

    expect(component.recibos.length)
      .toBeGreaterThan(0);
  });

});