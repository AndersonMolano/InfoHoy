import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, shareReplay } from 'rxjs';
import { Noticia, NuevaNoticia } from '../models/noticia.model';

const URL_JSON = 'assets/data/noticias.json';
const CLAVE_NOTICIAS_NUEVAS = 'noticias_creadas';
const CLAVE_NOTICIAS_ELIMINADAS = 'noticias_eliminadas';

@Injectable({
  providedIn: 'root',
})
export class NoticiasService {
  private noticiasBase$?: Observable<Noticia[]>;

  constructor(private http: HttpClient) {}

  obtenerNoticias(): Observable<Noticia[]> {
    if (!this.noticiasBase$) {
      this.noticiasBase$ = this.http.get<Noticia[]>(URL_JSON).pipe(shareReplay(1));
    }

    return this.noticiasBase$.pipe(
      map((noticiasBase) => {
        const creadas = this.obtenerNoticiasCreadas();
        const eliminadasIds = this.obtenerIdsEliminados();
        const todas = [...noticiasBase, ...creadas];
        return todas.filter((noticia) => !eliminadasIds.includes(noticia.id));
      })
    );
  }

  obtenerPorId(id: number): Observable<Noticia | undefined> {
    return this.obtenerNoticias().pipe(
      map((noticias) => noticias.find((noticia) => noticia.id === id))
    );
  }

  private obtenerNoticiasCreadas(): Noticia[] {
    const datos = localStorage.getItem(CLAVE_NOTICIAS_NUEVAS);
    return datos ? JSON.parse(datos) : [];
  }

  private obtenerIdsEliminados(): number[] {
    const datos = localStorage.getItem(CLAVE_NOTICIAS_ELIMINADAS);
    return datos ? JSON.parse(datos) : [];
  }

  crearNoticia(noticia: NuevaNoticia): Noticia {
    const creadas = this.obtenerNoticiasCreadas();

    const nuevaNoticia: Noticia = {
      id: Date.now(),
      categoria: noticia.categoria,
      titulo: noticia.titulo,
      descripcionBreve: noticia.descripcionBreve,
      descripcionCompleta: noticia.descripcionCompleta,
      imagen: noticia.imagen?.trim() ? noticia.imagen : 'assets/img/noticia-tecnologia.svg',
      fecha: new Date().toISOString().split('T')[0],
      autor: noticia.autor?.trim() ? noticia.autor : 'Usuario',
    };

    creadas.push(nuevaNoticia);
    localStorage.setItem(CLAVE_NOTICIAS_NUEVAS, JSON.stringify(creadas));
    return nuevaNoticia;
  }

  eliminarNoticia(id: number): void {
    let creadas = this.obtenerNoticiasCreadas();
    const estabaEnCreadas = creadas.some((n) => n.id === id);

    if (estabaEnCreadas) {
      creadas = creadas.filter((n) => n.id !== id);
      localStorage.setItem(CLAVE_NOTICIAS_NUEVAS, JSON.stringify(creadas));
      return;
    }

    const eliminadas = this.obtenerIdsEliminados();
    if (!eliminadas.includes(id)) {
      eliminadas.push(id);
      localStorage.setItem(CLAVE_NOTICIAS_ELIMINADAS, JSON.stringify(eliminadas));
    }
  }
}
