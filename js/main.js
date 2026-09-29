/* =========================================================
   main.js
   Funciones comunes a todas las páginas:
   - Menú responsive (hamburguesa)
   - Resaltado del enlace activo en la navegación
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  inicializarMenu();
  marcarEnlaceActivo();
});

/**
 * Muestra/oculta el menú de navegación en dispositivos móviles.
 */
function inicializarMenu() {
  const boton = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".nav");

  if (!boton || !nav) return;

  boton.addEventListener("click", () => {
    nav.classList.toggle("abierto");
  });
}

/**
 * Recorre los enlaces del menú y añade la clase "activo"
 * al que corresponde con la página actual.
 */
function marcarEnlaceActivo() {
  const paginaActual = window.location.pathname.split("/").pop() || "index.html";
  const enlaces = document.querySelectorAll(".nav a");

  enlaces.forEach((enlace) => {
    const destino = enlace.getAttribute("href");
    if (destino === paginaActual) {
      enlace.classList.add("activo");
    }
  });
}

function escucharCambiosDeDatos(callback) {
  const CLAVES_RELEVANTES = ["noticias_creadas", "noticias_eliminadas", "noticias_favoritas"];

  window.addEventListener("storage", (evento) => {
    if (CLAVES_RELEVANTES.includes(evento.key)) {
      callback();
    }
  });
}