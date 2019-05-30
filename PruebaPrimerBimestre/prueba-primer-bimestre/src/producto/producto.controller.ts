import {Controller, Get, Param, Res} from "@nestjs/common";
import {ProductoService} from "./producto.service";
import {TiendaService} from "../tienda/tienda.service";

@Controller('api/producto')
export class ProductoController {

    constructor(private readonly _productoService:ProductoService,private readonly _tiendaService:TiendaService) {
    }

    @Get('gestionar-hijos/:id')
    getGestionarHijos(@Param() params, @Res() res){
        const id = params.id;
        const nombreUsuario = this._tiendaService.nombreUsuario;
        const hijos = this._productoService.buscarProductosPorIdTienda(id);
        res.render('producto/listar-producto',{
            listaHijos:hijos,
            nombreUsuarioParametro:nombreUsuario
        })

    }
}