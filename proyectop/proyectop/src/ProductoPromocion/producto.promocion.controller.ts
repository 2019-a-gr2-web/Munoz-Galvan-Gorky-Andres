import {Controller, Get, Res} from "@nestjs/common";
import {ProductoPromocionService} from './producto.promocion.service';
import {AppService} from '../app.service';
import {ProductoEntity} from '../Producto/producto.entity';
import {Param} from '@nestjs/common/decorators/http/route-params.decorator';

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


}