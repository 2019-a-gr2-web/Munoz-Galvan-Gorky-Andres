import { Injectable } from '@nestjs/common';
import {ProductoEntity} from './Producto/producto.entity';
import {PromocionEntity} from './Promocion/promocion.entity';

@Injectable()
export class AppService {
  listaProductos:ProductoEntity[]=[]
  listaPromociones:PromocionEntity[]=[]
  getHello(): string {
    return 'Hello World!';
  }
}
