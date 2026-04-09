import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnidadBuscador } from './unidad-buscador';

describe('UnidadBuscador', () => {
  let component: UnidadBuscador;
  let fixture: ComponentFixture<UnidadBuscador>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnidadBuscador],
    }).compileComponents();

    fixture = TestBed.createComponent(UnidadBuscador);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
