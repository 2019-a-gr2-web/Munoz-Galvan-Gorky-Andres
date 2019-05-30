import {Injectable} from "@nestjs/common";
import {Producto} from "./interfaces/producto";
import {Tienda} from "../tienda/interfaces/tienda";

@Injectable()
export class ProductoService{

    bddProducto:Producto[] = [];
    recnum = 1;

    buscarProductosPorIdTienda(id:number):Producto[]{
        return this.bddProducto.filter((producto)=>{
            return producto.id === id;
        });
    }

    crearProducto(nuevoProducto:Producto):Producto{
        nuevoProducto.id = this.recnum;
        this.recnum++;
        this.bddProducto.push(nuevoProducto);
        return nuevoProducto;
    }

}