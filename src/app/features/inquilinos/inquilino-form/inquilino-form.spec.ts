import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InquilinoForm } from './inquilino-form';

describe('InquilinoForm', () => {
  let component: InquilinoForm;
  let fixture: ComponentFixture<InquilinoForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InquilinoForm],
    }).compileComponents();

    fixture = TestBed.createComponent(InquilinoForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
