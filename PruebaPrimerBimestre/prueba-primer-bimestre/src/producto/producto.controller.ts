import {Body, Controller, Get, Param, Post, Req, Res, Response} from "@nestjs/common";
import {ProductoService} from "./producto.service";
import {Producto} from "./interfaces/producto";
import {AppService} from "../app.service";
import {Tienda} from "../tienda/interfaces/tienda";

@Controller('api/producto')
export class ProductoController {

    constructor(private readonly _productoService:ProductoService,private readonly _appService:AppService) {
    }

    @Get('gestionar-productos/:id')
    getGestionarHijos(@Param() params, @Res() res,@Req() req){
        if(this._appService.revisarCookieSegura(req)){
            const id = Number(params.id);
            this._productoService.idPadre = id;
            const nombreUsuario = req.signedCookies.nombreUsuario;
            const listaHijos = this._productoService.buscarProductosPorIdTienda(id);
            res.render('producto/listar-productos',{
                nombreUsuario, listaHijos,
            });
        }else{
            res.redirect('/api/home');
        }
    }

    @Get('crear-producto')
    getCrearProducto(@Req() req, @Res() res){
        if(this._appService.revisarCookieSegura(req)){
            const tiendaId = this._productoService.idPadre;
            const nombreUsuario = req.signedCookies.nombreUsuario;
            res.render('producto/crear-producto',{
                nombreUsuario,tiendaId
            });
        }else{
            res.redirect('/api/home')
        }
    }

    @Post('buscar-producto')
    postBuscarProducto(
        @Body() nombreProducto,
        @Res() res,
        @Req() req
    ){
        const nombreUsuario = req.signedCookies.nombreUsuario;
        if(this._appService.revisarCookieSegura(req)){
            const listaHijos:Producto[] = this._productoService.buscarProductoPorNombre(nombreProducto.nombreProducto);
            if(listaHijos.length>0){
                res.render('producto/listar-productos', {
                    nombreUsuario, listaHijos,
                })
            }else{
                const idPadre=this._productoService.buscarProductoPorId(listaHijos[0].tiendaId);
                const rutaRedireccion = '/api/tienda/gestionar-productos'+idPadre;
                res.redirect(rutaRedireccion)
            }
        }else{
            res.redirect('/api/home');
        }
    }

    @Post('eliminar-producto')
    postEliminarProducto(@Res() res,@Req() req,@Body() id){
        if(this._appService.revisarCookieSegura(req)){
            const idPadre = this._productoService.eliminarProductoPorId(id.id);
            const rutaRedireccion = '/api/producto/gestionar-productos/'+idPadre;
            res.redirect(rutaRedireccion);
        }else{
            res.redirect('/api/home');
        }
    }



    @Post('registrar-producto')
    postRegistrarProducto(
        @Body() producto:Producto,
        @Response() res,@Req() req){
        if(this._appService.revisarCookieSegura(req)){
            producto.aniosGarantia = Number(producto.aniosGarantia);
            producto.fechaLanzamientoProducto = new Date(producto.fechaLanzamientoProducto);
            producto.numeroProducto = Number(producto.numeroProducto);
            producto.precio = Number(producto.precio);
            this._productoService.crearProducto(producto);
            const ruta = '/api/producto/gestionar-productos/'+this._productoService.idPadre;
            res.redirect(ruta);
        }else{
            res.redirect('/api/home')
        }


    }

}