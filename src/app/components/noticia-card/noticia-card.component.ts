import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Noticia } from '../../core/models/noticia.model';

/**
 * Tarjeta (card) reutilizable que muestra el resumen de una noticia:
 * imagen, título, descripción breve y botón "ver más" + botón de favorito.
 *
 * Es el principal ejemplo de "binding" de la app: recibe datos desde el
 * padre con @Input (imagen, título, etc.) y le avisa al padre que el usuario
 * pulsó el corazón de favorito con @Output, sin tocar directamente
 * FavoritosService desde aquí (así el componente queda "tonto"/reutilizable
 * y se puede usar igual en Home, Listado y Mis Favoritos).
 */
@Component({
  selector: 'app-noticia-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './noticia-card.component.html',
  styleUrl: './noticia-card.component.css',
})
export class NoticiaCardComponent {
  /** Noticia a mostrar (binding de entrada - @Input). */
  @Input({ required: true }) noticia!: Noticia;

  /** Indica si se debe mostrar el botón de favorito. */
  @Input() mostrarBotonFavorito = true;

  /** Indica si la noticia ya está marcada como favorita. */
  @Input() esFavorita = false;

  /** Evento emitido al pulsar el botón de favorito (binding de salida - @Output). */
  @Output() favoritoToggle = new EventEmitter<number>();

  /**
   * Maneja el click en el botón de favorito.
   * preventDefault() evita que, al estar el botón dentro de un <a routerLink>,
   * el click también dispare la navegación hacia el detalle de la noticia.
   */
  alTogglearFavorito(evento: Event): void {
    evento.preventDefault();
    this.favoritoToggle.emit(this.noticia.id);
  }
}