import {Body, Controller, Get, Param, Post, Res, Session} from "@nestjs/common";
import {PedidoService} from "./pedido.service";
import {Pedido} from "./interfaces/pedido";
import {ActorService} from "../actor/actor.service";
import {PeliculaService} from "../pelicula/pelicula.service";
import {PeliculasSeleccionadas} from "./interfaces/peliculasSeleccionadas";

@Controller('/api/pedido')
export class PedidoController {

    constructor(private readonly _PedidoService:PedidoService,
                private readonly _ActorService:ActorService,
                private readonly _PeliculaService:PeliculaService){
    }

    @Get('listar-pedidos')
    getListarPedidos(@Res() res){
        res.redirect('/api/listar-compras');
    }

    @Get('listar-compras')
    async getListarPedidosRender(@Res() res){
        const pedidos:Pedido[] = await this._PedidoService.consultarPedidos();
        res.render('usuario/listar-compras',{
            pedidos
        });
    }

    @Get('menu-pedido')
    getMenuCompras(@Res() res,@Session() session){
        res.render('usuario/menu-pedido',{
            nombreUsuario: session.username
        });
    }

    @Post('anadir-pelicula')
    postAnadirPelicula(@Body() body,@Res() res){
        const peliculasSeleccionadas:PeliculasSeleccionadas[] = this._PedidoService.peliculasSeleccionadas;
            const existePelicula = peliculasSeleccionadas.find((pelicula) => {
                return pelicula.nombrePelicula == body.nombre
            });
            if(existePelicula!=undefined){
                this._PedidoService.modificarPeliculaSeleccionada(existePelicula)
            }else{
                const precio = Number(body.precio);
                const iva = precio * 1.12;
                const peliculaNueva: PeliculasSeleccionadas = {
                    nombrePelicula: body.nombre,
                    cantidadPelicula: 1,
                    precioPelicula: precio,
                    totalSinImpuesto: precio,
                    totalConImpuesto: precio+iva
                };
                this._PedidoService.peliculasSeleccionadas.push(peliculaNueva);
        }
            const url ='/api/pedido/nueva-compra/'+ Number(body.idActor);
        res.redirect(url);
    }

    @Get('nueva-compra/:idActor')
    async getNuevaCompra(@Res() res,
                         @Session() session,
                         @Param() param){

        const idActor = param.idActor;
        const actores = await this._ActorService.consultarActor();
        const precios = this._PedidoService.calcularPrecioTotal();
        if(idActor==-1){
            const pedido = {} as Pedido;
            pedido.estadoPedido = 'Iniciado';
            pedido.ciUsuario = "";
            pedido.totalConImpuesto = 0.0;
            pedido.totalSinImpuesto = 0.0;
            pedido.nombreUsuario = session.username;
            pedido.direccionUsuario = "";
            const pedidoIniciado = await this._PedidoService.crearPedido(pedido);
            const peliculas = [];
            session.nuevoPedido = pedidoIniciado;
            res.render('usuario/pedido',{
                nuevoPedido:pedidoIniciado,
                actores:actores,
                peliculas,
                precios
            })
        }else{
            const peliculas = await this._PeliculaService.consultarPeliculasPorActor(idActor);
            peliculas.forEach((pelicula)=>pelicula.actor = idActor);
            const pedido: Pedido= session.nuevoPedido;
            console.log(pedido.idPedido);
            res.render('usuario/pedido',{
                nuevoPedido:pedido,
                actores:actores,
                peliculas:peliculas,
                precios
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
        pedido.totalConImpuesto = body.totalConImpuesto;
        pedido.totalSinImpuesto = body.totalSinImpuesto;
        pedido.nombreUsuario = body.nombreUsuario;
        pedido.direccionUsuario = body.direccionUsuario;

        const respuestaUsuario = await this._PedidoService
            .crearPedido(pedido);
        console.log('creó');
        res.redirect('/api/pedido/menu-pedido');
    }
}