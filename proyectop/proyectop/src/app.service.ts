import { Injectable } from '@nestjs/common';
import {ProductoEntity} from './Producto/producto.entity';

@Injectable()
export class AppService {
  listaProductos:ProductoEntity[]=[]
  getHello(): string {
    return 'Hello World!';
  }
}
