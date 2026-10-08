import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Noticia } from '../../core/models/noticia.model';

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

  alTogglearFavorito(evento: Event): void {
    evento.preventDefault();
    this.favoritoToggle.emit(this.noticia.id);
  }
}
