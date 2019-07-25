import {Body, Controller, Get, Post, Res, Session} from "@nestjs/common";
import {Usuario} from "./interfaces/usuario";
import {UsuarioService} from "./usuario.service";

@Controller('/api/usuario')
export class UsuarioController {

    constructor(private readonly _UsuarioService:UsuarioService){
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
            if(valor.tipoUsuario=="Admin"){
                res.render();
            }else if(valor.tipoUsuario=="Usuario"){
                res.render('pedido');
            }else{
                res.redirect('/api/despachador/consultar-pedidos');
            }
            session.username = usuario.nombreUsuario;
        }else{
            res.redirect("/api/login");
        }
    }

}