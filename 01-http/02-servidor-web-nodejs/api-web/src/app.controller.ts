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

@Get('/inicio')
inicio(@Response() res){
    return res.render('inicio');

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

function holaMundo() {
    console.log('Hola mundo')
}
const respuestaHolaMundo = holaMundo();
console.log('Respuesta hola mundo: ',respuestaHolaMundo);
function suma(a:number,b:number):number {
    return a+b;
}
const respuestaSuma = suma(12,2);
console.log('Respuesta suma:',respuestaSuma);

//Condicionales
//Truty -> true
//Falsy -> false
if(true){ //Truty
    console.log('Verdadero');
}else{
    console.log('Falso')
}

if(false){//falsy
    console.log('Falso');
}else{
    console.log('Verdadero')
}

if(""){ //un string vacío es falso
    console.log('Verdadero ""');
}else{
    console.log('Falso ""')
}

if("a"){ //un string con más de un caracter es verdadero
    console.log('Verdadero "a"');
}else{
    console.log('Falso "a"')
}

if("-1"){ //un string con más de un caracter es verdadero
    console.log('Verdadero "-1"');
}else{
    console.log('Falso "-1"')
}

if("1"){ //un string con más de un caracter es verdadero
    console.log('Verdadero "1"');
}else{
    console.log('Falso "1"')
}

if({}){ //un objeto json es truty
    console.log('Verdadero "{}"');
}else{
    console.log('Falso "{}"')
}

//Operadores de arreglos en JS
// 1) Imrpiman en consola todos los elementos
const arregloNumerosForEach = [1,2,3,4,5,6];

const rForEach = arregloNumerosForEach
    .forEach(n => console.log(`${n}`));
console.log(`Respuesta foreach: ${rForEach}`);

// 2) Sumen 2 a los pares y 1 a los impares

const arregloNumerosMap = [1,2,3,4,5,6];
const rMap = arregloNumerosMap
    .map( //Devolver el nuevo valor de ese elemento
    (valorActual)=>{
        const esPar = valorActual%2==0;
        if(esPar){
            return valorActual+2;
        }else{
            return valorActual+1;
        }
    });
console.log(`Respuesta map: ${rMap}`);

// 3) Encuentren si hay el numero 4
const arregloNumerosFind = [1,2,3,4,5,6];
const rFind = arregloNumerosFind
    .find( //Condicion para deovlver el elemento
        (valorActual)=>{
            return valorActual ==4;
        }
    );
console.log(`Respuesta FIND: ${rFind}`);

// 4) Filtren los numeros menores a 5
const arregloNumerosFilter = [1,2,3,4,5,6];
const rFilter = arregloNumerosFilter
    .filter( //CONDICION TRUE -> agrega al arreglo
        //      CONDICION FALSA -> se omite del arreglo
        (valorActual)=>{
            return valorActual<5;
        }
    );
console.log(`Respuesta filter ${rFilter}`);
// 5) Todos los valores positivos
const arregloNumerosEvery = [1,2,3,4,5,6];
const rEvery = arregloNumerosEvery //AND
    .every( //si TODOS cumple -> TRUE
            //SI ALGUNO no cumple -> FALSE
        (valorActual)=>{
            return valorActual>0;
        }
     );
console.log(`Respuesta every ${rEvery}`);
// 6) Algún valor es menor que 2
const arregloNumerosSome = [1,2,3,4,5,6];
const rSome = arregloNumerosSome
    .some(
        (valorActual)=>{
            return valorActual<2
        });
console.log(rSome);
// 7) Sumen todos los valores
const arregloNumerosReduce = [1,2,3,4,5,6];
const valorDondeEmpiezaCalculo = 0;
//< 4
//10% + 5
//>= 4
//15%+3
const rReduce = arregloNumerosReduce
    .reduce(
        (acumulado,valorActual)=>{
            if(valorActual<4){
                return acumulado+(valorActual*1.1)+5;
            }else{
                return acumulado+(valorActual*1.15)+3;
            }
},valorDondeEmpiezaCalculo);
console.log(rReduce);
// 9) Resten todos los valores de 100
const arregloNumerosReduce2 = [1,2,3,4,5,6];
const valorDondeEmpiezaCalculo2 = 100;
//< 4
//10% + 5
//>= 4
//15%+3
const rReduce2 = arregloNumerosReduce2
    .reduce(
        (acumulado,valorActual)=>{
            if(valorActual<4){
                return acumulado-valorActual;
            }else{
                return acumulado-valorActual;
            }
        },valorDondeEmpiezaCalculo2);
console.log(rReduce2);

// 1.1) Sumen 10 a todos los elementos
// 1.2) Filtren los mayores a 15
// 1.3) Si hay algún número mayor a 30

const arregloEjercicio = [1,2,3,4,5,6];
const rArregloEjercicio = arregloEjercicio
    .map((valorActual)=>{return valorActual+10})
    .filter((valorActual)=>{return valorActual>15})
    .some((valorActual)=>{return valorActual>30});
console.log(rArregloEjercicio);
