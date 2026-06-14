import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
{
    path: 'inmuebles/editar/:id',
    renderMode: RenderMode.Server
  },
  {
    path: 'unidades/editar/:id',
    renderMode: RenderMode.Server
  },
  {
    path: 'unidades/:id/nueva',
    renderMode: RenderMode.Server
  },
  {
    path: 'caja/:id',
    renderMode: RenderMode.Server
  },
  {
    path: 'unidades/nuevo/:inmuebleId',
    renderMode: RenderMode.Server
  },
  {
    path: 'unidades/:id',
    renderMode: RenderMode.Server
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
