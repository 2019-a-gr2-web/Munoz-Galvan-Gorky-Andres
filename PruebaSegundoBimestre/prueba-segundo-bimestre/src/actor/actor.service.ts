import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {PedidoEntity} from "../pedido/pedido.entity";
import {ActorEntity} from "./actor.entity";
import {Repository} from "typeorm";

@Injectable()
export class ActorService {

    constructor(@InjectRepository(ActorEntity)
                private readonly _actoresRepository:Repository<ActorEntity>)
    {}

    consultarActor():Promise<ActorEntity[]>{
        return this._actoresRepository.find();
    }

    consultarActorPorId(idActor:number):Promise<ActorEntity>{
        return this._actoresRepository.findOne({where:{id:idActor}});
    }


}
