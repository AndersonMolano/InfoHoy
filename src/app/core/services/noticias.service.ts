import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, shareReplay } from 'rxjs';
import { Noticia, NuevaNoticia } from '../models/noticia.model';

// Ruta del archivo JSON que actúa como "base de datos" de solo lectura del proyecto.
const URL_JSON = 'assets/data/noticias.json';

// Claves usadas en localStorage para simular un Mini CRUD sin backend real:
// - las noticias que el usuario crea desde /admin se guardan aparte (CLAVE_NOTICIAS_NUEVAS)
// - las noticias "eliminadas" no se borran del JSON (es de solo lectura), solo se
//   guarda su id en una lista de exclusión (CLAVE_NOTICIAS_ELIMINADAS)
const CLAVE_NOTICIAS_NUEVAS = 'noticias_creadas';
const CLAVE_NOTICIAS_ELIMINADAS = 'noticias_eliminadas';

/**
 * Servicio central de datos de la aplicación.
 *
 * Combina 3 fuentes para dar la ilusión de un CRUD completo sin backend:
 *   1. El JSON estático (assets/data/noticias.json) -> noticias originales.
 *   2. localStorage "noticias_creadas"              -> noticias creadas desde /admin.
 *   3. localStorage "noticias_eliminadas"            -> ids que el usuario eliminó.
 *
 * El resultado final que se expone al resto de la app siempre es:
 * (noticias del JSON + noticias creadas) menos las eliminadas.
 */
@Injectable({
  providedIn: 'root',
})
export class NoticiasService {
  // Cache del observable del JSON para no volver a pedirlo por HTTP cada vez
  // que algún componente llama a obtenerNoticias() (shareReplay(1) = guarda el último valor).
  private noticiasBase$?: Observable<Noticia[]>;

  constructor(private http: HttpClient) {}

  /**
   * Devuelve la lista final de noticias que debe ver la aplicación:
   * noticias base (JSON) + creadas por el usuario, sin las que fueron "eliminadas".
   */
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

  /** Busca una noticia puntual por id (usado en la vista de Detalle, ruta /noticias/:id). */
  obtenerPorId(id: number): Observable<Noticia | undefined> {
    return this.obtenerNoticias().pipe(
      map((noticias) => noticias.find((noticia) => noticia.id === id))
    );
  }

  /** Lee del localStorage las noticias que el usuario ha creado desde /admin. */
  private obtenerNoticiasCreadas(): Noticia[] {
    const datos = localStorage.getItem(CLAVE_NOTICIAS_NUEVAS);
    return datos ? JSON.parse(datos) : [];
  }

  /** Lee del localStorage los ids de noticias que el usuario marcó como eliminadas. */
  private obtenerIdsEliminados(): number[] {
    const datos = localStorage.getItem(CLAVE_NOTICIAS_ELIMINADAS);
    return datos ? JSON.parse(datos) : [];
  }

  /**
   * Crea una noticia nueva (parte "Create" del Mini CRUD).
   * Se completan automáticamente el id (timestamp) y la fecha, y se guarda en
   * localStorage junto a las demás noticias creadas por el usuario.
   */
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

  /**
   * Elimina una noticia (parte "Delete" del Mini CRUD).
   * - Si la noticia fue creada por el usuario: se quita directamente de la lista de creadas.
   * - Si viene del JSON original (solo lectura): no se puede borrar de ahí, así que
   *   simplemente se agrega su id a la lista de "eliminadas" para que se oculte.
   */
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