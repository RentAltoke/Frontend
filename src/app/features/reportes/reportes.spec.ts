import { describe, it, expect, beforeEach, vi } from 'vitest';
import { of } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Reportes } from './reportes';

vi.mock('jspdf', () => ({
  default: class {
    setFillColor() {}
    rect() {}
    addImage() {}
    setTextColor() {}
    setFontSize() {}
    text() {}
    roundedRect() {}
    setDrawColor() {}
    line() {}
    save() {}

    lastAutoTable = {
      finalY: 100
    };
  }
}));

vi.mock('jspdf-autotable', () => ({
  default: () => {}
}));
describe('Reportes', () => {

let component: Reportes;
let httpMock: {get: ReturnType<typeof vi.fn>;};
let cdrMock: Partial<ChangeDetectorRef>;
beforeEach(() => {
  httpMock = {
    get: vi.fn()
  };
  cdrMock = {
    detectChanges: vi.fn()
  };
  component = new Reportes(
    httpMock as any,
    cdrMock as ChangeDetectorRef
  );
});

it('debe crear el componente', () => {
  expect(component).toBeTruthy();
});

it('debe llamar cargarRecibos en ngOnInit', () => {
  const spy =vi.spyOn(component, 'cargarRecibos').mockImplementation(() => {});
  component.ngOnInit();
  expect(spy).toHaveBeenCalled();});


it('debe cargar recibos correctamente', () => {

  httpMock.get.mockReturnValue(
    of([
      {
        codigo_recibo: 'R001',
        tipo_unidad: 'Departamento',
        unidad: '101',
        inmueble: 'Torres Lima',
        inquilino: 'Juan',
        ipc: 10,
        agua: 20,
        igv: 30,
        luz: 40,
        renta: 1000,
        mantenimiento: 50,
        otros: 5,
        total_recibo: 1155,
        codigo_inquilino: 1,
        imagen_url: 'imagen.jpg'
      }
    ])
  );

  component.cargarRecibos();

  expect(component.recibos.length)
    .toBe(1);

  expect(component.recibos[0].codigo)
    .toBe('R001');

});

it('debe calcular totalGeneral', () => {

  httpMock.get.mockReturnValue(
    of([
      { total_recibo: 100 },
      { total_recibo: 200 },
      { total_recibo: 300 }
    ])
  );

  component.cargarRecibos();

  expect(component.totalGeneral)
    .toBe(600);

});

it('debe calcular promedioTotal', () => {

  httpMock.get.mockReturnValue(
    of([
      { total_recibo: 100 },
      { total_recibo: 200 }
    ])
  );

  component.cargarRecibos();

  expect(component.promedioTotal)
    .toBe(150);

});

it('debe filtrar por codigo', () => {

  component.recibos = [
    { codigo: 'ABC123', total: 100 },
    { codigo: 'XYZ999', total: 100 }
  ];

  component.codigoFiltro = 'ABC';

  component.filtrarRecibos();

  expect(component.recibosFiltrados.length)
    .toBe(1);

});

it('debe filtrar por inmueble', () => {

  component.recibos = [
    {
      codigo:'1',
      inmueble:'Lima Center',
      inquilino:'Juan',
      total:100
    },
    {
      codigo:'2',
      inmueble:'Miraflores',
      inquilino:'Pedro',
      total:100
    }
  ];

  component.inmuebleFiltro = 'Lima';

  component.filtrarRecibos();

  expect(component.recibosFiltrados.length)
    .toBe(1);

});

//-------------------------
it('debe obtener las tres imagenes al generar PDF', async () => {
  const PNG_VALIDO =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO5X2uoAAAAASUVORK5CYII=';
  const spyImagen =
    vi.spyOn(component, 'getBase64ImageFromURL')
      .mockResolvedValue(PNG_VALIDO);
  await component.generarPDF({
    codigo: 'R001',
    cod_inquilino: 1,
    cod_inmueble: 'img.jpg',
    total: 500,
    renta: 500,
    agua: 0,
    luz: 0,
    mantenimiento: 0,
    ipc: 0,
    igv: 0,
    otros: 0,
    inquilino: 'Juan',
    unidad: '101',
    inmueble: 'Edificio'
  });

  expect(spyImagen)
    .toHaveBeenCalledTimes(3);

});
//--------------------------
});