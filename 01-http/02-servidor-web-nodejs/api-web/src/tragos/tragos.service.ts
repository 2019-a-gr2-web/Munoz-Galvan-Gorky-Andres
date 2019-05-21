import {Injectable} from "@nestjs/common";
import {Trago} from "./interfaces/trago";

@Injectable()
export class TragosService {

    constructor(){
        const traguito:Trago={
            nombre:'Pilsener',
            gradosAlcohol:4.3,
            fechaCaducidad: new Date(2019,5,10),
            precio:1.75,
            tipo:'Cerveza'
        }
        this.crear(traguito);
    }

    bddTragos:Trago[] = [];
    recnum = 1;

    crear(nuevoTrago:Trago):Trago{
        nuevoTrago.id = this.recnum;
        this.recnum++;
        this.bddTragos.push(nuevoTrago);
        return nuevoTrago;
    }
    buscarPorID(id:number):Trago{
        return this.bddTragos.find(
            (trago)=>{
                return trago.id===id;
            }
        )
    }
    buscarPorNombre(nombre:string):Trago{
        return this.bddTragos.find(
            (trago)=>{
                return trago.nombre.toUpperCase().includes(nombre.toUpperCase());
            }
        )
    }
    eliminarPorID(id:number):Trago[]{
        const indice = this.bddTragos.findIndex(
            (trago)=>{
                return trago.id===id;
            }
        );
        this.bddTragos.splice(indice,1);
        return this.bddTragos;
    }
    actualizar(tragoActualizado:Trago,id:number):Trago[]{
        const indice = this.bddTragos.findIndex(
            (trago)=>{
                return trago.id===id;
            }
        );
        tragoActualizado.id = this.bddTragos[indice].id;
        this.bddTragos[indice] = tragoActualizado;
        return this.bddTragos;
    }
}