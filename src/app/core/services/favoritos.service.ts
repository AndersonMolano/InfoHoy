import { Injectable, signal } from '@angular/core';

const CLAVE_FAVORITOS = 'noticias_favoritas';

@Injectable({
  providedIn: 'root',
})
export class FavoritosService {
  /** Signal reactiva con los ids favoritos, para refrescar la UI al instante. */
  favoritos = signal<number[]>(this.leerDeStorage());

  private leerDeStorage(): number[] {
    const datos = localStorage.getItem(CLAVE_FAVORITOS);
    return datos ? JSON.parse(datos) : [];
  }

  private guardarEnStorage(favoritos: number[]): void {
    localStorage.setItem(CLAVE_FAVORITOS, JSON.stringify(favoritos));
  }

  esFavorito(idNoticia: number): boolean {
    return this.favoritos().includes(idNoticia);
  }

  /** Agrega o quita una noticia de favoritos (toggle). */
  alternarFavorito(idNoticia: number): void {
    const actuales = this.favoritos();

    const nuevos = actuales.includes(idNoticia)
      ? actuales.filter((id) => id !== idNoticia)
      : [...actuales, idNoticia];

    this.favoritos.set(nuevos);
    this.guardarEnStorage(nuevos);
  }
}
