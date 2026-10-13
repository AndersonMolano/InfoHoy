import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NoticiasService } from '../../core/services/noticias.service';
import { FavoritosService } from '../../core/services/favoritos.service';
import { Noticia } from '../../core/models/noticia.model';
import { NoticiaCardComponent } from '../../components/noticia-card/noticia-card.component';

/**
 * Página de inicio (Home).
 * Muestra el header de bienvenida y las 3 noticias más recientes como
 * destacadas, reutilizando <app-noticia-card> para cada una.
 */
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, NoticiaCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  /** Las 3 noticias más recientes, mostradas en la sección "Destacadas". */
  destacadas: Noticia[] = [];

  constructor(
    private noticiasService: NoticiasService,
    public favoritosService: FavoritosService
  ) {}

  ngOnInit(): void {
    this.noticiasService.obtenerNoticias().subscribe((noticias) => {
      // Ordena de más reciente a más antigua y toma solo las primeras 3
      this.destacadas = [...noticias]
        .sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime())
        .slice(0, 3);
    });
  }

  /** Se dispara cuando el usuario pulsa el botón de favorito dentro de una card. */
  onFavoritoToggle(id: number): void {
    this.favoritosService.alternarFavorito(id);
  }
}