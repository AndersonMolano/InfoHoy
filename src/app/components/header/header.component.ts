import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

/**
 * Encabezado con el menú de navegación principal (Home, Noticias, Favoritos,
 * Contacto, Admin). RouterLinkActive resalta el link de la página en la que
 * el usuario está parado actualmente.
 */
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  /** Controla si el menú responsive (hamburguesa, en pantallas pequeñas) está abierto. */
  menuAbierto = signal(false);

  /** Abre/cierra el menú responsive. Se llama al pulsar el botón de hamburguesa. */
  alternarMenu(): void {
    this.menuAbierto.update((valor) => !valor);
  }
}