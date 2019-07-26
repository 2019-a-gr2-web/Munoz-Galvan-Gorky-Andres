import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UsuarioEntity} from "./usuario.entity";
import {UsuarioController} from "./usuario.controller";
import {UsuarioService} from "./usuario.service";
import {ActorModule} from "../actor/actor.module";

@Module({
    imports:[ActorModule,
        TypeOrmModule.forFeature(
            [
                UsuarioEntity
            ],
            'default'
        )
    ],
    controllers:[UsuarioController],
    providers:[UsuarioService],
    exports:[]
})
export class UsuarioModule {

}