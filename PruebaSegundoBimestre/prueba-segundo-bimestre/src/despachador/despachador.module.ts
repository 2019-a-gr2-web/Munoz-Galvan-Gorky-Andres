import {Module} from "@nestjs/common";
import {DespachadorController} from "./despachador.controller";
import {PedidoService} from "../pedido/pedido.service";
import {PedidoModule} from "../pedido/pedido.module";

@Module({
    imports:[PedidoModule],
    controllers:[DespachadorController],
    providers:[],
    exports:[]

})
export class DespachadorModule {

}