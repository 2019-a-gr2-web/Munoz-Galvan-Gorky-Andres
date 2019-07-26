import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {PedidoEntity} from "./pedido.entity";
import {PedidoGateway} from "./pedido.gateway";
import {PedidoService} from "./pedido.service";
import {PedidoController} from "./pedido.controller";
import {ActorModule} from "../actor/actor.module";
import {PeliculaModule} from "../pelicula/pelicula.module";


@Module({
    imports:[
        ActorModule,
        PeliculaModule,
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