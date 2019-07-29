import {Module} from "@nestjs/common";
import {ProductoController} from "./producto.controller";
import {ProductoService} from "./producto.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {ProductoEntity} from "./producto.entity";
import {AppService} from '../app.service';

@Module({
    imports:[
        TypeOrmModule.forFeature(
            [
                ProductoEntity
            ],
            'default'
        ),
    ], //módulos
    controllers:[ProductoController], //controladores
    providers:[ProductoService, AppService], //Servicios
    exports: [ProductoService] //Exportar servicios

})
export class ProductoModule {

}