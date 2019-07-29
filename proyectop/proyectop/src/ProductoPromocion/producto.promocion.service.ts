import {Injectable} from "@nestjs/common";
import {ProductoEntity} from '../Producto/producto.entity';
import {Repository} from 'typeorm';
import {InjectRepository} from "@nestjs/typeorm";
import {AppService} from '../app.service';

@Injectable()
export class ProductoPromocionService {
    query:string
    constructor(@InjectRepository(ProductoEntity)
                private readonly _productosRepository: Repository<ProductoEntity>,private readonly _appService: AppService){

    }
    buscar(){
        return this._productosRepository.find()
    }
    platosSeleccionados(idCombo:string){
        console.log("select productoId as id ,nombreProducto nombre, precioProducto as precio from bdproductopromocion, dbproducto where bdproductopromocion.productoId=dbproducto.id and bdproductopromocion.promocionId="+idCombo)
        this.query ="select productoId as id ,nombreProducto nombre, precioProducto as precio from bdproductopromocion, dbproducto where bdproductopromocion.productoId=dbproducto.id and bdproductopromocion.promocionId="+idCombo
        this._productosRepository.query(this.query).then(
            value => {
                console.log('RESULTADO DE MI QUERY', value)
            },
            error=>{
                console.log(error)
            }
        )
        return this._productosRepository.query(this.query)


    }
}