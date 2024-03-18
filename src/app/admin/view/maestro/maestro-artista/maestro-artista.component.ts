
import { Component } from '@angular/core';
import { Artista } from 'src/app/admin/models/artista';
import { ArtistasService } from 'src/app/admin/service/artistas/artistas.service';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { NgFor } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-maestro-artista',
  standalone: true,
  imports: [NgFor, RouterOutlet, RouterModule],
  templateUrl: './maestro-artista.component.html',
  styleUrl: './maestro-artista.component.css'
})
export class MaestroArtistaComponent {
  listArtistas: Artista[];
  constructor(private artistaService: ArtistasService, private ruta: Router) { }

  ngOnInit() {
    //carga los artistas
    this.cargar()
  }

  cargar() {
    this.artistaService.obtenerArtistas().subscribe({
      next: (artistas) => {
        this.listArtistas = artistas;
      }
    })
  }

  editar(id: number) {
    this.ruta.navigate(['artista-component', id]);
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
        this.artistaService.obtenerPorIdArtistas(id).subscribe({
          next: (artista: Artista) => { // Explicitly type the 'artista' object as 'Artista'
            this.artistaService.borrarArtista(artista.id)
            this.cargar();
          }
        });
        Swal.fire(
          'Eliminado!',
          'El artista ha sido eliminado correctamente',
        )
      }
    })
  }

}
