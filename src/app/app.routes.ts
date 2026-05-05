import { Routes } from '@angular/router';
import { authGuard } from './features/auth/auth.guard';
export const routes: Routes = [


  {
    path: '',
    loadComponent: () => import('./layout/sidebar/sidebar').then(m => m.Sidebar),
    children: [
      //Inicio
      { path: '', redirectTo: 'inicio', pathMatch: 'full' },
      {
      path: 'inicio',
      loadComponent: () => import('./features/inicio/inicio').then(m => m.Inicio)
      },

      // INMUEBLES
      { path: 'inmuebles',
        canActivate: [authGuard],
        loadComponent: () => import('./features/inmuebles/inmueble-list/inmueble-list').then(m => m.InmuebleList)
      },

      { path: 'inmuebles/nuevo',
        loadComponent: () => import('./features/inmuebles/inmueble-form/inmueble-form').then(m => m.InmuebleForm)
      },

      { path: 'inmuebles/editar/:id',
        loadComponent: () => import('./features/inmuebles/inmueble-form/inmueble-form').then(m => m.InmuebleForm)
      },

      // UNIDADES (orden importante 🔥)
      { path: 'unidades/nuevo/:inmuebleId',
        loadComponent: () => import('./features/unidades/unidad-form/unidad-form').then(m => m.UnidadForm)
      },

      { path: 'unidades/editar/:id',
        loadComponent: () => import('./features/unidades/unidad-form/unidad-form').then(m => m.UnidadForm)
      },

      { path: 'unidades/:id',
        loadComponent: () => import('./features/unidades/unidad-list/unidad-list').then(m => m.UnidadList)
      },

      {path: 'unidades/:id/nueva',
      loadComponent: () => import('./features/unidades/unidad-form/unidad-form').then(m => m.UnidadForm)
      },

      // INQUILINOS
      { path: 'inquilinos',
        canActivate: [authGuard],
        loadComponent: () => import('./features/inquilinos/inquilino-list/inquilino-list').then(m => m.InquilinoListComponent)
      },

      { path: 'inquilinos/nuevo',
        loadComponent: () => import('./features/inquilinos/inquilino-form/inquilino-form').then(m => m.InquilinoForm)
      },

      // reportes

     { path: 'reportes',
      canActivate: [authGuard],
        loadComponent: () => import('./features/reportes/reportes').then(m => m.Reportes)
      },


      // OTROS
      { path: 'alquiler',
        canActivate: [authGuard],
        loadComponent: () => import('./features/alquiler/alquiler/alquiler').then(m => m.Alquiler)
      },

      {
      path: 'caja/:id',
      loadComponent: () => import('./features/caja/caja').then(m => m.Caja)
      },
    


    // SECCIÓN USUARIO
      { 
        path: 'usuario',
        canActivate: [authGuard],
        loadComponent: () => import('./features/usuario/usuario').then(m => m.Usuario) 
      }


    ]
  },

  {
    path: 'login',
    loadComponent: () => import('./features/auth/login/login').then(m => m.Login)
  }

];