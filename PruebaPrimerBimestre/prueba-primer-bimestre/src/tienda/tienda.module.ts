import {TiendaController} from "./tienda.controller";
import {Module} from "@nestjs/common";
import {TiendaService} from "./tienda.service";
import {AppService} from "../app.service";

@Module({
    imports:[], //módulos
    controllers:[TiendaController], //controladores
    providers:[TiendaService,AppService], //Servicios
    exports: [TiendaService] //Exportar servicios
})
export class TiendaModule {
}