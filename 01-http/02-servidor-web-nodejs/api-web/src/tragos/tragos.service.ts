import {Injectable} from "@nestjs/common";
import {Trago} from "./interfaces/trago";
import {TragosEntity} from "./tragos.entity";
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class TragosService {

    constructor(@InjectRepository(TragosEntity)
                private readonly _tragosRepository: Repository<TragosEntity>){

        const traguito:Trago={
            nombre:'Pilsener',
            gradosAlcohol:4.3,
            fechaCaducidad: new Date(2019,5,10),
            precio:1.75,
            tipo:'Cerveza'
        };
        this.crear(traguito);

        const objetoEntidad = this._tragosRepository.create(traguito);
        this._tragosRepository
            .save(objetoEntidad)
            .then(
                (datos)=>{
                    console.log('dato creado:', datos);
                }
            )
            .catch(
                (error)=>{
                    console.log('Error:',error);
                }
            );
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