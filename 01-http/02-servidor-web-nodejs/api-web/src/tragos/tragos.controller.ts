import {Body, Controller, Get, Res, Post} from "@nestjs/common";
import {TragosService} from "./tragos.service";
import {Trago} from "./interfaces/trago";

@Controller('api/traguito')
export class TragosController{

    constructor(private readonly _tragosService:TragosService){
    }

    @Get('lista')
    async listarTragos(@Res() res){
        const arregloTragos = await this._tragosService.buscar();
        res.render('tragos/lista-tragos',{
            arregloTragos:arregloTragos
        });
    }

    @Get('crear')
    crearTragos(@Res() res){
        res.render('tragos/crear-editar');
    }

    @Post('eliminar')
    eliminarTrago(
        @Body() id:number,
        @Res() res
    ){
        this._tragosService.eliminarPorID(id);
        res.redirect('/api/traguito/lista');

    }

    @Post('crear')
    async crearTragosPost(
        @Body() trago:Trago,
        @Res() res
    ){
        trago.gradosAlcohol = Number(trago.gradosAlcohol);
        trago.precio = Number(trago.precio);
        trago.fechaCaducidad = new Date(trago.fechaCaducidad);
        console.log(trago);
        try{
            const respuestaCrear = await this._tragosService
                .crear(trago); // Promesa
            console.log('RESPUESTA: ',respuestaCrear);
            res.redirect('/api/traguito/lista');
        }catch (e) {
            console.error(e);
            res.status(500);
            res.send({mensaje: 'Error', codigo: 500});
        }
    }
}