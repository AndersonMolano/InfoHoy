/* =========================================================
   contacto.js
   Valida el formulario de contacto en el cliente:
   - Campos obligatorios (nombre, correo, mensaje)
   - Formato de correo válido
   - Muestra mensaje de confirmación al enviar correctamente
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const formulario = document.getElementById("form-contacto");
  if (!formulario) return;

  formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const esValido = validarFormulario(formulario);

    if (esValido) {
      guardarMensajeContacto(formulario);
      mostrarConfirmacion();
      formulario.reset();
    }
  });

  // Limpia el estado de error apenas el usuario empieza a corregir
  formulario.querySelectorAll("input, textarea").forEach((campo) => {
    campo.addEventListener("input", () => {
      campo.closest(".campo").classList.remove("invalido");
    });
  });
});

/**
 * Recorre los campos obligatorios y valida su contenido.
 * Retorna true si todo el formulario es válido.
 */
function validarFormulario(formulario) {
  let formularioValido = true;

  const nombre = formulario.querySelector("#nombre");
  const correo = formulario.querySelector("#correo");
  const asunto = formulario.querySelector("#asunto");
  const mensaje = formulario.querySelector("#mensaje");

  if (!validarRequerido(nombre)) formularioValido = false;
  if (!validarCorreo(correo)) formularioValido = false;
  if (!validarRequerido(asunto)) formularioValido = false;
  if (!validarRequerido(mensaje)) formularioValido = false;

  return formularioValido;
}

function validarRequerido(campo) {
  const contenedor = campo.closest(".campo");
  if (campo.value.trim() === "") {
    contenedor.classList.add("invalido");
    return false;
  }
  contenedor.classList.remove("invalido");
  return true;
}

function validarCorreo(campo) {
  const contenedor = campo.closest(".campo");
  const patronCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (campo.value.trim() === "" || !patronCorreo.test(campo.value.trim())) {
    contenedor.classList.add("invalido");
    return false;
  }
  contenedor.classList.remove("invalido");
  return true;
}

/**
 * Guarda temporalmente los mensajes enviados en sessionStorage,
 * a modo de simulación de envío (no hay backend en esta entrega).
 */
function guardarMensajeContacto(formulario) {
  const datos = {
    nombre: formulario.querySelector("#nombre").value.trim(),
    correo: formulario.querySelector("#correo").value.trim(),
    asunto: formulario.querySelector("#asunto").value.trim(),
    mensaje: formulario.querySelector("#mensaje").value.trim(),
    fecha: new Date().toISOString(),
  };

  const mensajesPrevios = JSON.parse(sessionStorage.getItem("mensajes_contacto") || "[]");
  mensajesPrevios.push(datos);
  sessionStorage.setItem("mensajes_contacto", JSON.stringify(mensajesPrevios));
}

function mostrarConfirmacion() {
  const confirmacion = document.getElementById("mensaje-confirmacion");
  if (!confirmacion) return;

  confirmacion.classList.add("visible");
  confirmacion.textContent = "¡Gracias! Tu mensaje fue enviado correctamente. Te responderemos pronto.";

  setTimeout(() => {
    confirmacion.classList.remove("visible");
  }, 5000);
}
