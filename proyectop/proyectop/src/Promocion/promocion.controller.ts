import {Body, Controller, Get, Post, Res} from "@nestjs/common";
import {ProductoEntity} from '../Producto/producto.entity';
import {PromocionService} from './promocion.service';
import {AppService} from '../app.service';
import {PromocionEntity} from './promocion.entity';

@Controller('api/promocion')
export class PromocionController {
    constructor(private readonly _promocionService: PromocionService, private readonly appService: AppService){

    }
    @Get('verPromociones')
    async verProductos(@Res() res) {

        const arregloPromociones= await this._promocionService.getPromociones()
        this.appService.listaPromociones=arregloPromociones
        res.render('promocion',{arregloPromociones})
    }
    @Post('editar')
    async editar(@Res() res, @Body() produto:PromocionEntity){
        const productoEditado= await this._promocionService.editar(produto)
        const arregloPromociones= this.appService.listaPromociones
        res.render('promocion', {arregloPromociones})
    }
    @Post('crear')
    async crear(@Res() res, @Body() produto:PromocionEntity){
        const producto= await this._promocionService.crear(produto)
        res.redirect('/api/promocion/verPromociones')
    }
    @Post('eliminar')
    async eliminar(@Res() res, @Body() body){
        this._promocionService.eliminar(body.id)
        res.redirect('/api/promocion/verPromociones')
    }
}