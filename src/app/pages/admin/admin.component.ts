import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NoticiasService } from '../../core/services/noticias.service';
import { Noticia } from '../../core/models/noticia.model';

/**
 * Panel de administración: Mini CRUD de noticias (Crear y Eliminar).
 * Toda la lógica de persistencia vive en NoticiasService; este componente
 * solo arma el formulario reactivo, muestra la tabla y llama al servicio.
 */
@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent implements OnInit {
  private fb = inject(FormBuilder);

  /** Noticias que se listan en la tabla (todas: del JSON + creadas, sin las eliminadas). */
  noticias: Noticia[] = [];
  /** Opciones fijas para el <select> de categoría del formulario. */
  categoriasDisponibles = ['Tecnología', 'Educación', 'Turismo', 'Comercial'];

  /** Formulario reactivo para crear una noticia nueva. */
  formulario = this.fb.group({
    titulo: ['', [Validators.required]],
    categoria: ['Tecnología', [Validators.required]],
    descripcionBreve: ['', [Validators.required]],
    descripcionCompleta: ['', [Validators.required]],
    imagen: [''],
    autor: [''],
  });

  constructor(private noticiasService: NoticiasService) {}

  ngOnInit(): void {
    this.cargarTabla();
  }

  /** Pide al servicio la lista actualizada de noticias y refresca la tabla. */
  cargarTabla(): void {
    this.noticiasService.obtenerNoticias().subscribe((noticias) => {
      this.noticias = noticias;
    });
  }

  /** Valida el formulario y, si todo está bien, crea la noticia y recarga la tabla. */
  crear(): void {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    this.noticiasService.crearNoticia({
      titulo: this.formulario.value.titulo!,
      categoria: this.formulario.value.categoria!,
      descripcionBreve: this.formulario.value.descripcionBreve!,
      descripcionCompleta: this.formulario.value.descripcionCompleta!,
      imagen: this.formulario.value.imagen || '',
      autor: this.formulario.value.autor || '',
    });

    // Limpia el formulario (dejando la categoría por defecto) y refresca la tabla
    this.formulario.reset({ categoria: 'Tecnología' });
    this.cargarTabla();
  }

  /** Pide confirmación y, si el usuario acepta, elimina la noticia y recarga la tabla. */
  eliminar(id: number): void {
    if (confirm('¿Seguro que deseas eliminar esta noticia?')) {
      this.noticiasService.eliminarNoticia(id);
      this.cargarTabla();
    }
  }
}