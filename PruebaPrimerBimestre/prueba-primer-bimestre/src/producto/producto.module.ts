import {Module} from "@nestjs/common";
import {ProductoService} from "./producto.service";
import {ProductoController} from "./producto.controller";
import {TiendaService} from "../tienda/tienda.service";

@Module({
    imports:[], //módulos
    controllers:[ProductoController], //controladores
    providers:[ProductoService,TiendaService], //Servicios
    exports: [] //Exportar servicios
})
export class ProductoModule {
    
}