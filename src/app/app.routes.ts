import { Routes } from '@angular/router';

export const routes: Routes = [

  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login',
    loadComponent: () => import('./features/auth/login/login').then(m => m.Login)
  },

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
        loadComponent: () => import('./features/inquilinos/inquilino-list/inquilino-list').then(m => m.InquilinoList)
      },

      { path: 'inquilinos/nuevo',
        loadComponent: () => import('./features/inquilinos/inquilino-form/inquilino-form').then(m => m.InquilinoForm)
      },

      // OTROS
      { path: 'alquiler',
        loadComponent: () => import('./features/alquiler/alquiler/alquiler').then(m => m.Alquiler)
      },

      { path: 'buscador',
        loadComponent: () => import('./features/unidades/unidad-buscador/unidad-buscador').then(m => m.UnidadBuscador)
      },

    // SECCIÓN USUARIO
      { 
        path: 'usuario',
        loadComponent: () => import('./features/usuario/usuario').then(m => m.Usuario) 
      }


    ]
  }

];