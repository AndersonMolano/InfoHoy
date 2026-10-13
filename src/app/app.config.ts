import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';

/**
 * Configuración raíz de la aplicación standalone (reemplaza al AppModule
 * de los proyectos Angular "clásicos" con NgModule).
 *
 * Provee:
 * - El Router, con las rutas de app.routes.ts y "hash location" para que
 *   funcione en hostings estáticos sin configurar el servidor.
 * - HttpClient, usado por NoticiasService para leer assets/data/noticias.json.
 */
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withHashLocation()),
    provideHttpClient(),
  ],
};
