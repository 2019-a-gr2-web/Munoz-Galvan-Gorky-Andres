import {Body, Controller, Get, Post, Res} from "@nestjs/common";
import {PedidoService} from "../pedido/pedido.service";
import {Pedido} from "../pedido/interfaces/pedido";

@Controller('api/despachador')
export class DespachadorController {

    constructor(private readonly _PedidoService:PedidoService){}

    @Get('consultar-pedidos')
    async getConsultarPedidos(@Res() res){
        const respuestaConsultar: Pedido[] = await this._PedidoService.consultarTodosPedidos();
        const pedidosPorDespachar = respuestaConsultar.filter((pedido)=>{
            return pedido.estadoPedido === 'Por despachar'
        });

        res.render('despachador/despachar',{
            pedidos:pedidosPorDespachar
        });
    }

    @Post('despachar-pedido')
    async postDespacharPedido(@Body() body, @Res() res){
                const idPedido = body.idPedido;
                await this._PedidoService.modificarPedido(idPedido);
                res.redirect('/api/despachador/consultar-pedidos');
                /*res.render('despachar',{
                    pedidos:respuesta
                })*/
    }
}