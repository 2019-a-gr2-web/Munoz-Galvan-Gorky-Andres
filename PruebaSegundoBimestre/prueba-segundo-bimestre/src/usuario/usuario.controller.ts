import {Body, Controller, Get, Post, Res, Session} from "@nestjs/common";
import {Usuario} from "./interfaces/usuario";
import {UsuarioService} from "./usuario.service";
import {ActorService} from "../actor/actor.service";

@Controller('/api/usuario')
export class UsuarioController {

    constructor(private readonly _UsuarioService:UsuarioService,
                private readonly _ActorService:ActorService){
    }

    @Get('listar-actores')
    async getPrincipalAdmin(@Res() res,@Session() session){
        const actores = await this._ActorService.consultarActor();
        res.render('admin/listar-actores',{
            nombreUsuario:session.username,
            actores
        });
    }

    @Get('principal-admin')
    getListarActores(@Res() res){
        res.redirect('/api/usuario/listar-actores');
    }

    @Post('autenticando')
    async postAutenticar(@Body() body,
                         @Session() session,
                         @Res() res) {

        const usuario: Usuario = {nombreUsuario: body.nombreUsuario, passUsuario: body.passUsuario};
        const respuestaUsuario = await this._UsuarioService
            .buscarUsuario(usuario);

        const valor:Usuario=respuestaUsuario.find(
            value => value.nombreUsuario==usuario.nombreUsuario
        );
        if(respuestaUsuario.length>0){
            session.username = usuario.nombreUsuario;
            if(valor.tipoUsuario=="Admin"){
                res.redirect('/api/usuario/principal-admin');
            }else if(valor.tipoUsuario=="Usuario"){
                res.redirect('/api/pedido/menu-pedido');
            }else{
                res.redirect('/api/despachador/consultar-pedidos');
            }
        }else{
            res.redirect("/api/login");
        }
    }

}