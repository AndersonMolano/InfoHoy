import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

// Clave usada para guardar los mensajes enviados en sessionStorage (solo dura
// mientras la pestaña del navegador esté abierta; se usa sessionStorage y no
// localStorage a propósito, para no "acumular" mensajes de prueba entre sesiones).
const CLAVE_MENSAJES = 'mensajes_contacto';

/**
 * Formulario de contacto con validaciones (Reactive Forms).
 * No envía correos reales: guarda el mensaje en sessionStorage y muestra un
 * mensaje de confirmación temporal, cumpliendo el requisito de "formulario
 * con validaciones básicas y mensaje de confirmación" sin necesitar backend.
 */
@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contacto.component.html',
  styleUrl: './contacto.component.css',
})
export class ContactoComponent {
  private fb = inject(FormBuilder);

  /** Controla si se muestra el mensaje verde de "mensaje enviado con éxito". */
  mensajeEnviado = false;

  /** Definición reactiva del formulario: todos los campos obligatorios + correo con formato válido. */
  formulario = this.fb.group({
    nombre: ['', [Validators.required]],
    correo: ['', [Validators.required, Validators.email]],
    asunto: ['', [Validators.required]],
    mensaje: ['', [Validators.required]],
  });

  /**
   * Indica si un campo debe mostrarse en rojo con su mensaje de error.
   * Solo se marca como inválido si el usuario ya interactuó con el campo
   * (dirty/touched), para no mostrar errores apenas se abre el formulario.
   */
  campoInvalido(nombreCampo: string): boolean {
    const control = this.formulario.get(nombreCampo);
    return !!control && control.invalid && (control.dirty || control.touched);
  }

  /** Se ejecuta al enviar el formulario (botón submit). */
  enviar(): void {
    if (this.formulario.invalid) {
      // Marca todos los campos como "touched" para que se vean los errores
      // de una vez, aunque el usuario no haya pasado por cada campo.
      this.formulario.markAllAsTouched();
      return;
    }

    this.guardarMensaje();
    this.mostrarConfirmacion();
    this.formulario.reset();
  }

  /** Guarda el mensaje (con fecha) en sessionStorage, agregándolo a los anteriores. */
  private guardarMensaje(): void {
    const datos = {
      ...this.formulario.value,
      fecha: new Date().toISOString(),
    };

    const previos = JSON.parse(sessionStorage.getItem(CLAVE_MENSAJES) || '[]');
    previos.push(datos);
    sessionStorage.setItem(CLAVE_MENSAJES, JSON.stringify(previos));
  }

  /** Muestra el aviso de confirmación y lo oculta solo después de 5 segundos. */
  private mostrarConfirmacion(): void {
    this.mensajeEnviado = true;
    setTimeout(() => {
      this.mensajeEnviado = false;
    }, 5000);
  }
}