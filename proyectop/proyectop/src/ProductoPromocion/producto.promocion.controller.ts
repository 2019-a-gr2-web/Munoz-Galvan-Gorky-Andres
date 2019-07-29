import {Body, Controller, Get, Post, Res} from "@nestjs/common";
import {ProductoPromocionService} from './producto.promocion.service';
import {AppService} from '../app.service';
import {ProductoEntity} from '../Producto/producto.entity';
import {Param} from '@nestjs/common/decorators/http/route-params.decorator';
import {getConnection} from 'typeorm';
import {ProductoPromocionEntity} from './producto.promocion.entity';

@Controller('api/producto-promocion')
export class ProductoPromocionController {
    idCombo: number
    nuevosSeleccionados: ProductoEntity[] = []
    nuevosDisponibles: ProductoEntity[] = []
    nombreCombo:string
    constructor(private readonly _productoPromocionService: ProductoPromocionService,private readonly _appService: AppService){

    }
    @Get('ver/:id')
    async ver(@Res() res, @Param() params) {
        this.nuevosSeleccionados = []
        this._appService.productosSeleccionado = []
        this._appService.productosDisponibles = []

        this._appService.productosSeleccionado = await this._productoPromocionService.platosSeleccionados(params.id.toString())//platos seleccionados en la base
        this.idCombo = params.id
        // console.log('MIS PLATOS SELECCIONADOS', this._appService.platoSeleccionados)
        this._appService.productosDisponibles = await this._productoPromocionService.buscar()
        const arregloDisponibles: ProductoEntity[] = this._appService.productosDisponibles;
        // console.log('dis',this._appService.platosDisponibles)
        // console.log('selesc',this._appService.platoSeleccionados)
        const indices: number[] = []
        this._appService.productosSeleccionado.forEach(
            valuew => {
                const indice=arregloDisponibles.findIndex(
                    value => {
                        return value.id==valuew.id
                    }
                )
                console.log(indice)
                arregloDisponibles.splice(indice,1)
            }
        )


        const arregloSeleccionados = this._appService.productosSeleccionado;
        this.nombreCombo=params.nombre
        const nombre= this.nombreCombo
        // this._combosService.platosDisponibles=arre
        return res.render('productosPromocion', {arregloDisponibles, arregloSeleccionados,nombre })
    }
    @Post('addProducto')
    addElementeo(@Res() res, @Body('index') indexBody: number) {
        console.log(indexBody)
        const plato: ProductoEntity = this._appService.productosDisponibles[indexBody]
        const x = this._productoPromocionService.crearRelacion(plato.id, this.idCombo).then(
            value1 => {
                console.log('creado')
                res.redirect('/api/producto-promocion/ver/'+this.idCombo)
            }
        )




    }
    @Post('rmvPlato')
    async rmvElementeo(@Res() res, @Body('index') indexBody) {
        console.log(indexBody)
        const plato: ProductoEntity = this._appService.productosSeleccionado[indexBody]
        await getConnection().createQueryBuilder().delete().from(ProductoPromocionEntity).where("productoId = :productoId", {promocionId: this.idCombo}).where("productoId = :productoId", {productoId: plato.id}).execute()

        res.redirect('/api/producto-promocion/ver/'+this.idCombo)
    }


}