import { TestBed } from '@angular/core/testing';

import { Unidad } from './unidad.service';

describe('Unidad', () => {
  let service: Unidad;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Unidad);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
