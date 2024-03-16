import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_ENV } from 'environment';
import { Artista } from '../../models/artista';
import { Observable, map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ArtistasService {

  constructor(private http: HttpClient) { }
  private apiUrl = `${API_ENV.baseUrl}${API_ENV.artistasEndpoint}`;

  obtenerArtistas(): Observable<Artista[]> {
    return this.http.get<Artista[]>(this.apiUrl)
  }

  obtenerPorIdArtistas(id: number): Observable<Artista> {
    return this.http.get<Artista>(`${this.apiUrl}/${id}`);
  }

  obtenerArtistaPorCancion(cancionId: number): Observable<Artista> {
    return this.http.get<Artista[]>(`${this.apiUrl}/?canciones=${cancionId}`).pipe(
      map(artistas => artistas[0])
    )
  }

  agregarArtistas(artista: Artista) {
    return this.http.post(this.apiUrl, artista);
  }

  modificarArtistas(id: number, artista: Artista) {
    return this.http.put(`${this.apiUrl}/${id}`, artista)
  }

  borrarArtista



}
