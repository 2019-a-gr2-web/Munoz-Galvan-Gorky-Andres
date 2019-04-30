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

  @Get('/sumar')
  @HttpCode(200)
  sumar(@Headers() headers, @Request() request, @Response() response){
    const existeCookie = request.cookies.nombre;
    const existeCookieSegura = request.signedCookies.intentos;
    let retornoSumar;

    if(existeCookie && existeCookieSegura && existeCookieSegura > 0){
      if(headers.num_uno && headers.num_dos){
          const primer_numero = Number(headers.num_uno);
          const segundo_numero = Number(headers.num_dos);
          const resultado = primer_numero+segundo_numero;
          let nuevoValorCookie;
          if(resultado>0){
            nuevoValorCookie = request.signedCookies.intentos-resultado;
          }else{
            nuevoValorCookie = request.signedCookies.intentos+resultado;
          }
        response.cookie('intentos',nuevoValorCookie, {signed:true});

          if(nuevoValorCookie>0){
            retornoSumar = [{
              "nombreUsuario":existeCookie,
              "resultado":resultado,
              "intentos":nuevoValorCookie
            }];
          }else{
            retornoSumar = [{
              "nombreUsuario":existeCookie,
              "resultado":resultado,
              "intentos":'Se terminaron sus puntos'
            }];
          }
      }else{
        console.log("falta un número");
        retornoSumar = [{
          "error":"Debe ingresar los dos números a sumar con los nombres: " +
              "num_uno," +
              "num_dos"
        }];
      }
    }else if(existeCookie && existeCookieSegura){
      retornoSumar = [{
        "error":"Alcanzó el número máximo de intentos"
      }];
    }
    else if(existeCookie){
      response.cookie('intentos',100, {signed:true});
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
    return response.send(retornoSumar);
  }

  @Post('/restar')
  @HttpCode(201)
  restar(@Body() parametrosCuerpo, @Request() request,@Response() response){

    const existeCookie = request.cookies.nombre;
    const existeCookieSegura = request.signedCookies.intentos;
    let retornoRestar;

    if(existeCookie && existeCookieSegura && existeCookieSegura > 0){

      if(parametrosCuerpo.num_uno && parametrosCuerpo.num_dos){
        const primer_numero = Number(parametrosCuerpo.num_uno);
        const segundo_numero = Number(parametrosCuerpo.num_dos);
        const resultado = primer_numero-segundo_numero;
        let nuevoValorCookie;
        if(resultado>0){
          nuevoValorCookie = request.signedCookies.intentos-resultado;
        }else{
          nuevoValorCookie = request.signedCookies.intentos+resultado;
        }
        response.cookie('intentos',nuevoValorCookie, {signed:true});

        if(nuevoValorCookie>0){
          retornoRestar = [{
            "nombreUsuario":existeCookie,
            "resultado":resultado,
            "intentos":nuevoValorCookie
          }];
        }else{
          retornoRestar = [{
            "nombreUsuario":existeCookie,
            "resultado":resultado,
            "intentos":'Se terminaron sus puntos'
          }];
        }
      }else{
        console.log("falta un número");
        retornoRestar = [{"error":"Debe ingresar los dos números a sumar con los nombres: " +
              "num_uno," +
              "num_dos"}]
      }
    }
    else if(existeCookie && existeCookieSegura){
      retornoRestar = [{
        "error":"Alcanzó el número máximo de intentos"
      }];
    }
    else if(existeCookie){
      response.cookie('intentos',100, {signed:true});
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
        retornoRestar = [{
          "error":"Debe ingresar los dos números a sumar con los nombres: " +
              "num_uno," +
              "num_dos"
        }];
      }
    }
    else{
      retornoRestar = [{ "error":"No existe la cookie, dirígase a /api/setearNombre"}];
    }
    return response.send(retornoRestar);
  }

  @Put('/multiplicar')
  @HttpCode(202)
  multiplicar(@Query() queryParams,@Request() request,@Response() response){

    const existeCookie = request.cookies.nombre;
    const existeCookieSegura = request.signedCookies.intentos;
    let retornoMultiplicar;

    if(existeCookie && existeCookieSegura && existeCookieSegura>0){
      if(queryParams.num_uno && queryParams.num_dos){
        const primer_numero = Number(queryParams.num_uno);
        const segundo_numero = Number(queryParams.num_dos);
        const resultado = primer_numero*segundo_numero;

        let nuevoValorCookie;
        if(resultado>0){
          nuevoValorCookie = request.signedCookies.intentos-resultado;
        }else{
          nuevoValorCookie = request.signedCookies.intentos+resultado;
        }
        response.cookie('intentos',nuevoValorCookie, {signed:true});
        if(nuevoValorCookie>0){
          retornoMultiplicar = [{
            "nombreUsuario":existeCookie,
            "resultado":resultado,
            "intentos":nuevoValorCookie
          }];
        }else{
          retornoMultiplicar = [{
            "nombreUsuario":existeCookie,
            "resultado":resultado,
            "intentos":'Se terminaron sus puntos'
          }];
        }
      }else{
        console.log("Error");
        retornoMultiplicar = [{
          "error":"Debe ingresar los dos números a sumar con los nombres: " +
              "num_uno," +
              "num_dos"
        }];
      }
    }
    else if(existeCookie && existeCookieSegura){
      retornoMultiplicar = [{
        "error":"Alcanzó el número máximo de intentos"
      }];
    }
    else if(existeCookie){
      response.cookie('intentos',100, {signed:true});
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
    return response.send(retornoMultiplicar);
  }

  @Delete('/dividir')
  @HttpCode(203)
  dividir(@Headers() headers,
          @Query() queryParams,
          @Body() bodyParams,
          @Request() request,
          @Response() response){

    const existeCookie = request.cookies.nombre;
    const existeCookieSegura = request.signedCookies.intentos;
    let retornoDividir;

    if(existeCookie && existeCookieSegura && existeCookieSegura>0){


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
          let nuevoValorCookie;
          if(resultado>0){
            nuevoValorCookie = request.signedCookies.intentos-resultado;
          }else{
            nuevoValorCookie = request.signedCookies.intentos+resultado;
          }
          response.cookie('intentos',nuevoValorCookie, {signed:true});

          if(nuevoValorCookie>0){
            retornoDividir = [{
              "nombreUsuario":existeCookie,
              "resultado":resultado,
              "intentos":nuevoValorCookie
            }];
          }else{
            retornoDividir = [{
              "nombreUsuario":existeCookie,
              "resultado":resultado,
              "intentos":'Se terminaron sus puntos'
            }];
          }
        }else if(bodyParams.num_dos){
          const primer_numero = Number(headers.num_uno);
          const segundo_numero = Number(bodyParams.num_dos);
          const resultado =primer_numero/segundo_numero;
          let nuevoValorCookie;
          if(resultado>0){
            nuevoValorCookie = request.signedCookies.intentos-resultado;
          }else{
            nuevoValorCookie = request.signedCookies.intentos+resultado;
          }
          response.cookie('intentos',nuevoValorCookie, {signed:true});

          if(nuevoValorCookie>0){
            retornoDividir = [{
              "nombreUsuario":existeCookie,
              "resultado":resultado,
              "intentos":nuevoValorCookie
            }];
          }else{
            retornoDividir = [{
              "nombreUsuario":existeCookie,
              "resultado":resultado,
              "intentos":'Se terminaron sus puntos'
            }];
          }
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
          let nuevoValorCookie;
          if(resultado>0){
            nuevoValorCookie = request.signedCookies.intentos-resultado;
          }else{
            nuevoValorCookie = request.signedCookies.intentos+resultado;
          }
          response.cookie('intentos',nuevoValorCookie, {signed:true});

          if(nuevoValorCookie>0){
            retornoDividir = [{
              "nombreUsuario":existeCookie,
              "resultado":resultado,
              "intentos":nuevoValorCookie
            }];
          }else{
            retornoDividir = [{
              "nombreUsuario":existeCookie,
              "resultado":resultado,
              "intentos":'Se terminaron sus puntos'
            }];
          }
        }else if(bodyParams.num_dos){
          const primer_numero = Number(queryParams.num_uno);
          const segundo_numero = Number(bodyParams.num_dos);
          const resultado =primer_numero/segundo_numero;
          let nuevoValorCookie;
          if(resultado>0){
            nuevoValorCookie = request.signedCookies.intentos-resultado;
          }else{
            nuevoValorCookie = request.signedCookies.intentos+resultado;
          }
          response.cookie('intentos',nuevoValorCookie, {signed:true});

          if(nuevoValorCookie>0){
            retornoDividir = [{
              "nombreUsuario":existeCookie,
              "resultado":resultado,
              "intentos":nuevoValorCookie
            }];
          }else{
            retornoDividir = [{
              "nombreUsuario":existeCookie,
              "resultado":resultado,
              "intentos":'Se terminaron sus puntos'
            }];
          }
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
          let nuevoValorCookie;
          if(resultado>0){
            nuevoValorCookie = request.signedCookies.intentos-resultado;
          }else{
            nuevoValorCookie = request.signedCookies.intentos+resultado;
          }
          response.cookie('intentos',nuevoValorCookie, {signed:true});

          if(nuevoValorCookie>0){
            retornoDividir = [{
              "nombreUsuario":existeCookie,
              "resultado":resultado,
              "intentos":nuevoValorCookie
            }];
          }else{
            retornoDividir = [{
              "nombreUsuario":existeCookie,
              "resultado":resultado,
              "intentos":'Se terminaron sus puntos'
            }];
          }
        }else if(queryParams.num_dos){
          const primer_numero = Number(bodyParams.num_uno);
          const segundo_numero = Number(queryParams.num_dos);
          const resultado =primer_numero/segundo_numero;
          let nuevoValorCookie;
          if(resultado>0){
            nuevoValorCookie = request.signedCookies.intentos-resultado;
          }else{
            nuevoValorCookie = request.signedCookies.intentos+resultado;
          }
          response.cookie('intentos',nuevoValorCookie, {signed:true});

          if(nuevoValorCookie>0){
            retornoDividir = [{
              "nombreUsuario":existeCookie,
              "resultado":resultado,
              "intentos":nuevoValorCookie
            }];
          }else{
            retornoDividir = [{
              "nombreUsuario":existeCookie,
              "resultado":resultado,
              "intentos":'Se terminaron sus puntos'
            }];
          }
        }else{
          retornoDividir = [{"error":"Falta el segundo número a dividir. Envíelo por Header o Query"}];
        }
      }else{
        retornoDividir =[{"error":"No se ingresó el primer número a dividir"}];
      }

    }
    else if(existeCookie && existeCookieSegura){
      retornoDividir = [{
        "error":"Alcanzó el número máximo de intentos"
      }];
    }
    else if(existeCookie){
      response.cookie('intentos',100, {signed:true});
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
    return response.send(retornoDividir);


  }



}
