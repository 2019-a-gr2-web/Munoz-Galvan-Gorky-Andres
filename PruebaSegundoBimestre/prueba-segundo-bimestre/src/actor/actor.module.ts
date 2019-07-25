import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {ActorEntity} from "./actor.entity";

@Module({
    imports:[
        TypeOrmModule.forFeature(
            [
                ActorEntity
            ],
            'default'
        )
    ],
    controllers:[],
    providers:[],
    exports:[],
})
export class ActorModule {

}