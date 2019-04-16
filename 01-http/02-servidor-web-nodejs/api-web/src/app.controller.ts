import {Controller, Delete, Get, Headers, Post, Put} from '@nestjs/common';
import { AppService } from './app.service';
@Controller('/api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/hello-world')
  helloWorld(): string {
    return 'hello World';
  }

  @Post('/hola-mundo')
  holaMundo(){
    return 'Hola Mundo';
  }

  @Put('/ciao-mondo')
  ciaoMondo(){
    return 'Ciao-Mondo';
  }

  @Delete('/hallo-welt')
  halloWelt(){
    return 'Hallo welt'
  }

  @Get('adivina')
  adivina(@Headers() headers): string {
    const numeroRandomico = Math.round(Math.random()*10);
    const numeroDeCabecera = Number(headers.numero);
    if(numeroRandomico == numeroDeCabecera)
    {
      return 'Adivinaste';
    }else{
      return 'Sigue intentando';
    }

  }
  /*
  Segmento inicial: api
    1. segmento accion: 'hello-world' - GET
    2. segmento accion: 'hola-mundo' - POST
    3. segmento accion: 'Hej Verden' - PUT
    4. segmento accion: 'Hallo Welt' - DELETE
  */
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
const json = [
  {
    llave:'valor',
    "nombre": "Gorky",
    "apellido": "Muñoz",
    "edad": 22,
    "sueldo": 200.10,
    "casado": false,
    "hijos": null,
    "mascotas": ["pipo",1,1.01,false,null,
      {"nombre": "pipo"}
    ]
  }
]

//JS
let gorky = 'Gorky';
//TS
const andres:string = 'Andrés';
//De esta forma se obtienen los valores de un objeto json
let objeto:any= {
  propiedad:'valor',
  propiedadDos:'valorDos'
};
objeto.propiedad;
//como agregar propiedades a un objeto
//forma 1 se debe definir como any el objeto
objeto.propiedadTres = 'valor3';
//forma 2
objeto['propiedadTres'] = 'valor 3';
//eliminar propiedades
delete objeto.propiedadTres;
objeto.propiedadTres = undefined;
