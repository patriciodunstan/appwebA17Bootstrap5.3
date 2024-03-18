import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ParametrosArtista } from '../../view/gestion/artista/artista.component';

@Component({
  selector: 'app-barralatera',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './barralatera.component.html',
  styleUrl: './barralatera.component.css'
})
/**
 * Componente de la barra lateral.
 */
export class BarralateraComponent {
  constructor(private ruta: Router) { }

  /**
   * Navega a la página de agregar artista.
   */
  agregarArtista() {
    this.ruta.navigate(['artista-component', { esNuevo: true }]);
  }

  /**
   * Navega a la página de agregar canción.
   */
  agregarCancion() {
    this.ruta.navigate(['canciones-component', { esNuevo: true }]);
  }
}
