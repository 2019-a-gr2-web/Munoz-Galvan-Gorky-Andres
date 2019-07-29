import {Injectable} from "@nestjs/common";
import {ProductoEntity} from '../Producto/producto.entity';
import {getConnection, Repository, UpdateResult} from 'typeorm';
import {AppService} from '../app.service';
import {ProductoPromocionEntity} from '../ProductoPromocion/producto.promocion.entity';
import {InjectRepository} from "@nestjs/typeorm";
import {PromocionEntity} from './promocion.entity';

@Injectable()
export class PromocionService {
    constructor(@InjectRepository(PromocionEntity)
                private readonly _promocionRepository: Repository<PromocionEntity>
        , private readonly _appService: AppService
      ) {

    }

    getPromociones(parametrosBusqueda?) {
        if (parametrosBusqueda) {
            var x = this._appService.listaPromociones.filter(
                value => {

                    return value.nombrePromocion.toUpperCase().includes(parametrosBusqueda.toString().toUpperCase())

                }
            )

            console.log("lista", x)
            ///  console.log("lista2", this.appService.listaPlatos)
            return x
        } else {

            return this._promocionRepository.find()
        }
    }

    editar(productoEditar: PromocionEntity): Promise<UpdateResult> {
        console.log(productoEditar)
        return this._promocionRepository.update(productoEditar.id, productoEditar)
    }

    crear(nuevoProducto: PromocionEntity): Promise<PromocionEntity> {
        const objetoEntidad = this._promocionRepository.create(nuevoProducto);


        return this._promocionRepository.save(objetoEntidad)
        // nuevoTrago.id = this.recnum;
        // this.recnum++;
        // this.bddTragos.push(nuevoTrago);
        // return nuevoTrago;
    }

    async eliminar(productoId) {

        try {

            await getConnection().createQueryBuilder().delete().from(PromocionEntity)
                .where("id = :id", {id: productoId})
                .execute()
        } catch (e) {
            console.log(e)
        }

    }
}