import { TestBed } from '@angular/core/testing';

import { Inmueble } from './inmueble';

describe('Inmueble', () => {
  let service: Inmueble;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Inmueble);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
