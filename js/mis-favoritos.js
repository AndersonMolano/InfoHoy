/* =========================================================
   mis-favoritos.js
   Muestra únicamente las noticias que el usuario ha marcado
   como favoritas, leyendo los IDs guardados en localStorage.
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  obtenerNoticias()
    .then((noticias) => {
      const idsFavoritos = obtenerFavoritos();
      const favoritas = noticias.filter((n) => idsFavoritos.includes(n.id));
      renderizarFavoritas(favoritas);
    })
    .catch((error) => console.error("Error cargando favoritos:", error));
});

function renderizarFavoritas(noticias) {
  const contenedor = document.getElementById("grid-favoritos");
  if (!contenedor) return;

  if (noticias.length === 0) {
    contenedor.innerHTML = `
      <div class="estado-vacio">
        <div class="icono">&#9825;</div>
        <p>Aún no has guardado noticias en favoritos.</p>
        <a class="btn btn-primario" href="listado.html" style="margin-top:16px;display:inline-block;">Explorar noticias</a>
      </div>
    `;
    return;
  }

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
            <button class="btn-favorito activo" data-id="${noticia.id}" title="Quitar de favoritos">&#9829;</button>
          </div>
        </div>
      </article>`
    )
    .join("");

  document.querySelectorAll(".btn-favorito").forEach((boton) => {
    boton.addEventListener("click", () => {
      const id = Number(boton.dataset.id);
      alternarFavorito(id);
      boton.closest(".card").remove();
    });
  });
}
