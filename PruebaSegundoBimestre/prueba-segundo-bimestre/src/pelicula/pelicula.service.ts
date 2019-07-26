import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {PeliculaEntity} from "./pelicula.entity";
import {Repository} from "typeorm";
import {Pelicula} from "./interfaces/pelicula";

@Injectable()
export class PeliculaService {

    constructor(@InjectRepository(PeliculaEntity)
                private readonly _peliculasRepository:Repository<PeliculaEntity>)
    {

    }

    crearPelicula(pelicula:Pelicula):Promise<PeliculaEntity>{

        const objetoEntidad = this._peliculasRepository.create(pelicula);
        return this._peliculasRepository.save(objetoEntidad);
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