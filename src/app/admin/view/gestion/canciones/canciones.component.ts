import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { NgFor, NgIf } from '@angular/common';
import { Canciones } from 'src/app/admin/models/canciones';
import { CancionesService } from 'src/app/admin/service/canciones/canciones.service';
import { formatDate } from '@angular/common';
import { ArtistasService } from 'src/app/admin/service/artistas/artistas.service';
import { Artista } from 'src/app/admin/models/artista';

export interface ParametrosCanciones {
  esNuevo: boolean;
  cancionId?: number;

}

type formCancionesValue = {
  id: number;
  nombre: string;
  letra: string;
  fechaInscripcion: Date;
  valorCancionTocada: number;
  disponible: boolean;
  artistaId: number;
}
/**
 * Componente para la gestión de canciones.
 * 
 * @remarks
 * Este componente se encarga de la gestión de canciones, incluyendo la creación, edición y visualización de canciones.
 * 
 * @packageDocumentation
 */
@Component({
  selector: 'app-canciones',
  standalone: true,
  imports: [NgFor, NgIf, ReactiveFormsModule],
  templateUrl: './canciones.component.html',
  styleUrl: './canciones.component.css'
})
export class CancionesComponent {
  formCanciones: FormGroup;
  canciones: Canciones;
  listaArtista: Artista[];
  esNuevo: boolean = true;
  titulo: string = '';
  formValido: boolean = true;
  mensaje: string;


  constructor(
    private artistaService: ArtistasService,
    private cancionesService: CancionesService,
    private route: ActivatedRoute,
    private router: Router
  ) { }


  ngOnInit() {
    this.titulo = 'Canciones';

    this.formCanciones = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      genero: new FormControl('', [Validators.required]),
      pais: new FormControl('', [Validators.required]),
      activo: new FormControl(true),
      artistaId: new FormControl('', [Validators.required])
    });

    /**carga lista de artista para seleccion en formulario */
    this.obtenerArtistas();

    /**si detecta que la no es nueva, genera formulario para agregar en caso contrario pasa a editar */
    if (!this.esNuevo) {
      this.cancionesService.obtenerCanciones().subscribe((canciones: Canciones[]) => {
        this.canciones = canciones[0];
        this.formCanciones.setValue({
          nombre: this.canciones.nombre,
          letra: this.canciones.letra,
          fechaInscripcion: formatDate(this.canciones.fechaInscripcion, 'dd-MM-yyyy', 'es-ES'),
          valorCancionTocada: this.canciones.valorCancionTocada,
          disponible: this.canciones.disponible,
          artistaId: this.canciones.artistaId
        });
      });
    }
  }

  /**
   * Obtiene la lista de artistas.
   */
  obtenerArtistas() {
    this.artistaService.obtenerArtistas().subscribe((artistas: Artista[]) => {
      this.listaArtista = artistas;
    });
  }

  /**función encargada de agregar canciones, ademas esta hecha para que al agregar una cancion seleccione un artista
   * al cual asignale esa canción
   */
  agregar() {
    if (!this.formCanciones.valid) {
      this.formValido = false;
      this.mensaje = 'Por favor complete los campos requeridos';
    } else {
      Swal.fire({
        title: '¿Seguro que desea guardar?',
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        cancelButtonColor: '#ce0000',
        confirmButtonText: 'Si, guardar',
        confirmButtonColor: '#029924',
      }).then((resultado) => {
        const canciones: Canciones = {
          nombre: this.formCanciones.value.nombre,
          letra: this.formCanciones.value.letra,
          fechaInscripcion: this.formCanciones.value.fechaInscripcion,
          valorCancionTocada: this.formCanciones.value.valorCancionTocada,
          disponible: this.formCanciones.value.disponible,
          artistaId: this.formCanciones.value.artistaId
        }
        this.cancionesService.agregarCanciones(canciones, canciones.id).subscribe(() => {
          this.formValido = true;
          this.router.navigate(['maestroCanciones-cmoponent']);
        })
      })
      Swal.fire(
        'Guardado',
        'La canción ha sido guardada',
        'success'
      )
    }
  }

  /**
   * función de editar con las mismas caracteristicas que la anterior pero cambia una canción ya existente
   */
  editar(id: number) {
    if (!this.formCanciones.valid) {
      this.formValido = false;
      this.mensaje = 'Por favor complete los campos requeridos';
    } else {
      Swal.fire({
        title: '¿Seguro que desea guardar?',
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        cancelButtonColor: '#ce0000',
        confirmButtonText: 'Si, guardar',
        confirmButtonColor: '#029924',
      }).then((resultado) => {
        if (resultado.value) {
          const canciones = this.formCanciones.value as formCancionesValue;
          const cancionesDTO: Canciones = {
            nombre: this.canciones.nombre,
            letra: this.canciones.letra,
            fechaInscripcion: this.canciones.fechaInscripcion,
            valorCancionTocada: this.canciones.valorCancionTocada,
            disponible: this.canciones.disponible,
            artistaId: this.canciones.artistaId
          }
          this.cancionesService.modificarCanciones(canciones.id, cancionesDTO).subscribe(() => {
            this.formValido = true;
            this.router.navigate(['canciones-component', id]);
          })
        }
      })
      Swal.fire(
        'Guardado',
        'La canción ha sido guardada',
        'success'
      )
    }
  }

  /**
   * Convierte un objeto de tipo AbstractControl en un objeto de tipo FormControl.
   * 
   * @param abstractControl El objeto de tipo AbstractControl a convertir.
   * @returns Un objeto de tipo FormControl.
   */
  asformControl(abstractControl: AbstractControl): FormControl {
    return abstractControl as FormControl;
  }

}