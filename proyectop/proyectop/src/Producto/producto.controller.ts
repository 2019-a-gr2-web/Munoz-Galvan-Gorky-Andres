import {Body, Controller, Get, Post, Res} from "@nestjs/common";
import {ProductoService} from './producto.service';
import {ProductoEntity} from './producto.entity';
import {AppService} from '../app.service';

@Controller('/api/producto')
export class ProductoController {
    constructor(private readonly _productosService: ProductoService, private readonly appService: AppService){

    }
    @Get('verProductos')
    async verProductos(@Res() res) {

        const arregloProductos= await this._productosService.getProdcutos()
        this.appService.listaProductos=arregloProductos
        res.render('producto',{arregloProductos})
    }
    @Post('editar')
    async editar(@Res() res, @Body() produto:ProductoEntity){
        const productoEditado= await this._productosService.editar(produto)
        res.render('producto', this.appService.listaProductos)
    }
    @Post('crear')
    async crear(@Res() res, @Body() produto:ProductoEntity){
        const producto= await this._productosService.crear(produto)
        res.redirect('/api/producto/verProductos')
    }
    @Post('eliminar')
    async eliminar(@Res() res, @Body() body){
        this._productosService.eliminar(body.id)
        res.redirect('/api/producto/verProductos')
    }

    // @Get('verProductos')
    // verProductos(@Res() res) {
    //     res.render('producto')
    // }
}