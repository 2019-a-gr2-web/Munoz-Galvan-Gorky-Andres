import {Controller, Get, Post, Request, Res, Response} from "@nestjs/common";
import {TiendaService} from "./tienda.service";
import {Body} from "@nestjs/common/decorators/http/route-params.decorator";
import {Tienda} from "./interfaces/tienda";

@Controller('api/tienda')
export class TiendaController{
    constructor(private readonly _tiendaService:TiendaService) {}

    revisarCookieSegura(@Request() req):boolean{
        const cookieSegura = req.signedCookies.nombreUsuario;
        return !!cookieSegura;
    }



    @Get('/gestionar')
    gestionarPapas(@Request() req,
                   @Response() res)
    {
        const nombreUsuarioRecibido = this._tiendaService.nombreUsuario;
        const cookieSegura = this.revisarCookieSegura(req);
        if(cookieSegura){
            return res.render('tienda/gestionar-papas',{
                nombreUsuarioParametro:nombreUsuarioRecibido,
            });
        }else{
            return res.redirect('/api/home');
        }
    }
    @Get('crear-tienda')
    crearTienda(@Response() res){
        const nombreUsuarioRecibido = this._tiendaService.nombreUsuario;
        res.render('tienda/crear-tienda',{
                nombreUsuarioParametro:nombreUsuarioRecibido,
            });
    }
    @Get('listar-papas')
    listarPapas(@Response() res){
        const nombreUsuarioRecibido = this._tiendaService.nombreUsuario;
        const bddTiendas = this._tiendaService.bddTiendas;
        return res.render('tienda/listar-papas', {
                nombreUsuarioParametro:nombreUsuarioRecibido,
                arregloPapas:bddTiendas,
            });
    }
    @Post('buscar-tienda')
    postBuscarTienda(
        @Body() nombreTiendaParametro, @Res() res
    ){
        console.log(nombreTiendaParametro.nombreTienda);
        const nombreUsuarioRecibido = this._tiendaService.nombreUsuario;
        const resultadoTiendaBusqueda:Tienda[] = this._tiendaService.buscarPorNombre(nombreTiendaParametro.nombreTienda);

        console.log(resultadoTiendaBusqueda);
        res.render('tienda/listar-papas',{
            nombreUsuarioParametro:nombreUsuarioRecibido,
            arregloPapas:resultadoTiendaBusqueda
        })
    }

    @Post('eliminar')
    postEliminarTienda(
        @Body() id:number,
        @Res() res
    ){
        this._tiendaService.eliminarTiendaPorID(id);
        res.redirect('/api/tienda/listar-papas');
    }

    @Post('registrar-tienda')
    postRegistrarTienda(
        @Body() tienda:Tienda,
        @Response() res){
        tienda.RUC = Number(tienda.RUC);
        tienda.fechaApertura = new Date(tienda.fechaApertura);
        tienda.matriz = Boolean(tienda.matriz);
        console.log(tienda);

        this._tiendaService.crearTienda(tienda);
        res.redirect('/api/tienda/listar-papas');

    }

}