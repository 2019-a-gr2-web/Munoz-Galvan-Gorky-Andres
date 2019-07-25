import {Controller, Get, Response, Request, Req} from '@nestjs/common';
import {Query} from "@nestjs/common/decorators/http/route-params.decorator";
import {AppService} from "./app.service";

@Controller('/api')
export class AppController {
  constructor(private readonly _appService: AppService) {
  }

  @Get('home')
  mostrarPantallaHome(@Response() res){
      res.clearCookie('nombreUsuario');
      res.render('home')
  }

  @Get('logged')
  userLogged(@Response() res,@Query() query){
      const nombreUsuario = query.nombreUsuario;
      res.cookie(
          'nombreUsuario',nombreUsuario,
          {
              signed:true,
              override:true
          }
      );
      return res.redirect('/api/despachador');
  }

  @Get('login')
  login(@Response() res,@Req() req){
      const nombreUsuario = req.signedCookies.nombreUsuario;
      if(this._appService.revisarCookieSegura(req)){
          return res.render('tienda/gestionar-papas',{nombreUsuario});
      }else{
          res.redirect('/api/home');
      }

  }
}
