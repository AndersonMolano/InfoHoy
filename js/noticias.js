/* =========================================================
   noticias.js
   Renderiza el catálogo de noticias (listado.html) a partir
   del archivo JSON local, aplica filtros por categoría y
   permite marcar/desmarcar favoritos.
   ========================================================= */

let TODAS_LAS_NOTICIAS = [];

document.addEventListener("DOMContentLoaded", () => {
  cargarNoticias();
  escucharCambiosDeDatos(cargarNoticias);
});

/**
 * Descarga el JSON local de noticias y dispara el primer render.
 */
function cargarNoticias() {
  obtenerNoticias()
    .then((noticias) => {
      TODAS_LAS_NOTICIAS = noticias;
      renderizarNoticias(TODAS_LAS_NOTICIAS);
      inicializarFiltros(noticias);
    })
    .catch((error) => {
      console.error(error);
      const contenedor = document.getElementById("grid-noticias");
      if (contenedor) {
        contenedor.innerHTML = `<p>No fue posible cargar las noticias en este momento.</p>`;
      }
    });
}

/**
 * Pinta las tarjetas (cards) de noticias en el contenedor.
 */
function renderizarNoticias(noticias) {
  const contenedor = document.getElementById("grid-noticias");
  if (!contenedor) return;

  contenedor.innerHTML = "";

  if (noticias.length === 0) {
    contenedor.innerHTML = `<p>No hay noticias para esta categoría.</p>`;
    return;
  }

  noticias.forEach((noticia) => {
    const favorita = esFavorito(noticia.id);

    const card = document.createElement("article");
    card.className = "card";
    card.innerHTML = `
      <img src="${noticia.imagen}" alt="${noticia.titulo}">
      <div class="card-cuerpo">
        <span class="card-categoria">${noticia.categoria}</span>
        <h3>${noticia.titulo}</h3>
        <p>${noticia.descripcionBreve}</p>
        <div class="card-footer">
          <a class="card-ver-mas" href="detalle.html?id=${noticia.id}">Ver más &rarr;</a>
          <button class="btn-favorito ${favorita ? "activo" : ""}" data-id="${noticia.id}" title="Agregar a favoritos">
            ${favorita ? "&#9829;" : "&#9825;"}
          </button>
        </div>
      </div>
    `;
    contenedor.appendChild(card);
  });

  activarBotonesFavoritos();
}

/**
 * Crea los botones de filtro por categoría de forma dinámica.
 */
function inicializarFiltros(noticias) {
  const contenedorFiltros = document.getElementById("filtros");
  if (!contenedorFiltros) return;

  const categorias = ["Todas", ...new Set(noticias.map((n) => n.categoria))];

  contenedorFiltros.innerHTML = categorias
    .map(
      (categoria, index) =>
        `<button class="filtro-btn ${index === 0 ? "activo" : ""}" data-categoria="${categoria}">${categoria}</button>`
    )
    .join("");

  contenedorFiltros.querySelectorAll(".filtro-btn").forEach((boton) => {
    boton.addEventListener("click", () => {
      contenedorFiltros.querySelectorAll(".filtro-btn").forEach((b) => b.classList.remove("activo"));
      boton.classList.add("activo");

      const categoria = boton.dataset.categoria;
      const filtradas =
        categoria === "Todas"
          ? TODAS_LAS_NOTICIAS
          : TODAS_LAS_NOTICIAS.filter((n) => n.categoria === categoria);

      renderizarNoticias(filtradas);
    });
  });
}

/**
 * Asocia el evento click a cada botón de favorito recién creado.
 */
function activarBotonesFavoritos() {
  document.querySelectorAll(".btn-favorito").forEach((boton) => {
    boton.addEventListener("click", (evento) => {
      evento.preventDefault();
      const id = Number(boton.dataset.id);
      const quedoFavorita = alternarFavorito(id);

      boton.classList.toggle("activo", quedoFavorita);
      boton.innerHTML = quedoFavorita ? "&#9829;" : "&#9825;";
    });
  });
}
