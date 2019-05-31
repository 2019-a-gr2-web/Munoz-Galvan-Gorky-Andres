import {Module} from "@nestjs/common";
import {ProductoService} from "./producto.service";
import {ProductoController} from "./producto.controller";
import {AppService} from "../app.service";

@Module({
    imports:[], //módulos
    controllers:[ProductoController], //controladores
    providers:[ProductoService,AppService], //Servicios
    exports: [ProductoService] //Exportar servicios
})
export class ProductoModule {
    
}