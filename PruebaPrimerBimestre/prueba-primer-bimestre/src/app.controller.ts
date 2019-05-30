import {Controller, Get, Post, Response, Request} from '@nestjs/common';
import {Query} from "@nestjs/common/decorators/http/route-params.decorator";
import {TiendaService} from "./tienda/tienda.service";

@Controller('/api')
export class AppController {
  constructor(private readonly _tiendaService: TiendaService) {
  }

  @Get('home')
  mostrarPantallaHome(@Response() res){
      res.render('home')
  }

  @Get('login')
  login(@Response() res,@Query() query){
      this._tiendaService.nombreUsuario = query.nombreUsuario;
      console.log(this._tiendaService.nombreUsuario);

    res.cookie(
        'nombreUsuario',this._tiendaService.nombreUsuario,
        {
            signed:true,
            override:true
        }
    );
    return res.redirect('/api/tienda/gestionar');
  }

    @Get('/logout')
    logout(@Response() res){
        res.clearCookie('nombreUsuario');
        return res.redirect('/api/home');
    }

}
