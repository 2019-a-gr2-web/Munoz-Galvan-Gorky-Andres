import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {PedidoEntity} from "./pedido.entity";
import {PedidoGateway} from "./pedido.gateway";
import {PedidoService} from "./pedido.service";
import {PedidoController} from "./pedido.controller";

@Module({
    imports:[
        TypeOrmModule.forFeature([
            PedidoEntity
        ],'default')

    ],
    controllers:[PedidoController],
    providers:[PedidoService,PedidoGateway],
    exports:[PedidoService]
})
export class PedidoModule {
}