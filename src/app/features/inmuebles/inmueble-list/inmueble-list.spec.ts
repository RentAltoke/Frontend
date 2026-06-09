import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InmuebleList } from './inmueble-list';
import { provideRouter } from '@angular/router';
import { provideLocationMocks } from '@angular/common/testing';
import { InmuebleService } from '../inmueble.service';
import { of } from 'rxjs';

// Mock del servicio para no hacer llamadas reales al backend
const inmuebleServiceMock = {
  getAll: () => of([]) // retorna un observable vacío
};

describe('InmuebleList', () => {
  let component: InmuebleList;
  let fixture: ComponentFixture<InmuebleList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InmuebleList],
      providers: [
        provideRouter([]),
        provideLocationMocks(),
        { provide: InmuebleService, useValue: inmuebleServiceMock }, // 👈 reemplaza el servicio real
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(InmuebleList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});