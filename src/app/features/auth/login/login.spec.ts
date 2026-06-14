import { describe, it, expect, beforeEach, vi } from 'vitest';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { of, throwError } from 'rxjs';

import { Login } from './login';
import { AuthService } from '../auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

describe('Login Component', () => {

  let component: Login;
  let fixture: ComponentFixture<Login>;

  let authServiceMock: any;
  let routerMock: any;
  let routeMock: any;
  let httpMock: any;

  beforeEach(async () => {

    authServiceMock = {
      login: vi.fn(),
      isLoggedIn: vi.fn()
    };

    routerMock = {
      navigate: vi.fn()
    };

    routeMock = {
      snapshot: {
        queryParams: {}
      }
    };

    httpMock = {};

    await TestBed.configureTestingModule({
      imports: [Login],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock },
        { provide: ActivatedRoute, useValue: routeMock },
        { provide: HttpClient, useValue: httpMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Login);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    vi.clearAllMocks();//limpia despues de cada prueba
  });

  it('debe crear el componente', () => {

    expect(component).toBeTruthy();

  });

  //----------------
it('debe redirigir a /inicio si ya está logueado', () => {
  authServiceMock.isLoggedIn.mockReturnValue(true);
  component.ngOnInit();
  expect(routerMock.navigate)
    .toHaveBeenCalledWith(['/inicio']);
});

it('no debe redirigir si no está logueado', () => {
  authServiceMock.isLoggedIn.mockReturnValue(false);
  component.ngOnInit();
  expect(routerMock.navigate)
    .not.toHaveBeenCalled();
});

it('debe mostrar error cuando usuario está vacío', () => {
  component.userInput = '';
  component.passwordInput = '12345678';
  component.login();
  expect(component.errorMessage)
    .toBe('Ingrese datos válidos');
  expect(authServiceMock.login)
    .not.toHaveBeenCalled();
});

it('debe mostrar error cuando contraseña es muy corta', () => {
  component.userInput = 'admin@test.com';
  component.passwordInput = '123';
  component.login();
  expect(component.errorMessage)
    .toBe('Ingrese datos válidos');
  expect(authServiceMock.login)
    .not.toHaveBeenCalled();
});

it('debe llamar authService.login', () => {
  authServiceMock.login.mockReturnValue(
    of({})
  );
  component.userInput = 'admin@test.com';
  component.passwordInput = '12345678';
  component.login();
  expect(authServiceMock.login)
    .toHaveBeenCalledWith({
      email: 'admin@test.com',
      password: '12345678'
    });
});

it('debe navegar a /inicio cuando login es exitoso', () => {
  authServiceMock.login.mockReturnValue(
    of({})
  );
  component.userInput = 'admin@test.com';
  component.passwordInput = '12345678';
  component.login();
  expect(routerMock.navigate)
    .toHaveBeenCalledWith(['/inicio']);
});

it('debe mostrar error cuando login falla', () => {
  authServiceMock.login.mockReturnValue(
    throwError(() => new Error())
  );
  component.userInput = 'admin@test.com';
  component.passwordInput = '12345678';
  component.login();
  expect(component.errorMessage)
    .toBe(
      'Usuario o contraseña incorrectos'
    );
});

it('debe consultar si existe sesión en ngOnInit', () => {
  authServiceMock.isLoggedIn.mockReturnValue(false);
  component.ngOnInit();
  expect(authServiceMock.isLoggedIn)
    .toHaveBeenCalledTimes(1);
});

});