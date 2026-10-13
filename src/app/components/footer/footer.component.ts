import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
 
/** Pie de página: año actual calculado dinámicamente + créditos del equipo. */
@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  /** Año mostrado en el "© {{ anioActual }} InfoHoy", calculado al crear el componente. */
  anioActual = new Date().getFullYear();
 
  /** Nombres mostrados en la sección de créditos del footer. */
  integrantes = [
    'Anderson Molano Samboni',
    'Manuel Alejandro Fonseca Riaño',
    'Jose Andres Gutierrez Arias',
  ];
}
