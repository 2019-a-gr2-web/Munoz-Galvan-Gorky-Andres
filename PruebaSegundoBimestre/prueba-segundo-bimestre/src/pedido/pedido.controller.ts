import {Body, Controller, Get, Post, Res, Session} from "@nestjs/common";
import {PedidoService} from "./pedido.service";
import {Pedido} from "./interfaces/pedido";

@Controller('/api/pedido')
export class PedidoController {

    constructor(private readonly __PedidoService:PedidoService){
    }

    @Get('menu-pedido')
    getMenuCompras(@Res() res,@Session() session){
        res.render('usuario/menu-pedido',{
            nombreUsuario: session.username
        });
    }

    @Get('nueva-compra')
    async getNuevaCompra(@Res() res,
                         @Session() session){

        const pedido = {} as Pedido;
        pedido.estadoPedido = 'Iniciado';
        pedido.ciUsuario = "";
        pedido.totalConImpuesto = 0;
        pedido.totalSinImpuesto = 0;
        pedido.nombreUsuario = "";
        pedido.direccionUsuario = "";
        const pedidoIniciado = await this.__PedidoService.crearPedido(pedido);
        console.log(pedidoIniciado);
        res.render('usuario/pedido')
    }

    @Get('listar-commpras')
    getListarCompras(@Res() res){
        res.render('usuario/listar-compras')
    }

    @Post('nueva-compra')
    async postNuevaCompra(@Body() body,@Res() res){

        const pedido = {} as Pedido;
        pedido.ciUsuario = body.ciUsuario;
        pedido.estadoPedido = "Por despachar";
        pedido.totalConImpuesto = 123.1;
        pedido.totalSinImpuesto = 120.1;
        pedido.nombreUsuario = body.nombreUsuario;
        pedido.direccionUsuario = body.direccionUsuario;

        //const pedido: Pedido = {nombreUsuario: body.nombreUsuario, passUsuario: body.passUsuario};
        const respuestaUsuario = await this.__PedidoService
            .crearPedido(pedido);
        res.redirect('api/pedido/');
    }
}