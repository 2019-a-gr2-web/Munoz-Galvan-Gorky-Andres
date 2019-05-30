import {Injectable} from "@nestjs/common";
import {Tienda} from "./interfaces/tienda";

@Injectable()
export class TiendaService{
    nombreUsuario:string = "";
    bddTiendas:Tienda[]=[];
    recnum = 1;

    crearTienda(nuevaTienda:Tienda):Tienda{
        nuevaTienda.id = this.recnum;
        this.recnum++;
        this.bddTiendas.push(nuevaTienda);
        return nuevaTienda;
    }

    buscarTiendaPorID(id:number):Tienda{
        return this.bddTiendas.find(
            (tienda)=>{
                return tienda.id===id;
            }
        )
    }
    buscarPorNombre(nombreTienda){
        return this.bddTiendas.filter(
            (tienda)=>{
                return tienda.nombre.toUpperCase().includes(nombreTienda.toString().toUpperCase());
            }
        );
    }
    eliminarTiendaPorID(id:number):Tienda[]{
        const indice = this.bddTiendas.findIndex(
            (trago)=>{
                return trago.id===id;
            }
        );
        this.bddTiendas.splice(indice,1);
        return this.bddTiendas;
    }
}