import {MayornumeroGateway} from "./mayornumero.gateway";
import {Module} from "@nestjs/common";

@Module({
    providers:[
        MayornumeroGateway
    ]
})
export class MayornumeroModule{

}