import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {PeliculaEntity} from "./pelicula.entity";
import {Repository} from "typeorm";

@Injectable()
export class PeliculaService {

    constructor(@InjectRepository(PeliculaEntity)
                private readonly _peliculasRepository:Repository<PeliculaEntity>)
    {}

    consultarPeliculasPorActor(idActor:number):Promise<PeliculaEntity[]>{
        console.log(idActor);

        return this._peliculasRepository.find({where:{actor:idActor}})

    }


}