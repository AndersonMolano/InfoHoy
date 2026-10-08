import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ListadoComponent } from './pages/listado/listado.component';
import { DetalleComponent } from './pages/detalle/detalle.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { MisFavoritosComponent } from './pages/mis-favoritos/mis-favoritos.component';
import { AdminComponent } from './pages/admin/admin.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'InfoHoy | Inicio' },
  { path: 'noticias', component: ListadoComponent, title: 'InfoHoy | Noticias' },
  { path: 'noticias/:id', component: DetalleComponent, title: 'InfoHoy | Detalle' },
  { path: 'favoritos', component: MisFavoritosComponent, title: 'InfoHoy | Favoritos' },
  { path: 'contacto', component: ContactoComponent, title: 'InfoHoy | Contacto' },
  { path: 'admin', component: AdminComponent, title: 'InfoHoy | Administrar' },
  { path: '**', redirectTo: '' },
];
