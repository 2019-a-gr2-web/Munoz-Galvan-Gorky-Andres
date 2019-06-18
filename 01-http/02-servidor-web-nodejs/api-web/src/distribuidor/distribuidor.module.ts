import {Module} from "@nestjs/common";
import {DistribuidorEntity} from "./distribuidor.entity";
import {TypeOrmModule} from "@nestjs/typeorm";

@Module({
    imports:[
        TypeOrmModule.forFeature(
            [
                DistribuidorEntity
            ],
            'default'
        ),
    ], //módulos
    controllers:[], //controladores
    providers:[], //Servicios
    exports: [] //Exportar servicios
})
export class DistribuidorModule {
}