import {Body, Controller, Get, Res, Post, Query} from "@nestjs/common";
import {TragosService} from "./tragos.service";
import {Trago} from "./interfaces/trago";
import {TragosCreateDto} from "./dto/tragos.create.dto";
import {validate} from "class-validator";

@Controller('api/traguito')
export class TragosController {

    constructor(private readonly _tragosService: TragosService) {
    }

    @Get('lista')
    async listarTragos(@Res() res) {
        const arregloTragos = await this._tragosService.buscar();
        res.render('tragos/lista-tragos', {
            arregloTragos: arregloTragos
        });
    }

    @Get('crear')
    crearTragos(@Res() res,
                @Query('mensaje') mensaje: string
                ) {
        res.render('tragos/crear-editar', {
            mensaje: mensaje
        });
    }

    @Post('eliminar')
    eliminarTrago(
        @Body() id: number,
        @Res() res
    ) {
        this._tragosService.eliminarPorID(id);
        res.redirect('/api/traguito/lista');

    }

    @Post('crear')
    async crearTragosPost(
        @Body() trago: Trago,
        @Res() res
    ) {
        trago.gradosAlcohol = Number(trago.gradosAlcohol);
        trago.precio = Number(trago.precio);
        trago.fechaCaducidad = trago.fechaCaducidad ? new Date(trago.fechaCaducidad) : undefined;
        console.log(trago);

        let tragoAValidar = new TragosCreateDto();

        tragoAValidar.nombre = trago.nombre;
        tragoAValidar.tipo = trago.tipo;
        tragoAValidar.fechaCaducidad = trago.fechaCaducidad;
        tragoAValidar.precio = trago.precio;
        tragoAValidar.gradosAlcohol = trago.gradosAlcohol;

        try {

            const errores = await validate(tragoAValidar);

            if (errores.length > 0) {
                console.error(errores);
                res.redirect('/api/traguito/crear?mensaje=Tienes un error en el formulario');
            } else {
                const respuestaCrear = await this._tragosService
                    .crear(trago); // Promesa
                console.log('RESPUESTA: ', respuestaCrear);
                res.redirect('/api/traguito/lista');
            }
        } catch (e) {
            console.error(e);
            res.status(500);
            res.send({mensaje: 'Error', codigo: 500});
        }
    }
}