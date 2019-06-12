export interface Producto {
    id?:number;
    numeroProducto:number;
    nombre:string;
    descripcion: string;
    precio: number;
    fechaLanzamientoProducto: Date;
    aniosGarantia: number;
    tiendaId:number;
}