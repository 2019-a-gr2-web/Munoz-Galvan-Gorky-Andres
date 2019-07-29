import {Injectable} from "@nestjs/common";

import {InjectRepository} from "@nestjs/typeorm";
import {ProductoEntity} from './producto.entity';
import {Repository, UpdateResult} from 'typeorm';
import {AppService} from '../app.service';

@Injectable()
export class ProductoService {
    constructor(@InjectRepository(ProductoEntity)
                private readonly _productosRepository: Repository<ProductoEntity>, private readonly _appService: AppService){

    }
    getProdcutos(parametrosBusqueda?){
        if (parametrosBusqueda) {
            var x=this._appService.listaProductos.filter(
                value => {

                    return value.nombreProducto.toUpperCase().includes(parametrosBusqueda.toString().toUpperCase())

                }
            )

            console.log("lista", x)
          ///  console.log("lista2", this.appService.listaPlatos)
            return x
        } else {

            return this._productosRepository.find()
        }
    }
    editar(productoEditar: ProductoEntity): Promise<UpdateResult>{
        console.log(productoEditar)
        return this._productosRepository.update(productoEditar.id, productoEditar)
    }
    crear(nuevoProducto: ProductoEntity): Promise<ProductoEntity> {
        const objetoEntidad= this._productosRepository.create(nuevoProducto);



        return this._productosRepository.save(objetoEntidad)
        // nuevoTrago.id = this.recnum;
        // this.recnum++;
        // this.bddTragos.push(nuevoTrago);
        // return nuevoTrago;
    }

}