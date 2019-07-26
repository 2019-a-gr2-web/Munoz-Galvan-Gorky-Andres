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

    async modificarPelicula(pelicula:Pelicula):Promise<PeliculaEntity[]>{
        const objetoEntidad: Pelicula = await this._peliculasRepository.findOne(pelicula.id)
        objetoEntidad.anioLanzamientoPelicula = pelicula.anioLanzamientoPelicula;
        objetoEntidad.actoresPrincipalesPelicula = pelicula.actoresPrincipalesPelicula;
        objetoEntidad.ratingPelicula = pelicula.ratingPelicula;
        objetoEntidad.sinopsisPelicula = pelicula.sinopsisPelicula;
        objetoEntidad.precioPelicula = pelicula.precioPelicula;
        this._peliculasRepository.save(objetoEntidad);
        return this._peliculasRepository.find();
    }

    crearPelicula(pelicula:Pelicula):Promise<PeliculaEntity>{

        const objetoEntidad = this._peliculasRepository.create(pelicula);
        return this._peliculasRepository.save(objetoEntidad);
    }

    eliminarPelicula(idPelicula):Promise<PeliculaEntity[]>{
        this._peliculasRepository.delete(idPelicula);
        return this._peliculasRepository.find();
    }

    consultarPeliculaPorNombre(idActor:number,campoBusqueda:string):Promise<PeliculaEntity[]>{

                return this._peliculasRepository.find({where:[
                        {actor:idActor,nombrePelicula:campoBusqueda},
                        {actor:idActor,actoresPrincipalesPelicula:campoBusqueda},
                    ]});
    }

    consultarPeliculas():Promise<PeliculaEntity[]>{
        return this._peliculasRepository.find()
    }

    consultarPeliculasPorActor(idActor:number):Promise<PeliculaEntity[]>{
        return this._peliculasRepository.find({where:{actor:idActor}})

    }


}