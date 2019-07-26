import {Body, Controller, Get, Param, Post, Res, Session} from "@nestjs/common";
import {PedidoService} from "./pedido.service";
import {Pedido} from "./interfaces/pedido";
import {ActorService} from "../actor/actor.service";
import {PeliculaService} from "../pelicula/pelicula.service";

@Controller('/api/pedido')
export class PedidoController {

    constructor(private readonly _PedidoService:PedidoService,
                private readonly _ActorService:ActorService,
                private readonly _PeliculaService:PeliculaService){
    }

    @Get('menu-pedido')
    getMenuCompras(@Res() res,@Session() session){
        res.render('usuario/menu-pedido',{
            nombreUsuario: session.username
        });
    }

    @Get('nueva-compra/:idActor')
    async getNuevaCompra(@Res() res,
                         @Session() session,
                         @Param() param){

        const pedido = {} as Pedido;
        pedido.estadoPedido = 'Iniciado';
        pedido.ciUsuario = "";
        pedido.totalConImpuesto = 0;
        pedido.totalSinImpuesto = 0;
        pedido.nombreUsuario = session.username;
        pedido.direccionUsuario = "";
        const pedidoIniciado = await this._PedidoService.crearPedido(pedido);
        console.log(pedidoIniciado);
        const idActor = param.idActor;
        console.log(idActor);
        const actores = await this._ActorService.consultarActor();
        if(idActor==0){
            res.render('usuario/pedido',{
                nuevoPedido:pedidoIniciado,
                actores:actores,
            })
        }else{
            const peliculas = await this._PeliculaService.consultarPeliculasPorActor(idActor);
            console.log(peliculas);
            res.render('usuario/pedido',{
                nuevoPedido:pedidoIniciado,
                actores:actores,
                posActor:idActor,
                peliculas:peliculas,
            })

        }

    }

    @Get('listar-commpras')
    getListarCompras(@Res() res){
        res.render('usuario/listar-compras')
    }

    @Post('nueva-compra')
    async postNuevaCompra(@Body() body,@Res() res){

        this._PedidoService.modificarPedido(body.idPedido);
        const pedido = {} as Pedido;
        pedido.ciUsuario = body.ciUsuario;
        pedido.estadoPedido = "Por despachar";
        pedido.totalConImpuesto = 123.1;
        pedido.totalSinImpuesto = 120.1;
        pedido.nombreUsuario = body.nombreUsuario;
        pedido.direccionUsuario = body.direccionUsuario;

        //const pedido: Pedido = {nombreUsuario: body.nombreUsuario, passUsuario: body.passUsuario};
        const respuestaUsuario = await this._PedidoService
            .crearPedido(pedido);
        res.redirect('api/pedido/');
    }
}