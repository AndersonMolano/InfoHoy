import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NoticiasService } from '../../core/services/noticias.service';
import { FavoritosService } from '../../core/services/favoritos.service';
import { Noticia } from '../../core/models/noticia.model';

@Component({
  selector: 'app-detalle',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './detalle.component.html',
  styleUrl: './detalle.component.css',
})
export class DetalleComponent implements OnInit {
  noticia?: Noticia;
  cargando = true;

  constructor(
    private route: ActivatedRoute,
    private noticiasService: NoticiasService,
    public favoritosService: FavoritosService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.noticiasService.obtenerPorId(id).subscribe((noticia) => {
      this.noticia = noticia;
      this.cargando = false;
    });
  }

  alternarFavorito(): void {
    if (this.noticia) {
      this.favoritosService.alternarFavorito(this.noticia.id);
    }
  }

  formatearFecha(fechaISO: string): string {
    const opciones: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(fechaISO + 'T00:00:00').toLocaleDateString('es-CO', opciones);
  }
}
