import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_ENV } from 'environment';
import { Artista } from '../../models/artista';
import { Observable, map, switchMap } from 'rxjs';
/**
 * Servicio para manejar las operaciones relacionadas con los artistas.
 */
@Injectable({
  providedIn: 'root'
})
export class ArtistasService {

  constructor(private http: HttpClient) { }
  private apiUrl = `${API_ENV.baseUrl}${API_ENV.artistasEndpoint}`;

  /**
   * Obtiene todos los artistas.
   * @returns Un Observable que emite un array de objetos Artista.
   */
  obtenerArtistas(): Observable<Artista[]> {
    return this.http.get<Artista[]>(this.apiUrl);
  }

  /**
   * Obtiene un artista por su ID.
   * @param id El ID del artista.
   * @returns Un Observable que emite un objeto Artista.
   */
  obtenerPorIdArtistas(id: number): Observable<Artista> {
    return this.http.get<Artista>(`${this.apiUrl}/${id}`);
  }

  /**
   * Obtiene el artista asociado a una canción.
   * @param cancionId El ID de la canción.
   * @returns Un Observable que emite un objeto Artista.
   */
  obtenerArtistaPorCancion(cancionId: number): Observable<Artista> {
    return this.http.get<Artista[]>(`${this.apiUrl}/?canciones=${cancionId}`).pipe(
      map(artistas => artistas[0])
    );
  }

  /**
   * Agrega un nuevo artista.
   * @param artista El objeto Artista a agregar.
   * @returns Un Observable que emite la respuesta del servidor.
   */
  agregarArtistas(artista: Artista) {
    return this.http.post(this.apiUrl, artista);
  }

  /**
   * Modifica un artista existente.
   * @param id El ID del artista a modificar.
   * @param artista El objeto Artista modificado.
   * @returns Un Observable que emite la respuesta del servidor.
   */
  modificarArtistas(id: number, artista: Artista) {
    return this.http.put(`${this.apiUrl}/${id}`, artista);
  }

  /**
   * Borra un artista y todas sus canciones asociadas.
   * @param id El ID del artista a borrar.
   * @returns Un Observable que emite la respuesta del servidor.
   */
  borrarArtista(id: number) {
    return this.http.delete(`${this.apiUrl}/artistas/${id}`).pipe(
      switchMap(() => {
        return this.http.delete(`${this.apiUrl}/canciones/${id}/eliminarCanciones`, {});
      })
    );
  }
}




