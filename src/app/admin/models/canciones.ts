export class Canciones {
    id?: number;
    nombre: string;
    letra: string;
    fechaInscripcion: Date;
    artistaId: number;
    valorCancionTocada: number;
    disponible: boolean;

    constructor(id: number, nombre: string, letra: string, fechaInscripcion: Date, artistaId: number, valorCancionTocada: number, disponible: boolean) {
        this.id = id;
        this.nombre = nombre;
        this.letra = letra;
        this.fechaInscripcion = fechaInscripcion;
        this.artistaId = artistaId;
        this.valorCancionTocada = valorCancionTocada;
        this.disponible = disponible;
    }
}