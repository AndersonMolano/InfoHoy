import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NoticiasService } from '../../core/services/noticias.service';
import { FavoritosService } from '../../core/services/favoritos.service';
import { Noticia } from '../../core/models/noticia.model';
import { NoticiaCardComponent } from '../../components/noticia-card/noticia-card.component';

@Component({
  selector: 'app-mis-favoritos',
  standalone: true,
  imports: [CommonModule, RouterLink, NoticiaCardComponent],
  templateUrl: './mis-favoritos.component.html',
  styleUrl: './mis-favoritos.component.css',
})
export class MisFavoritosComponent implements OnInit {
  favoritas: Noticia[] = [];

  constructor(
    private noticiasService: NoticiasService,
    public favoritosService: FavoritosService
  ) {}

  ngOnInit(): void {
    this.cargarFavoritas();
  }

  cargarFavoritas(): void {
    this.noticiasService.obtenerNoticias().subscribe((noticias) => {
      const ids = this.favoritosService.favoritos();
      this.favoritas = noticias.filter((n) => ids.includes(n.id));
    });
  }

  onFavoritoToggle(id: number): void {
    this.favoritosService.alternarFavorito(id);
    this.favoritas = this.favoritas.filter((n) => n.id !== id);
  }
}
