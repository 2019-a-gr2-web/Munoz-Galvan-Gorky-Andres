import {Controller, Get, Res} from "@nestjs/common";
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
        console.log(respuestaConsultar);
        console.log(pedidosPorDespachar);
        res.render('despachar',{
            pedidos:pedidosPorDespachar
        });
    }
}