import { Routes } from "@angular/router";
import { ArtistaComponent } from "./view/gestion/artista/artista.component";
import { CancionesComponent } from "./view/gestion/canciones/canciones.component";
import { MaestroArtistaComponent } from "./view/maestro/maestro-artista/maestro-artista.component";
import { MaestroCancionesComponent } from "./view/maestro/maestro-canciones/maestro-canciones.component";

export const routes: Routes = [
    {
        path: 'artista-component/:id',
        component: ArtistaComponent
    },
    {
        path: 'maestroArtista-component',
        component: MaestroArtistaComponent,
    },

    {
        path: 'canciones-component/:id',
        component: CancionesComponent
    },
    {
        path: 'maestroCanciones-component',
        component: MaestroCancionesComponent,
    },
];