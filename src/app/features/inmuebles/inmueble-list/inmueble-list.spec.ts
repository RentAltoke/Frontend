import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InmuebleList } from './inmueble-list';

describe('InmuebleList', () => {
  let component: InmuebleList;
  let fixture: ComponentFixture<InmuebleList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InmuebleList],
    }).compileComponents();

    fixture = TestBed.createComponent(InmuebleList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
