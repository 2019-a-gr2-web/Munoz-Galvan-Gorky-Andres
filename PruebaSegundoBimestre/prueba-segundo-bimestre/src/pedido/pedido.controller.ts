import {Body, Controller, Post} from "@nestjs/common";
import {PedidoService} from "./pedido.service";

@Controller('/api/pedido')
export class PedidoController {

    constructor(private readonly __PedidoService:PedidoService){}

    @Post('nueva-compra')
    postNuevaCompra(@Body() body){



    }
}