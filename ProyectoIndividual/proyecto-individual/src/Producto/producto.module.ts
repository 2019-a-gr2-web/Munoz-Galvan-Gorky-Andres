import {Module} from "@nestjs/common";
import {ProductoController} from "./producto.controller";
import {ProductoService} from "./producto.service";

@Module({
    imports:[], //módulos
    controllers:[ProductoController], //controladores
    providers:[ProductoService], //Servicios
    exports: [] //Exportar servicios

})
export class ProductoModule {

}