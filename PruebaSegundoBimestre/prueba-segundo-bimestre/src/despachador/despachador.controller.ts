import {Controller, Get, Res} from "@nestjs/common";
import {PedidoService} from "../pedido/pedido.service";

@Controller('api/despachador')
export class DespachadorController {

    constructor(private readonly _PedidoService:PedidoService){}

    @Get('consultar-pedidos')
    async getConsultarPedidos(@Res() res){
        const respuestaConsultar = await this._PedidoService.consultarTodosPedidos();
        const pedidosPorDespachar = respuestaConsultar.filter((pedido)=>{
            pedido.estadoPedido == 'Por despachar'
        });
        console.log(pedidosPorDespachar);
        res.render('despachar',{
            pedidos:pedidosPorDespachar
        });
    }
}