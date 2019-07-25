import {Controller, Get} from "@nestjs/common";

@Controller('api/login')
export class LoginController {

    @Get('hola')
    getHola(){
        console.log('holi');
    }

}