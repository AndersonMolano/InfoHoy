import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoticiasService } from '../../core/services/noticias.service';
import { FavoritosService } from '../../core/services/favoritos.service';
import { Noticia } from '../../core/models/noticia.model';
import { NoticiaCardComponent } from '../../components/noticia-card/noticia-card.component';

/**
 * Catálogo completo de noticias con filtro por categoría.
 * Guarda dos arreglos separados: todasLasNoticias (sin filtrar, para poder
 * recalcular el filtro) y noticiasFiltradas (lo que realmente se muestra).
 */
@Component({
  selector: 'app-listado',
  standalone: true,
  imports: [CommonModule, NoticiaCardComponent],
  templateUrl: './listado.component.html',
  styleUrl: './listado.component.css',
})
export class ListadoComponent implements OnInit {
  todasLasNoticias: Noticia[] = [];
  noticiasFiltradas: Noticia[] = [];
  /** Lista de categorías para los botones de filtro; "Todas" siempre va primero. */
  categorias: string[] = ['Todas'];
  categoriaActiva = 'Todas';

  constructor(
    private noticiasService: NoticiasService,
    public favoritosService: FavoritosService
  ) {}

  ngOnInit(): void {
    this.noticiasService.obtenerNoticias().subscribe((noticias) => {
      this.todasLasNoticias = noticias;
      this.noticiasFiltradas = noticias;
      // new Set(...) elimina categorías repetidas, quedando solo las que
      // realmente existen en los datos (en vez de tenerlas quemadas a mano).
      this.categorias = ['Todas', ...new Set(noticias.map((n) => n.categoria))];
    });
  }

  /** Se llama al pulsar un botón de categoría; recalcula noticiasFiltradas. */
  filtrarPorCategoria(categoria: string): void {
    this.categoriaActiva = categoria;
    this.noticiasFiltradas =
      categoria === 'Todas'
        ? this.todasLasNoticias
        : this.todasLasNoticias.filter((n) => n.categoria === categoria);
  }

  onFavoritoToggle(id: number): void {
    this.favoritosService.alternarFavorito(id);
  }
}

  filtrarPorCategoria(categoria: string): void {
    this.categoriaActiva = categoria;
    this.noticiasFiltradas =
      categoria === 'Todas'
        ? this.todasLasNoticias
        : this.todasLasNoticias.filter((n) => n.categoria === categoria);
  }

  onFavoritoToggle(id: number): void {
    this.favoritosService.alternarFavorito(id);
  }
}
