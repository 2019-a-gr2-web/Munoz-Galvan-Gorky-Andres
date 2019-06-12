import {Module} from "@nestjs/common";
import {TragosController} from "./tragos.controller";
import {TragosService} from "./tragos.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {TragosEntity} from "./tragos.entity";

@Module({
    imports:[
        TypeOrmModule.forFeature(
            [
                TragosEntity
            ],
            'default'
        ),
    ], //módulos
    controllers:[TragosController], //controladores
    providers:[TragosService], //Servicios
    exports: [TragosService] //Exportar servicios
})
export class TragosModule {
}