import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ListadoComponent } from './pages/listado/listado.component';
import { DetalleComponent } from './pages/detalle/detalle.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { MisFavoritosComponent } from './pages/mis-favoritos/mis-favoritos.component';
import { AdminComponent } from './pages/admin/admin.component';

/**
 * Mapa de rutas de la aplicación (Angular Router).
 * Se usa "hash routing" (ver app.config.ts -> withHashLocation()), por eso en
 * el navegador las URLs se ven como /#/noticias, /#/noticias/3, etc. Esto es
 * necesario para que el sitio funcione en hostings estáticos gratuitos
 * (GitHub Pages, Netlify) sin configuración extra del servidor.
 */
export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'InfoHoy | Inicio' },
  { path: 'noticias', component: ListadoComponent, title: 'InfoHoy | Noticias' },
  // ':id' es un parámetro de ruta: DetalleComponent lo lee con ActivatedRoute
  { path: 'noticias/:id', component: DetalleComponent, title: 'InfoHoy | Detalle' },
  { path: 'favoritos', component: MisFavoritosComponent, title: 'InfoHoy | Favoritos' },
  { path: 'contacto', component: ContactoComponent, title: 'InfoHoy | Contacto' },
  { path: 'admin', component: AdminComponent, title: 'InfoHoy | Administrar' },
  // Cualquier ruta desconocida redirige al Home en vez de mostrar una página en blanco
  { path: '**', redirectTo: '' },
];
