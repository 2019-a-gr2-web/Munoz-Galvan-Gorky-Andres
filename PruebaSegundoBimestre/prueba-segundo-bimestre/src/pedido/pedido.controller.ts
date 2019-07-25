import {Body, Controller, Get, Post, Res} from "@nestjs/common";
import {PedidoService} from "./pedido.service";
import {Pedido} from "./interfaces/pedido";

@Controller('/api/pedido')
export class PedidoController {

    constructor(private readonly __PedidoService:PedidoService){
    }


    @Post('nueva-compra')
    async postNuevaCompra(@Body() body,@Res() res){

        const pedido = {} as Pedido;
        pedido.ciUsuario = "12312223";
        pedido.estadoPedido = "Por despachar";
        pedido.totalConImpuesto = 123.1;
        pedido.totalSinImpuesto = 120.1;
        pedido.nombreUsuario = 'gorks';
        pedido.direccionUsuario = "asdasd";

        //const pedido: Pedido = {nombreUsuario: body.nombreUsuario, passUsuario: body.passUsuario};
        const respuestaUsuario = await this.__PedidoService
            .crearPedido(pedido);

    }
}