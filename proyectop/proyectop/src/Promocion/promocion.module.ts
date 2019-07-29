import {Module} from "@nestjs/common";
import {PromocionController} from "./promocion.controller";
import {PromocionService} from "./promocion.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {PromocionEntity} from "./promocion.entity";

@Module({
    imports:[
        TypeOrmModule.forFeature(
            [
                PromocionEntity
            ],
            'default'
        ),
    ],
    controllers:[PromocionController],
    providers: [PromocionService],
    exports: [PromocionService]

})
export class PromocionModule {

}