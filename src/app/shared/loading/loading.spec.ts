import { describe, it, expect, beforeEach } from 'vitest';
import { LoadingComponent } from './loading';

describe('LoadingComponent', () => {

  let component: LoadingComponent;

  let loadingServiceMock: any;

  beforeEach(() => {

    loadingServiceMock = {};

    component = new LoadingComponent(
      loadingServiceMock
    );

  });

  it('debe crear el componente', () => {

    expect(component).toBeTruthy();

  });

  it('debe almacenar el servicio recibido por el constructor', () => {

    expect(component.loadingService)
      .toBe(loadingServiceMock);

  });

});