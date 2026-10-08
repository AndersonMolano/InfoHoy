import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoticiasService } from '../../core/services/noticias.service';
import { FavoritosService } from '../../core/services/favoritos.service';
import { Noticia } from '../../core/models/noticia.model';
import { NoticiaCardComponent } from '../../components/noticia-card/noticia-card.component';

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
      this.categorias = ['Todas', ...new Set(noticias.map((n) => n.categoria))];
    });
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
