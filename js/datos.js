/* =========================================================
   datos.js
   Capa de datos de la aplicación. Combina las noticias del
   archivo JSON local (data/noticias.json) con las noticias
   creadas o eliminadas por el usuario, persistidas en
   localStorage (Mini CRUD: crear y eliminar noticias).
   ========================================================= */

const CLAVE_NOTICIAS_NUEVAS = "noticias_creadas";
const CLAVE_NOTICIAS_ELIMINADAS = "noticias_eliminadas";

/**
 * Retorna una Promesa con el arreglo final de noticias:
 * (JSON base + creadas por el usuario) - eliminadas por el usuario.
 */
function obtenerNoticias() {
  return fetch("data/noticias.json")
    .then((respuesta) => {
      if (!respuesta.ok) throw new Error("No se pudo cargar noticias.json");
      return respuesta.json();
    })
    .then((noticiasBase) => {
      const creadas = obtenerNoticiasCreadas();
      const eliminadasIds = obtenerIdsEliminados();

      const todas = [...noticiasBase, ...creadas];
      return todas.filter((noticia) => !eliminadasIds.includes(noticia.id));
    });
}

function obtenerNoticiasCreadas() {
  const datos = localStorage.getItem(CLAVE_NOTICIAS_NUEVAS);
  return datos ? JSON.parse(datos) : [];
}

function obtenerIdsEliminados() {
  const datos = localStorage.getItem(CLAVE_NOTICIAS_ELIMINADAS);
  return datos ? JSON.parse(datos) : [];
}

/**
 * Crea una nueva noticia y la agrega al almacenamiento local.
 * Genera un id único basado en timestamp para evitar choques
 * con los ids del JSON base.
 */
function crearNoticia(noticia) {
  const creadas = obtenerNoticiasCreadas();

  const nuevaNoticia = {
    id: Date.now(),
    categoria: noticia.categoria,
    titulo: noticia.titulo,
    descripcionBreve: noticia.descripcionBreve,
    descripcionCompleta: noticia.descripcionCompleta,
    imagen: noticia.imagen && noticia.imagen.trim() !== "" ? noticia.imagen : "img/noticia-tecnologia.svg",
    fecha: new Date().toISOString().split("T")[0],
    autor: noticia.autor && noticia.autor.trim() !== "" ? noticia.autor : "Usuario",
  };

  creadas.push(nuevaNoticia);
  localStorage.setItem(CLAVE_NOTICIAS_NUEVAS, JSON.stringify(creadas));
  return nuevaNoticia;
}

/**
 * Elimina una noticia por id. Si la noticia fue creada por el
 * usuario, se quita directamente de "creadas". Si pertenece al
 * JSON base, se agrega a la lista de "eliminadas" para excluirla
 * en futuras consultas (no se puede modificar el archivo JSON
 * estático desde el navegador).
 */
function eliminarNoticia(id) {
  let creadas = obtenerNoticiasCreadas();
  const estabaEnCreadas = creadas.some((n) => n.id === id);

  if (estabaEnCreadas) {
    creadas = creadas.filter((n) => n.id !== id);
    localStorage.setItem(CLAVE_NOTICIAS_NUEVAS, JSON.stringify(creadas));
    return;
  }

  const eliminadas = obtenerIdsEliminados();
  if (!eliminadas.includes(id)) {
    eliminadas.push(id);
    localStorage.setItem(CLAVE_NOTICIAS_ELIMINADAS, JSON.stringify(eliminadas));
  }
}
