import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {ProductoPromocionEntity} from "./producto.promocion.entity";
import {ProductoPromocionController} from "./producto.promocion.controller";
import {ProductoPromocionService} from "./producto.promocion.service";
import {ProductoEntity} from '../Producto/producto.entity';
import {AppService} from '../app.service';

@Module({
    imports:[
        TypeOrmModule.forFeature(
            [
                ProductoPromocionEntity,
                ProductoEntity
            ],
            'default'
        ),
    ],
    controllers: [ProductoPromocionController],
    providers: [ProductoPromocionService, AppService],
    exports: [ProductoPromocionService]
})
export class ProductoPromocionModule {

}