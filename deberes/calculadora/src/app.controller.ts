import {
  Controller,
  Get,
  Headers,
  HttpCode,
  Post,
  Body,
  Put,
  Query,
  Delete,
  Request,
  Response,
  Req
} from '@nestjs/common';
import { AppService } from './app.service';

@Controller('/api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/sumar')
  @HttpCode(200)
  sumar(@Headers() headers, @Request() request){
    const existeCookie = request.cookies.nombre;
    let retornoSumar;
    if(existeCookie){
      if(headers.num_uno && headers.num_dos){
        const primer_numero = Number(headers.num_uno);
        const segundo_numero = Number(headers.num_dos);
        const resultado = primer_numero+segundo_numero;
        retornoSumar = [{
          "nombreUsuario":existeCookie,
          "resultado":resultado
        }];
      }else{
        console.log("falta un número");
        retornoSumar = [{
          "error":"Debe ingresar los dos números a sumar con los nombres: " +
              "num_uno," +
              "num_dos"
        }];
      }
    }else{

      retornoSumar = [{
        "error":"No existe la cookie, dirígase a /api/setearNombre"
      }];

    }
    return retornoSumar;
  }

  @Post('/restar')
  @HttpCode(201)
  restar(@Body() parametrosCuerpo, @Request() request){

    const existeCookie = request.cookies.nombre;
    let retornoRestar;
    if(existeCookie){
      if(parametrosCuerpo.num_uno && parametrosCuerpo.num_dos){
        const primer_numero = Number(parametrosCuerpo.num_uno);
        const segundo_numero = Number(parametrosCuerpo.num_dos);
        const resultado = primer_numero-segundo_numero;
        retornoRestar = [{
          "nombreUsuario":existeCookie,
          "resultado":resultado
        }];
      }else{
        console.log("falta un número");
        retornoRestar = [{"error":"Debe ingresar los dos números a sumar con los nombres: " +
              "num_uno," +
              "num_dos"}]
      }
    }else{
      retornoRestar = [{ "error":"No existe la cookie, dirígase a /api/setearNombre"}];
    }
    return retornoRestar;
  }

  @Put('/multiplicar')
  @HttpCode(202)
  multiplicar(@Query() queryParams,@Request() request){

    const existeCookie = request.cookies.nombre;
    let retornoMultiplicar;
    if(existeCookie){
      if(queryParams.num_uno && queryParams.num_dos){
        const primer_numero = Number(queryParams.num_uno);
        const segundo_numero = Number(queryParams.num_dos);
        const multiplicacion = primer_numero*segundo_numero;
        retornoMultiplicar = [
          {
            "nombreUsuario":existeCookie,
            "resultado": multiplicacion
          }
        ];
      }else{
        console.log("Error");
        retornoMultiplicar = [{
          "error":"Debe ingresar los dos números a sumar con los nombres: " +
              "num_uno," +
              "num_dos"
        }];
      }

    }else{
      retornoMultiplicar = [{ "error":"No existe la cookie, dirígase a /api/setearNombre"}];
    }
    return retornoMultiplicar;
  }

  @Get('/setearNombre')
  nombreCookie(@Request() request,
               @Response() response,
               @Query() query){
    if(query.nombre){
      response.cookie('nombre',query.nombre);
      return response.send('Ya puede usar la calculadora');
    }else{
      return response.send('No ingresó el nombre')
    }

  }



  @Delete('/dividir')
  @HttpCode(203)
  dividir(@Headers() headers,
          @Query() queryParams,
          @Body() bodyParams,
          @Request() request){

    const existeCookie = request.cookies.nombre;
    let retornoDividir;
    if(existeCookie){
      if((headers.num_uno && headers.num_dos)
          ||(queryParams.num_uno && queryParams.num_dos)
          ||(bodyParams.num_uno && bodyParams.num_dos))
      {
        retornoDividir =[{"error":"Los números a dividirse deben enviarse con un método diferente cada uno"}]
      }
      else if(headers.num_uno)
      {
        if(queryParams.num_dos){
          const primer_numero = Number(headers.num_uno);
          const segundo_numero = Number(queryParams.num_dos);
          const resultado =primer_numero/segundo_numero;
          retornoDividir = [{
            "nombreUsuario":existeCookie,
            "resultado":resultado
          }];
        }else if(bodyParams.num_dos){
          const primer_numero = Number(headers.num_uno);
          const segundo_numero = Number(bodyParams.num_dos);
          const resultado =primer_numero/segundo_numero;
          retornoDividir = [{
            "nombreUsuario":existeCookie,
            "resultado":resultado
          }];
        }else{
          retornoDividir = [{"error":"Falta el segundo número a dividir. Envíelo por Query o Body"}];
        }
      }
      else if(queryParams.num_uno)
      {
        if(headers.num_dos){
          const primer_numero = Number(queryParams.num_uno);
          const segundo_numero = Number(headers.num_dos);
          const resultado =primer_numero/segundo_numero;
          retornoDividir = [{
            "nombreUsuario":existeCookie,
            "resultado":resultado
          }];
        }else if(bodyParams.num_dos){
          const primer_numero = Number(queryParams.num_uno);
          const segundo_numero = Number(bodyParams.num_dos);
          const resultado =primer_numero/segundo_numero;
          retornoDividir = [{
            "nombreUsuario":existeCookie,
            "resultado":resultado
          }];
        }else{
          retornoDividir = [{"error":"Falta el segundo número a dividir. Envielo por Body o Header"}];
        }
      }
      else if(bodyParams.num_uno)
      {
        if(headers.num_dos){
          const primer_numero = Number(bodyParams.num_uno);
          const segundo_numero = Number(headers.num_dos);
          const resultado =primer_numero/segundo_numero;
          retornoDividir = [{
            "nombreUsuario":existeCookie,
            "resultado":resultado
          }];
        }else if(queryParams.num_dos){
          const primer_numero = Number(bodyParams.num_uno);
          const segundo_numero = Number(queryParams.num_dos);
          const resultado =primer_numero/segundo_numero;
          retornoDividir = [{
            "nombreUsuario":existeCookie,
            "resultado":resultado
          }];
        }else{
          retornoDividir = [{"error":"Falta el segundo número a dividir. Envíelo por Header o Query"}];
        }
      }else{
        retornoDividir =[{"error":"No se ingresó el primer número a dividir"}];
      }

    }else{
      retornoDividir = [{ "error":"No existe la cookie, dirígase a /api/setearNombre"}];
    }
    return retornoDividir;


  }



}
