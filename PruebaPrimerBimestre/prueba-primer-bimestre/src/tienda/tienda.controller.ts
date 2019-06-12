import {Controller, Get, Post, Req, Res, Response} from "@nestjs/common";
import {TiendaService} from "./tienda.service";
import {Body} from "@nestjs/common/decorators/http/route-params.decorator";
import {Tienda} from "./interfaces/tienda";
import {AppService} from "../app.service";

@Controller('api/tienda')
export class TiendaController{
    constructor(private readonly _tiendaService:TiendaService,private readonly _appService:AppService) {}

    @Get('crear-tienda')
    crearTienda(@Response() res,@Req()req){
        const nombreUsuario = req.signedCookies.nombreUsuario;
        if(this._appService.revisarCookieSegura(req)){
            res.render('tienda/crear-tienda',{nombreUsuario
            });
        }else{
            res.redirect('/api/home');
        }
    }
    @Get('listar-tiendas')
    listarTiendas(@Res() res,@Req() req){
        const nombreUsuario = req.signedCookies.nombreUsuario;
        const bddTiendas = this._tiendaService.bddTiendas;
        if(this._appService.revisarCookieSegura(req)){
            return res.render('tienda/listar-papas', {
                nombreUsuario, bddTiendas,
            });
        }else{
            res.redirect('/api/home');
        }

    }
    @Post('buscar-tienda')
    postBuscarTienda(
        @Body() nombreTiendaParametro,
        @Res() res,
        @Req() req
    ){
        const nombreUsuario = req.signedCookies.nombreUsuario;
        if(this._appService.revisarCookieSegura(req)){
            const bddTiendas:Tienda[] = this._tiendaService.buscarPorNombre(nombreTiendaParametro.nombreTienda);
            if(bddTiendas.length>0){
                res.render('tienda/listar-papas', {
                    nombreUsuario, bddTiendas,
                })
            }else{
                res.redirect('/api/tienda/listar-tiendas')
            }
        }else{
            res.redirect('/api/home');
        }
    }

    @Post('eliminar')
    postEliminarTienda(
        @Body() id,
        @Res() res,
        @Req() req
    ){
        if(this._appService.revisarCookieSegura(req)){
            this._tiendaService.eliminarTiendaPorID(id.id);
            res.redirect('/api/tienda/listar-tiendas');
        }else{
            res.redirect('/api/home')
        }

    }

    @Post('registrar-tienda')
    postRegistrarTienda(
        @Body() tienda:Tienda,
        @Response() res,
        @Req() req){
        if(this._appService.revisarCookieSegura(req)){
            tienda.RUC = Number(tienda.RUC);
            tienda.fechaApertura = new Date(tienda.fechaApertura);
            tienda.matriz = Boolean(tienda.matriz);
            this._tiendaService.crearTienda(tienda);
            res.redirect('/api/tienda/listar-tiendas');
        }else{
            res.redirect('/api/home')
        }
    }

}