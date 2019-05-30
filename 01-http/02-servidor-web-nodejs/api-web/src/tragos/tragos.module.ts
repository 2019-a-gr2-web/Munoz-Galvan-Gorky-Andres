import {Module} from "@nestjs/common";
import {TragosController} from "./tragos.controller";
import {TragosService} from "./tragos.service";

@Module({
    imports:[], //módulos
    controllers:[TragosController], //controladores
    providers:[TragosService], //Servicios
    exports: [TragosService] //Exportar servicios
})
export class TragosModule {
}