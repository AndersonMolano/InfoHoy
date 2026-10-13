/**
 * Forma de una noticia tal como se usa en toda la aplicación
 * (tanto las que vienen del JSON original como las creadas por el usuario).
 */
export interface Noticia {
  /** Identificador único. En las noticias creadas por el usuario se genera con Date.now(). */
  id: number;
  /** Categoría para los filtros del listado: Tecnología, Educación, Turismo o Comercial. */
  categoria: string;
  titulo: string;
  /** Texto corto que se muestra en la tarjeta (card) del listado y del home. */
  descripcionBreve: string;
  /** Texto completo que se muestra en la vista de Detalle. */
  descripcionCompleta: string;
  imagen: string;
  /** Fecha en formato ISO (YYYY-MM-DD). */
  fecha: string;
  autor: string;
}

/**
 * Datos que pide el formulario de /admin para crear una noticia nueva.
 * No incluye "id" ni "fecha" porque esos los calcula automáticamente el
 * NoticiasService (id = Date.now(), fecha = fecha actual).
 */
export type NuevaNoticia = Omit<Noticia, 'id' | 'fecha'> & {
  fecha?: string;
};
