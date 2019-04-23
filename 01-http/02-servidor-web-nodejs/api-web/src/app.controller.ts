import {Body, Controller, Delete, Get, Headers, Post, Put, Query, Param, Response, Request} from '@nestjs/common';
import { AppService } from './app.service';
import * as Joi from '@hapi/joi';

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

  @Get('/adivina')
  adivina(@Headers() headers): string {
    const numeroRandomico = Math.round(Math.random()*10);
    const numeroDeCabecera = Number(headers.numero);
    if(numeroRandomico == numeroDeCabecera)
    {
      console.log(numeroDeCabecera);
      console.log(numeroRandomico);
      return 'Adivinaste';
    }else{
      return 'Sigue intentando';
    }
  }

  //enviar algo por consulta
  //?llave=valor&llave2=valor2
  @Get('/consultar')
  consultar(@Query() queryParams){
    console.log(queryParams);
    if(queryParams.nombre){
      return 'Hola ' + queryParams.nombre
    }else{
      return 'Hola extraño'
    }
  }
//:URL -> Esta parte es dinámica
  @Get('/ciudad/:idCiudad')
  ciudad(@Param() parametrosRuta){
    switch (parametrosRuta.idCiudad.toLowerCase()) {
      case 'quito':
        return 'Que fueff';
      case 'guayaquil':
        return 'Que maah ñañoshhh';
      default:
        return 'Buenas tardes';
    }
  }
@Post('/registroComida')
    registroComida(
        @Body() parametrosCuerpo,@Response() response) {
    if(parametrosCuerpo.nombre && parametrosCuerpo.cantidad){
      const cantidad = Number(parametrosCuerpo.cantidad);
      if(cantidad>1){
        response.set('Premio','Fanesca');
      }
      return response.send({mensaje:'Registro creado'});
    }else{
      return response.status(400)
          .send({mensaje:'Error, no envia nombre o cantidad',
                error: 400});
    }
}

@Get('/semilla')
semilla(@Request() request,
        @Response() response){
    console.log(request.cookies);
    const cookies = request.cookies;
    const esquemaValidacionNumero = Joi
        .object()
        .keys({
          numero: Joi.number().integer().required()
        });

    const objetoValidacion = {
      numero: cookies.numero
    };
    const resultado = Joi.validate(objetoValidacion,
                  esquemaValidacionNumero);
    if(resultado.error){
      console.log('Resultado: ',resultado);
    }else{
      console.log('Numero valido');
    }

    const cookieSegura = request.signedCookies.fechaServidor;
    if(cookieSegura){
      console.log('Cookie segura',cookieSegura);
    }else{
      console.log('NO es valida esta cookie');
    }
    if(cookies.micookie){
      const horaFechaServidor = new Date();
      const minutos = horaFechaServidor.getMinutes();
      horaFechaServidor.setMinutes(minutos+1);
      response.cookie(
          'fechaServidor', //NOMBRE (KEY)
          new Date().getTime(), //VALOR (VALUE)
          { //OPCIONES
            //expires: horaFechaServidor
            signed:true
          }
                      );
      return response.send('ok');
    }else{
      return response.send(':(');
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
