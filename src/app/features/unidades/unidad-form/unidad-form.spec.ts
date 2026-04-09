import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnidadForm } from './unidad-form';

describe('UnidadForm', () => {
  let component: UnidadForm;
  let fixture: ComponentFixture<UnidadForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnidadForm],
    }).compileComponents();

    fixture = TestBed.createComponent(UnidadForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
