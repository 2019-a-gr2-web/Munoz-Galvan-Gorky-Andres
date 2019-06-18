import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {FiestaEntity} from "./fiesta.entity";

@Module({
    imports:[
        TypeOrmModule.forFeature(
            [
                FiestaEntity
            ],
            'default'
        ),
    ], //módulos
    controllers:[], //controladores
    providers:[], //Servicios
    exports: [] //Exportar servicios
})
export class FiestaModule {
}