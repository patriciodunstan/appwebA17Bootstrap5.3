import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { NgFor } from '@angular/common';
import { CancionesService } from 'src/app/admin/service/canciones/canciones.service';
import { Canciones } from 'src/app/admin/models/canciones';
import Swal from 'sweetalert2';
import { ArtistasService } from 'src/app/admin/service/artistas/artistas.service';
import { Artista } from 'src/app/admin/models/artista';

@Component({
  selector: 'app-maestro-canciones',
  standalone: true,
  imports: [NgFor, RouterOutlet, RouterModule],
  templateUrl: './maestro-canciones.component.html',
  styleUrl: './maestro-canciones.component.css'
})
export class MaestroCancionesComponent {
  artista: Artista;
  listaCanciones: Canciones[];

  constructor(
    private artistaService: ArtistasService,
    private cancionesService: CancionesService,
    private ruta: Router
  ) { }

  ngOnInit() {
    this.cargar()
  }

  cargar() {
    this.cancionesService.obtenerCanciones().subscribe({
      next: (canciones) => {
        this.listaCanciones = canciones
      }
    })
  }

  editar(id: number) {
    this.ruta.navigate(['canciones-component', id]);
  }

  eliminar(id: number) {
    Swal.fire({
      title: '¿Seguro que desea eliminar?',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      cancelButtonColor: '#ce0000',
      confirmButtonText: 'Si, eliminar',
      confirmButtonColor: '#029924',
    }).then((result) => {
      if (result.value) {
        this.cancionesService.obtenerPorIdCanciones(id).subscribe({
          next: (cancion: Canciones) => {
            this.artistaService.obtenerArtistaPorCancion(id).subscribe({
              next: (artistaId: Artista) => { // Add missing colon and use 'Artista' instead of 'artista'
                this.cancionesService.borrarCanciones(cancion.id, artistaId.id); // Add missing semicolon and pass artistaId.artistaId as the second argument
                this.cargar();
              }
            });
          }
        });
        Swal.fire(
          'Eliminado!',
          'El artista ha sido eliminado correctamente',
        );
      }
    })
  }
}
