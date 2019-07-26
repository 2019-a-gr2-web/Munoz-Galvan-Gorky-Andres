import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {PeliculaEntity} from "./pelicula.entity";
import {Repository} from "typeorm";

@Injectable()
export class PeliculaService {

    constructor(@InjectRepository(PeliculaEntity)
                private readonly _peliculasRepository:Repository<PeliculaEntity>)
    {

    }


    eliminarPelicula(idPelicula):Promise<PeliculaEntity[]>{
        this._peliculasRepository.delete(idPelicula);
        return this._peliculasRepository.find();
    }

    consultarPeliculas():Promise<PeliculaEntity[]>{
        return this._peliculasRepository.find()
    }

    consultarPeliculasPorActor(idActor:number):Promise<PeliculaEntity[]>{
        return this._peliculasRepository.find({where:{actor:idActor}})

    }


}