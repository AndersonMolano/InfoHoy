import { Injectable, signal } from '@angular/core';

// Clave usada para persistir los ids favoritos en localStorage (sobreviven al recargar la página).
const CLAVE_FAVORITOS = 'noticias_favoritas';

/**
 * Servicio que maneja la lista de noticias favoritas del usuario.
 *
 * Usa una Signal de Angular (en vez de un simple array) para que cualquier
 * componente que la lea en su plantilla (favoritos()) se actualice al instante
 * en toda la app apenas el usuario marca/desmarca un favorito, sin necesidad
 * de suscripciones manuales.
 */
@Injectable({
  providedIn: 'root',
})
export class FavoritosService {
  /** Signal reactiva con los ids favoritos, para refrescar la UI al instante. */
  favoritos = signal<number[]>(this.leerDeStorage());

  /** Lee el arreglo de ids favoritos guardado en localStorage (o vacío si no hay nada). */
  private leerDeStorage(): number[] {
    const datos = localStorage.getItem(CLAVE_FAVORITOS);
    return datos ? JSON.parse(datos) : [];
  }

  /** Persiste el arreglo de ids favoritos en localStorage. */
  private guardarEnStorage(favoritos: number[]): void {
    localStorage.setItem(CLAVE_FAVORITOS, JSON.stringify(favoritos));
  }

  /** Indica si una noticia puntual ya está en la lista de favoritos. */
  esFavorito(idNoticia: number): boolean {
    return this.favoritos().includes(idNoticia);
  }

  /** Agrega o quita una noticia de favoritos (toggle) y lo guarda en localStorage. */
  alternarFavorito(idNoticia: number): void {
    const actuales = this.favoritos();

    const nuevos = actuales.includes(idNoticia)
      ? actuales.filter((id) => id !== idNoticia) // ya estaba -> la quitamos
      : [...actuales, idNoticia]; // no estaba -> la agregamos

    this.favoritos.set(nuevos);
    this.guardarEnStorage(nuevos);
  }
}
