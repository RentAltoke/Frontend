import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InmuebleForm } from './inmueble-form';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { InmuebleService } from '../inmueble.service';
import 'jasmine';
describe('InmuebleForm', () => {

  let component: InmuebleForm;
  let fixture: ComponentFixture<InmuebleForm>;

  let routerSpy: jasmine.SpyObj<Router>;
  let serviceSpy: jasmine.SpyObj<InmuebleService>;

  beforeEach(async () => {

    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    serviceSpy = jasmine.createSpyObj(
      'InmuebleService',
      ['getById']
    );

    serviceSpy.getById.and.returnValue(
      of({
        id: 1,
        nombre: 'Edificio Central',
        tipo: 'COMERCIAL',
        ciudad: 'Lima',
        direccion: 'Av Peru',
        numero: '123',
        codigoPostal: '15001',
        descripcion: 'Prueba',
        imagenUrl: '/img.jpg'
      })
    );

    await TestBed.configureTestingModule({
      imports: [InmuebleForm],
      providers: [
        {
          provide: Router,
          useValue: routerSpy
        },
        {
          provide: InmuebleService,
          useValue: serviceSpy
        },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: {}
            }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(InmuebleForm);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debe crear el formulario', () => {
    expect(component.form).toBeDefined();
  });

  it('debe iniciar con tipo RESIDENCIAL', () => {
    expect(
      component.form.get('tipo')?.value
    ).toBe('RESIDENCIAL');
  });

  it('debe retroceder la imagen al llamar anterior()', () => {
  component.index = 1;
  component.anterior();
  expect(component.index)
    .toBe(0);
  });

it('debe asignar la imagen seleccionada al formulario', () => {
  component.index = 2;
  component.elegirImagen();
  expect(
    component.form.get('imagenUrl')?.value
  ).toBe(component.imagenes[2]);
});

it('debe navegar al listado de inmuebles', () => {

  component.volver();

  expect(routerSpy.navigate)
    .toHaveBeenCalledWith(['/inmuebles']);

});

it('debe ser inválido si nombre está vacío', () => {

  component.form.patchValue({
    nombre: ''
  });

  expect(component.form.invalid)
    .toBeTrue();

});

it('debe ser inválido si nombre está vacío', () => {

  component.form.patchValue({
    nombre: ''
  });

  expect(component.form.invalid)
    .toBeTrue();

});

});

