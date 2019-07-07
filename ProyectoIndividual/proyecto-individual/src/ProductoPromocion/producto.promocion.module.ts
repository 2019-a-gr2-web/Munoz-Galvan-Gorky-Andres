import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {ProductoPromocionEntity} from "./producto.promocion.entity";
import {ProductoPromocionController} from "./producto.promocion.controller";
import {ProductoPromocionService} from "./producto.promocion.service";

@Module({
    imports:[
        TypeOrmModule.forFeature(
            [
                ProductoPromocionEntity
            ],
            'default'
        ),
    ],
    controllers: [ProductoPromocionController],
    providers: [ProductoPromocionService],
    exports: [ProductoPromocionService]
})
export class ProductoPromocionModule {

}