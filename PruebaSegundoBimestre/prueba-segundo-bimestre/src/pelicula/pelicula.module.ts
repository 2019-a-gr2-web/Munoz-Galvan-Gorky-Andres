import {Module} from "@nestjs/common";
import {PeliculaEntity} from "./pelicula.entity";
import {TypeOrmModule} from "@nestjs/typeorm";
import {PeliculaController} from "./pelicula.controller";
import {PeliculaService} from "./pelicula.service";


@Module({
    imports:[
        TypeOrmModule.forFeature(
            [
                PeliculaEntity
            ],
            'default'
        )
    ],
    controllers:[PeliculaController],
    providers:[PeliculaService],
    exports:[PeliculaService],
})
export class PeliculaModule {
}