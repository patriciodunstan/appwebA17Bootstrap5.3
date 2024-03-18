import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_ENV } from 'environment';
import { Canciones } from '../../models/canciones';
import { Observable, switchMap } from 'rxjs';

/**
 * Servicio para gestionar canciones.
 */
@Injectable({
  providedIn: 'root'
})
export class CancionesService {

  constructor(private http: HttpClient) { }
  private apiUrl = `${API_ENV.baseUrl}${API_ENV.cancionesEndpoint}`;

  /**
   * Obtiene todas las canciones.
   * @returns Un Observable de un array de canciones.
   */
  obtenerCanciones(): Observable<Canciones[]> {
    return this.http.get<Canciones[]>(this.apiUrl)
  }

  /**
   * Obtiene una canción por su ID.
   * @param id - El ID de la canción.
   * @returns Un Observable de la canción.
   */
  obtenerPorIdCanciones(id: number): Observable<Canciones> {
    return this.http.get<Canciones>(`${this.apiUrl}/${id}`);
  }

  /**
   * Obtiene canciones por ID de artista.
   * @param idArtista - El ID del artista.
   * @returns Un Observable de un array de canciones.
   */
  obtenerCancionesPorArtista(idArtista: number): Observable<Canciones[]> {
    const url = `${this.apiUrl}/?idArtista=${idArtista}/canciones`;
    return this.http.get<Canciones[]>(url);
  }

  /**
   * Agrega una nueva canción asociada a un artista.
   * 
   * @param cancion La canción a agregar.
   * @param id El ID del artista al que se asociará la canción.
   * @returns Un Observable que emite la respuesta del servidor.
   */
  agregarCanciones(cancion: Canciones, id: number) {
    return this.http.post(`${this.apiUrl}/canciones`, cancion).pipe(
      switchMap((nuevaCancion: Canciones) => {
        return this.http.put(`${this.apiUrl}/artistas/${id}/agregarCancion/${nuevaCancion.id}`, {});
      })
    );
  }

  /**
   * Modifica una canción
   * @param id - El ID de la canción a modificar.
   * @param canciones - La actualización de la canción.
   * @returns Un observable que modifica una canción.
   */
  modificarCanciones(id: number, canciones: Canciones) {
    return this.http.put(`${this.apiUrl}/${id}`, canciones)
  }

  /**
   * Elimina una canción y la remueve del artista asociado.
   * @param idCancion - El ID de la canción a eliminar.
   * @param idArtista - El ID del artista para remover la canción.
   * @returns Un Observable de la canción eliminada.
   */


  /**
   * Elimina una canción y actualiza la lista de canciones de un artista.
   * @param idCancion El ID de la canción a eliminar.
   * @param idArtista El ID del artista al que pertenece la canción.
   * @returns Un Observable que se completa cuando la canción se ha eliminado y la lista de canciones del artista se ha actualizado.
   */
  borrarCanciones(idCancion: number, idArtista: number) {
    return this.http.delete(`${this.apiUrl}/canciones/${idCancion}`).pipe(
      switchMap(() => {
        return this.http.put(`${this.apiUrl}/artistas/${idArtista}/eliminarCancion/${idCancion}`, {});
      })
    );
  }

}
