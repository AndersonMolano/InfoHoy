export interface Noticia {
  id: number;
  categoria: string;
  titulo: string;
  descripcionBreve: string;
  descripcionCompleta: string;
  imagen: string;
  fecha: string;
  autor: string;
}

export type NuevaNoticia = Omit<Noticia, 'id' | 'fecha'> & {
  fecha?: string;
};
