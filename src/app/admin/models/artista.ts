import { Canciones } from "./canciones";

export class Artista {
    id?: number;
    nombre: string;
    genero: string;
    pais: string;
    canciones: Canciones[];
    activo: boolean;

    constructor(id: number, nombre: string, genero: string, pais: string, canciones: Canciones[], activo: boolean) {
        this.id = id;
        this.nombre = nombre;
        this.genero = genero;
        this.pais = pais;
        this.canciones = canciones;
        this.activo = activo;

    }
}