import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InmuebleForm } from './inmueble-form';

describe('InmuebleForm', () => {
  let component: InmuebleForm;
  let fixture: ComponentFixture<InmuebleForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InmuebleForm],
    }).compileComponents();

    fixture = TestBed.createComponent(InmuebleForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
