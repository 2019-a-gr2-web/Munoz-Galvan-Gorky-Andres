import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {PedidoEntity} from "./pedido.entity";
import {PedidoGateway} from "./pedido.gateway";

@Module({
    imports:[
        TypeOrmModule.forFeature([
            PedidoEntity
        ],'default')

    ],
    controllers:[],
    providers:[PedidoGateway],
    exports:[]
})
export class PedidoModule {
}