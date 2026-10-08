import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

const CLAVE_MENSAJES = 'mensajes_contacto';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contacto.component.html',
  styleUrl: './contacto.component.css',
})
export class ContactoComponent {
  private fb = inject(FormBuilder);

  mensajeEnviado = false;

  formulario = this.fb.group({
    nombre: ['', [Validators.required]],
    correo: ['', [Validators.required, Validators.email]],
    asunto: ['', [Validators.required]],
    mensaje: ['', [Validators.required]],
  });

  campoInvalido(nombreCampo: string): boolean {
    const control = this.formulario.get(nombreCampo);
    return !!control && control.invalid && (control.dirty || control.touched);
  }

  enviar(): void {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    this.guardarMensaje();
    this.mostrarConfirmacion();
    this.formulario.reset();
  }

  private guardarMensaje(): void {
    const datos = {
      ...this.formulario.value,
      fecha: new Date().toISOString(),
    };

    const previos = JSON.parse(sessionStorage.getItem(CLAVE_MENSAJES) || '[]');
    previos.push(datos);
    sessionStorage.setItem(CLAVE_MENSAJES, JSON.stringify(previos));
  }

  private mostrarConfirmacion(): void {
    this.mensajeEnviado = true;
    setTimeout(() => {
      this.mensajeEnviado = false;
    }, 5000);
  }
}
