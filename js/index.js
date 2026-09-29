/* =========================================================
   index.js
   Renderiza las noticias destacadas en la página de inicio
   (las 3 más recientes según la fecha).
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  cargarDestacadas();
  escucharCambiosDeDatos(cargarDestacadas);
});

function cargarDestacadas() {
  obtenerNoticias()
    .then((noticias) => {
      const destacadas = [...noticias]
        .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
        .slice(0, 3);
      renderizarDestacadas(destacadas);
    })
    .catch((error) => console.error("Error cargando destacadas:", error));
}

function renderizarDestacadas(noticias) {
  const contenedor = document.getElementById("grid-destacadas");
  if (!contenedor) return;

  contenedor.innerHTML = noticias
    .map(
      (noticia) => `
      <article class="card">
        <img src="${noticia.imagen}" alt="${noticia.titulo}">
        <div class="card-cuerpo">
          <span class="card-categoria">${noticia.categoria}</span>
          <h3>${noticia.titulo}</h3>
          <p>${noticia.descripcionBreve}</p>
          <div class="card-footer">
            <a class="card-ver-mas" href="detalle.html?id=${noticia.id}">Ver más &rarr;</a>
          </div>
        </div>
      </article>`
    )
    .join("");
}
