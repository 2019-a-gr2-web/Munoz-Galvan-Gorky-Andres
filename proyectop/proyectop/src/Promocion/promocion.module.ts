import {Module} from "@nestjs/common";
import {PromocionController} from "./promocion.controller";
import {PromocionService} from "./promocion.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {PromocionEntity} from "./promocion.entity";
import {AppService} from '../app.service';

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
    providers: [PromocionService, AppService],
    exports: [PromocionService]

})
export class PromocionModule {

}