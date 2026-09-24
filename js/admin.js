/* =========================================================
   admin.js
   Página de gestión básica de noticias (Mini CRUD):
   - Crear nuevas noticias
   - Eliminar noticias existentes
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  cargarTablaNoticias();

  const formulario = document.getElementById("form-crear-noticia");
  if (formulario) {
    formulario.addEventListener("submit", (evento) => {
      evento.preventDefault();

      const nuevaNoticia = {
        categoria: formulario.categoria.value,
        titulo: formulario.titulo.value.trim(),
        descripcionBreve: formulario.descripcionBreve.value.trim(),
        descripcionCompleta: formulario.descripcionCompleta.value.trim(),
        imagen: formulario.imagen.value.trim(),
        autor: formulario.autor.value.trim(),
      };

      if (!nuevaNoticia.titulo || !nuevaNoticia.descripcionBreve || !nuevaNoticia.descripcionCompleta) {
        alert("Por favor completa al menos título, descripción breve y descripción completa.");
        return;
      }

      crearNoticia(nuevaNoticia);
      formulario.reset();
      cargarTablaNoticias();
    });
  }
});

function cargarTablaNoticias() {
  obtenerNoticias().then((noticias) => {
    const cuerpoTabla = document.getElementById("cuerpo-tabla-noticias");
    if (!cuerpoTabla) return;

    cuerpoTabla.innerHTML = noticias
      .map(
        (noticia) => `
        <tr>
          <td>${noticia.titulo}</td>
          <td>${noticia.categoria}</td>
          <td>${noticia.fecha}</td>
          <td><button class="btn-eliminar" data-id="${noticia.id}">Eliminar</button></td>
        </tr>`
      )
      .join("");

    cuerpoTabla.querySelectorAll(".btn-eliminar").forEach((boton) => {
      boton.addEventListener("click", () => {
        const id = Number(boton.dataset.id);
        if (confirm("¿Seguro que deseas eliminar esta noticia?")) {
          eliminarNoticia(id);
          cargarTablaNoticias();
        }
      });
    });
  });
}
