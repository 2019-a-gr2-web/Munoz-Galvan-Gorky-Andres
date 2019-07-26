import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {ActorEntity} from "./actor.entity";
import {ActorController} from "./actor.controller";
import {ActorService} from "./actor.service";

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
    providers:[ActorService],
    exports:[ActorService],
})
export class ActorModule {

}