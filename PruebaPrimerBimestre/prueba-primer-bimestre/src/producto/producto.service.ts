import {Injectable} from "@nestjs/common";
import {Producto} from "./interfaces/producto";

@Injectable()
export class ProductoService{

    idPadre:number;
    bddProducto:Producto[] = [];
    recnum = 1;

    buscarProductosPorIdTienda(id:number):Producto[]{
        return this.bddProducto.filter((producto)=>{
            return producto.tiendaId === id;
        });
    }

    eliminarProductoPorId(id:number){
        const indice = this.bddProducto.findIndex(
            (trago)=>{
                return trago.id===id;
            }
        );
        const tiendaId = this.bddProducto.find(
            (producto)=>{
                return producto.id == id;
            }
        );
        this.bddProducto.splice(indice,1);
        return tiendaId.tiendaId;
    }

    crearProducto(nuevoProducto:Producto):Producto{
        nuevoProducto.id = this.recnum;
        this.recnum++;
        nuevoProducto.tiendaId = this.idPadre;
        this.bddProducto.push(nuevoProducto);
        console.log(nuevoProducto);
        return nuevoProducto;
    }

    buscarProductoPorNombre(nombreTienda){
        return this.bddProducto.filter(
            (producto)=>{
                return producto.nombre.toUpperCase().includes(nombreTienda.toString().toUpperCase());
            }
        );
    }

    buscarProductoPorId(id:number){
        return this.bddProducto.find((producto)=>{return producto.id==id})

    }

}