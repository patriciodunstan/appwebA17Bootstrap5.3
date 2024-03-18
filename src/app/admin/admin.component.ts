import { ArtistaComponent } from './view/gestion/artista/artista.component';
import { Component } from '@angular/core';
import { BarralateraComponent } from './componentes/barralatera/barralatera.component';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MaestroArtistaComponent } from './view/maestro/maestro-artista/maestro-artista.component';


@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [MaestroArtistaComponent, ArtistaComponent, BarralateraComponent, RouterOutlet, RouterModule, ReactiveFormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

}
