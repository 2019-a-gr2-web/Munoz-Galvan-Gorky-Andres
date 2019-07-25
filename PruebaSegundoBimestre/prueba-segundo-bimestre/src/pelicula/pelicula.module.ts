import {Module} from "@nestjs/common";
import {PeliculaEntity} from "./pelicula.entity";
import {TypeOrmModule} from "@nestjs/typeorm";


@Module({
    imports:[
        TypeOrmModule.forFeature(
            [
                PeliculaEntity
            ],
            'default'
        )

    ],
    controllers:[],
    providers:[],
    exports:[],
})
export class PeliculaModule {

}