import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_ENV } from 'environment';
import { Canciones } from '../../models/canciones';
import { Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CancionesService {

  constructor(private http: HttpClient) { }
  private apiUrl = `${API_ENV.baseUrl}${API_ENV.cancionesEndpoint}`;

  obtenerCanciones(): Observable<Canciones[]> {
    return this.http.get<Canciones[]>(this.apiUrl)
  }

  obtenerPorIdCanciones(id: number): Observable<Canciones> {
    return this.http.get<Canciones>(`${this.apiUrl}/${id}`);
  }

  obtenerCancionesPorArtista(idArtista: number): Observable<Canciones[]> {
    const url = `${this.apiUrl}/?idArtista/${idArtista}/canciones`;
    return this.http.get<Canciones[]>(url);
  }

  agregarCanciones(cancion: Canciones, idArtista: number) {
    return this.http.post(`${this.apiUrl}/canciones`, cancion).pipe(
      switchMap((nuevaCancion: Canciones) => {
        return this.http.put(`${this.apiUrl}/artistas/${idArtista}/agregarCancion/${nuevaCancion.id}`, {});
      })
    );
  }

  modificarCanciones(id: number, canciones: Canciones) {
    return this.http.put(`${this.apiUrl}/${id}`, canciones)
  }

  borrarCanciones(idCancion: number, idArtista: number) {
    return this.http.delete(`${this.apiUrl}/canciones/${idCancion}`).pipe(
      switchMap(() => {
        return this.http.put(`${this.apiUrl}/artistas/${idArtista}/eliminarCancion/${idCancion}`, {});
      })
    );
  }

}
