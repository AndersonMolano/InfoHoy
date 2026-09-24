/* =========================================================
   favoritos.js
   Módulo encargado de la gestión de noticias favoritas
   usando localStorage. Es reutilizado por noticias.js,
   detalle.js e index.js
   ========================================================= */

const CLAVE_FAVORITOS = "noticias_favoritas";

/**
 * Obtiene el arreglo de IDs de noticias favoritas guardado
 * en localStorage. Si no existe, retorna un arreglo vacío.
 */
function obtenerFavoritos() {
  const datos = localStorage.getItem(CLAVE_FAVORITOS);
  return datos ? JSON.parse(datos) : [];
}

/**
 * Guarda el arreglo de favoritos en localStorage.
 */
function guardarFavoritos(favoritos) {
  localStorage.setItem(CLAVE_FAVORITOS, JSON.stringify(favoritos));
}

/**
 * Indica si una noticia (por id) ya está marcada como favorita.
 */
function esFavorito(idNoticia) {
  const favoritos = obtenerFavoritos();
  return favoritos.includes(idNoticia);
}

/**
 * Agrega o quita una noticia de favoritos (toggle).
 * Retorna true si quedó como favorita, false si se quitó.
 */
function alternarFavorito(idNoticia) {
  let favoritos = obtenerFavoritos();

  if (favoritos.includes(idNoticia)) {
    favoritos = favoritos.filter((id) => id !== idNoticia);
    guardarFavoritos(favoritos);
    return false;
  }

  favoritos.push(idNoticia);
  guardarFavoritos(favoritos);
  return true;
}
