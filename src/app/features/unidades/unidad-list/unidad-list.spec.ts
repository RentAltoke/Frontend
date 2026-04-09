import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnidadList } from './unidad-list';

describe('UnidadList', () => {
  let component: UnidadList;
  let fixture: ComponentFixture<UnidadList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnidadList],
    }).compileComponents();

    fixture = TestBed.createComponent(UnidadList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
