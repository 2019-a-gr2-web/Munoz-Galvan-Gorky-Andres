import { Controller, Get, Headers,HttpCode, Post, Body, Put, Query, Delete } from '@nestjs/common';
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
  sumar(@Headers() headers){
    if(headers.num_uno && headers.num_dos){
      const primer_numero = Number(headers.num_uno);
      const segundo_numero = Number(headers.num_dos);
      return primer_numero+segundo_numero;
    }else{
      console.log("falta un número");
      return "Debe ingresar los dos números a sumar con los nombres: \nnum_uno\nnum_dos";
    }
  }

  @Post('/restar')
  @HttpCode(201)
  restar(@Body() parametrosCuerpo){
    if(parametrosCuerpo.num_uno && parametrosCuerpo.num_dos){
      const primer_numero = Number(parametrosCuerpo.num_uno);
      const segundo_numero = Number(parametrosCuerpo.num_dos);
      return primer_numero-segundo_numero;
    }else{
      console.log("falta un número");
      return "Debe ingresar los dos números a restar con los nombres: \nnum_uno\nnum_dos";
    }
  }

  @Put('/multiplicar')
  @HttpCode(202)
  multiplicar(@Query() queryParams){
    if(queryParams.num_uno && queryParams.num_dos){
      const primer_numero = Number(queryParams.num_uno);
      const segundo_numero = Number(queryParams.num_dos);
      return primer_numero*segundo_numero;
    }else{
      console.log("Error");
      return "Debe ingresar los dos números a restar con los nombres: \nnum_uno\nnum_dos" +
          "\nDe esta manera: /multiplicar?num_uno=10&num_dos=2 ";
    }
  }

  @Delete('/dividir')
  @HttpCode(203)
  dividir(@Headers() headers,
          @Query() queryParams,
          @Body() bodyParams){
    if((headers.num_uno && headers.num_dos)
        ||(queryParams.num_uno && queryParams.num_dos)
        ||(bodyParams.num_uno && bodyParams.num_dos))
    {
      return "Los números a dividirse deben enviarse con un método diferente cada uno"
    }
    else if(headers.num_uno)
    {
      if(queryParams.num_dos){
        const primer_numero = Number(headers.num_uno);
        const segundo_numero = Number(queryParams.num_dos);
        return primer_numero/segundo_numero;
      }else if(bodyParams.num_dos){
        const primer_numero = Number(headers.num_uno);
        const segundo_numero = Number(bodyParams.num_dos);
        return primer_numero/segundo_numero;
      }else{
        return "Falta el segundo número a dividir. Envíelo por Query o Body"
      }
    }
    else if(queryParams.num_uno)
    {
      if(headers.num_dos){
        const primer_numero = Number(queryParams.num_uno);
        const segundo_numero = Number(headers.num_dos);
        return primer_numero/segundo_numero;
      }else if(bodyParams.num_dos){
        const primer_numero = Number(queryParams.num_uno);
        const segundo_numero = Number(bodyParams.num_dos);
        return primer_numero/segundo_numero;
      }else{
        return "Falta el segundo número a dividir. Envielo por Body o Header"
      }
    }
    else if(bodyParams.num_uno)
    {
      if(headers.num_dos){
        const primer_numero = Number(bodyParams.num_uno);
        const segundo_numero = Number(headers.num_dos);
        return primer_numero/segundo_numero;
      }else if(queryParams.num_dos){
        const primer_numero = Number(bodyParams.num_uno);
        const segundo_numero = Number(queryParams.num_dos);
        return primer_numero/segundo_numero;
      }else{
        return "Falta el segundo número a dividir. Envíelo por Header o Query"
      }
    }else{
      return "No se ingresó el primer número a dividir"
    }
  }



}
