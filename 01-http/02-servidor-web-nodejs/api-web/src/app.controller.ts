import {Controller, Get, HttpCode, Post} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  @HttpCode(200)
  postHello(){
    return 'Hola mundo en post';
  }


}/*
@nombreDecoradorClase() // Decorador es una función
class usuario{
  @Atributo
  atributo_publico;
  private atributo_privado;
  protected atributo_protegido;

  constructor(@Parametro() atributo_publico,@OtroParametro() atributo_privado,@OtroParametro() atributo_protegido){
    this.atributo_publico = atributo_publico;
    this.atributo_privado = atributo_privado;
    this.atributo_protegido = atributo_protegido;
  }

  @MetodoA()
  public metodoPublico(@ParametroA() a){}
  @MetodoB()
  private metodoPrivado(){}

  protected metodoProtegido(){}

}*/
