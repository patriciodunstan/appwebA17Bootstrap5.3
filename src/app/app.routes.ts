import { Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { MaestroCancionesComponent } from './admin/view/maestro/maestro-canciones/maestro-canciones.component';
import { CancionesComponent } from './admin/view/gestion/canciones/canciones.component';
import { MaestroArtistaComponent } from './admin/view/maestro/maestro-artista/maestro-artista.component';
import { ArtistaComponent } from './admin/view/gestion/artista/artista.component';
export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'admin' },
    { path: '', loadComponent: () => import('./admin/admin.component').then(comp => comp.AdminComponent) },
    //     {
    //         path: 'artista-component',
    //         component: ArtistaComponent
    //     },
    //     {
    //         path: 'maestroArtista-component',
    //         component: MaestroArtistaComponent,
    //     },

    //     {
    //         path: 'canciones-component',
    //         component: CancionesComponent
    //     },
    //     {
    //         path: 'maestroCanciones-component',
    //         component: MaestroCancionesComponent,
    //     },
];


