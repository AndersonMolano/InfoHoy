import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NoticiasService } from '../../core/services/noticias.service';
import { FavoritosService } from '../../core/services/favoritos.service';
import { Noticia } from '../../core/models/noticia.model';

/**
 * Vista de detalle de una noticia individual.
 * La ruta es '/noticias/:id' (ver app.routes.ts); el id se lee de la URL
 * con ActivatedRoute y se usa para pedirle la noticia completa al servicio.
 */
@Component({
  selector: 'app-detalle',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './detalle.component.html',
  styleUrl: './detalle.component.css',
})
export class DetalleComponent implements OnInit {
  noticia?: Noticia;
  /** true mientras se espera la respuesta del servicio, para mostrar un loader. */
  cargando = true;

  constructor(
    private route: ActivatedRoute,
    private noticiasService: NoticiasService,
    public favoritosService: FavoritosService
  ) {}

  ngOnInit(): void {
    // snapshot.paramMap lee el ':id' de la URL actual (ej: /noticias/3 -> id = 3)
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.noticiasService.obtenerPorId(id).subscribe((noticia) => {
      this.noticia = noticia;
      this.cargando = false;
    });
  }

  /** Marca/desmarca como favorita la noticia que se está viendo. */
  alternarFavorito(): void {
    if (this.noticia) {
      this.favoritosService.alternarFavorito(this.noticia.id);
    }
  }

  /** Convierte una fecha ISO (YYYY-MM-DD) a un formato legible en español, ej: "3 de octubre de 2026". */
  formatearFecha(fechaISO: string): string {
    const opciones: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(fechaISO + 'T00:00:00').toLocaleDateString('es-CO', opciones);
  }
}