import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Artista } from '../../../models/artista';
import { ArtistasService } from '../../../service/artistas/artistas.service';
import Swal from 'sweetalert2';
import { NgFor, NgIf } from '@angular/common';


export interface ParametrosArtista {
  esNuevo: boolean;
  artistaId?: number;

}
/**
 * Componente para gestionar artistas.
 */
@Component({
  selector: 'app-artista',
  standalone: true,
  imports: [NgFor, NgIf, ReactiveFormsModule],
  templateUrl: './artista.component.html',
  styleUrls: ['./artista.component.css']
})
export class ArtistaComponent implements OnInit {
  formArtista: FormGroup;
  artistas: Artista;
  esNuevo: boolean = true;
  titulo: string = '';
  formValido: boolean = true;
  mensaje: string;

  constructor(
    private artistaService: ArtistasService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  /**
   * Inicializa el componente.
   */
  ngOnInit() {

    this.titulo = 'Artista';

    this.formArtista = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      genero: new FormControl('', [Validators.required]),
      pais: new FormControl('', [Validators.required]),
      activo: new FormControl(true),
    });

    if (!this.esNuevo) {
      this.artistaService.obtenerArtistas().subscribe((artistas: Artista[]) => {
        this.artistas = artistas[0];
        this.formArtista.setValue({
          nombre: this.artistas.nombre,
          genero: this.artistas.genero,
          pais: this.artistas.pais,
          activo: this.artistas.activo,
        });
      });
    }
  }

  /**
   * Agrega un artista.
   */
  agregar() {
    if (!this.formArtista.valid) {
      this.formValido = false;
      this.mensaje = 'Favor de llenar todos los campos';
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
          const artistas: Artista = {
            nombre: this.formArtista.value.nombre,
            genero: this.formArtista.value.genero,
            pais: this.formArtista.value.pais,
            activo: this.formArtista.value.activo,
          };
          this.artistaService.agregarArtistas(artistas).subscribe({
            next: () => {
              this.formValido = true;
              this.router.navigate(['maestroArtista-component']);
            }
          });
          Swal.fire('Guardado', 'Artista guardado con éxito', 'success');
        }
      })
    }
  }

  /**
   * Edita un artista.
   */
  editar(id: number) {
    if (!this.formArtista.valid) {
      this.formValido = false;
      this.mensaje = 'Favor de llenar todos los campos';
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
          const artistas: Artista = {
            nombre: this.formArtista.value.nombre,
            genero: this.formArtista.value.genero,
            pais: this.formArtista.value.pais,
            activo: this.formArtista.value.activo,
          };
          this.artistaService.agregarArtistas(artistas).subscribe({
            next: () => {
              this.formValido = true;
              this.router.navigate(['artista-component', id]);
            }
          });
          Swal.fire('Guardado', 'Artista guardado con éxito', 'success');
        }
      })
    }
  }

  /**
   * Convierte un objeto de tipo AbstractControl en un objeto de tipo FormControl.
   * 
   * @param abstractControl El objeto de tipo AbstractControl a convertir.
   * @returns El objeto de tipo FormControl resultante.
   */
  asformControl(abstractControl: AbstractControl): FormControl {
    return abstractControl as FormControl;
  }

}







