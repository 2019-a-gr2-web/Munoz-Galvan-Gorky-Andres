import { Controller, Get,Response } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('/api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/peliculas') //Endpoint
  peliculas(@Response() res){
    return res.render(
        'inicio',{
        });

  }
}
