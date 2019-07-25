import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {ActorEntity} from "./actor.entity";
import {ActorController} from "./actor.controller";

@Module({
    imports:[
        TypeOrmModule.forFeature(
            [
                ActorEntity
            ],
            'default'
        )
    ],
    controllers:[ActorController],
    providers:[],
    exports:[],
})
export class ActorModule {

}