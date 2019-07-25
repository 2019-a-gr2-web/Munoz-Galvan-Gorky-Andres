import {Injectable} from "@nestjs/common";
import {Repository} from "typeorm";
import {PedidoEntity} from "./pedido.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Pedido} from "./interfaces/pedido";

@Injectable()
export class PedidoService {

    constructor(@InjectRepository(PedidoEntity)
                private readonly _pedidosRepository: Repository<PedidoEntity>){
    }

    nuevoPedido:Pedido;

    crearPedido(nuevoPedido:Pedido):Promise<PedidoEntity>{
        const objetoEntidad = this._pedidosRepository.create(nuevoPedido); //Crea una nueva instancia de la entidad
        return this._pedidosRepository.save(objetoEntidad);
    }
}