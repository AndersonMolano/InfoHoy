/* =========================================================
   detalle.js
   Lee el parámetro "id" de la URL, busca la noticia
   correspondiente en el JSON local y pinta la vista de detalle.
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const idNoticia = obtenerIdDesdeURL();

  obtenerNoticias()
    .then((noticias) => {
      const noticia = noticias.find((n) => n.id === idNoticia);
      if (!noticia) {
        mostrarNoEncontrada();
        return;
      }
      renderizarDetalle(noticia);
    })
    .catch((error) => console.error("Error cargando el detalle:", error));
});

/**
 * Extrae el id de la noticia desde el query string (?id=3)
 */
function obtenerIdDesdeURL() {
  const parametros = new URLSearchParams(window.location.search);
  return Number(parametros.get("id"));
}

/**
 * Inserta la información completa de la noticia en el DOM.
 */
function renderizarDetalle(noticia) {
  const contenedor = document.getElementById("detalle-noticia");
  if (!contenedor) return;

  const favorita = esFavorito(noticia.id);

  contenedor.innerHTML = `
    <img src="${noticia.imagen}" alt="${noticia.titulo}">
    <div class="detalle-cuerpo">
      <p class="detalle-meta">${noticia.categoria} &middot; ${formatearFecha(noticia.fecha)} &middot; ${noticia.autor}</p>
      <h1>${noticia.titulo}</h1>
      <p>${noticia.descripcionCompleta}</p>
      <div class="detalle-acciones">
        <button id="btn-favorito-detalle" class="btn btn-primario">
          ${favorita ? "Quitar de favoritos" : "Agregar a favoritos"}
        </button>
        <a class="btn btn-secundario" style="color:#1d4ed8;border-color:#1d4ed8;" href="contacto.html">Contactar</a>
        <a class="btn btn-secundario" style="color:#1d4ed8;border-color:#1d4ed8;" href="listado.html">&larr; Volver al listado</a>
      </div>
    </div>
  `;

  document.getElementById("btn-favorito-detalle").addEventListener("click", (e) => {
    const quedoFavorita = alternarFavorito(noticia.id);
    e.target.textContent = quedoFavorita ? "Quitar de favoritos" : "Agregar a favoritos";
  });
}

function mostrarNoEncontrada() {
  const contenedor = document.getElementById("detalle-noticia");
  if (contenedor) {
    contenedor.innerHTML = `
      <div class="detalle-cuerpo">
        <h1>Noticia no encontrada</h1>
        <p>La noticia que buscas no existe o fue eliminada.</p>
        <a class="btn btn-primario" href="listado.html">Volver al listado</a>
      </div>
    `;
  }
}

function formatearFecha(fechaISO) {
  const opciones = { year: "numeric", month: "long", day: "numeric" };
  return new Date(fechaISO + "T00:00:00").toLocaleDateString("es-CO", opciones);
}
