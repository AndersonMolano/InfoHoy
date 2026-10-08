import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NoticiasService } from '../../core/services/noticias.service';
import { Noticia } from '../../core/models/noticia.model';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent implements OnInit {
  private fb = inject(FormBuilder);

  noticias: Noticia[] = [];
  categoriasDisponibles = ['Tecnología', 'Educación', 'Turismo', 'Comercial'];

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

  cargarTabla(): void {
    this.noticiasService.obtenerNoticias().subscribe((noticias) => {
      this.noticias = noticias;
    });
  }

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

    this.formulario.reset({ categoria: 'Tecnología' });
    this.cargarTabla();
  }

  eliminar(id: number): void {
    if (confirm('¿Seguro que deseas eliminar esta noticia?')) {
      this.noticiasService.eliminarNoticia(id);
      this.cargarTabla();
    }
  }
}
