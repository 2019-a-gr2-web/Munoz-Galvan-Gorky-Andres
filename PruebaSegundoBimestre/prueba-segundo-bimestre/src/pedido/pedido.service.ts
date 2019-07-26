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


    crearPedido(nuevoPedido:Pedido):Promise<PedidoEntity>{
        const objetoEntidad = this._pedidosRepository.create(nuevoPedido); //Crea una nueva instancia de la entidad
        return this._pedidosRepository.save(objetoEntidad);
    }

    consultarTodosPedidos():Promise<PedidoEntity[]>{
        return this._pedidosRepository.find({where:{estadoPedido:'Por despachar'}});
    }

    async modificarPedido(idPedido:number):Promise<PedidoEntity[]>{
        const objetoEntidad = await this._pedidosRepository.findOne(idPedido);
        objetoEntidad.estadoPedido = 'Despachado';
        this._pedidosRepository.save(objetoEntidad);
        return this._pedidosRepository.find();
    }
}
