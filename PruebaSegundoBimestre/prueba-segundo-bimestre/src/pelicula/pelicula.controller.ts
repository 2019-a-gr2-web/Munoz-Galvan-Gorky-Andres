import {Body, Controller, Get, Param, Post, Query, Res} from "@nestjs/common";
import {PeliculaService} from "./pelicula.service";
import {ActorService} from "../actor/actor.service";
import {Pelicula} from "./interfaces/pelicula";
import {PeliculaCreateDto} from "./dto/pelicula.create.dto";
import {validate} from "class-validator";
import {PeliculaUpdateDto} from "./dto/pelicula.update.dto";

@Controller('api/pelicula')
export class PeliculaController {

    constructor(private readonly _PeliculaService:PeliculaService,
                private readonly _ActorService:ActorService){}

    @Get('buscar-pelicula')
    async getBuscarPelicula(@Query() query,@Res() res) {

        const idActor = Number(query.idActor);
        if(query.buscarPelicula.length>0){
            const peliculas = await this._PeliculaService.consultarPeliculaPorNombre(idActor,query.buscarPelicula);
            res.render('admin/listar-peliculas',{peliculas,idActor});
        }else{
            const url = '/api/pelicula/listar-peliculas/'+idActor;
            res.redirect(url);
        }
    }

    @Post('editar-pelicula/:idPelicula')
    async postModificarPelicula(@Param() param, @Body() pelicula:Pelicula,@Res() res){

        pelicula.anioLanzamientoPelicula = Number(pelicula.anioLanzamientoPelicula);
        pelicula.precioPelicula = Number(pelicula.precioPelicula);
        pelicula.ratingPelicula = Number(pelicula.ratingPelicula);

        let peliculaAValidar = new PeliculaUpdateDto();

        peliculaAValidar.anioLanzamientoPelicula = pelicula.anioLanzamientoPelicula;
        peliculaAValidar.precioPelicula = pelicula.precioPelicula;
        peliculaAValidar.ratingPelicula = pelicula.ratingPelicula;
        peliculaAValidar.sinopsisPelicula = pelicula.sinopsisPelicula;
        peliculaAValidar.actoresPrincipalesPelicula = pelicula.actoresPrincipalesPelicula;

        try {
            const errores = await validate(peliculaAValidar);
            if(errores.length>0){

            }else{
                await this._PeliculaService.modificarPelicula(pelicula);
                const url = '/api/pelicula/listar-peliculas/'+Number(pelicula.actor);
                res.redirect(url);
            }

        }catch (e) {
            res.status(500);
            res.send({mensaje: 'Error', codigo: 500});
        }
    }

    @Get('eliminar-pelicula/:idActor/:idPelicula')
    async getEliminarPelicula(@Param() param,@Res() res) {
        await this._PeliculaService.eliminarPelicula(param.idPelicula);
        const url = '/api/pelicula/listar-peliculas/'+param.idActor;
        res.redirect(url);
    }

    @Post('guardar-pelicula')
    async postGuardarpelicula(@Body() pelicula:Pelicula,
                        @Res() res) {

        console.log(pelicula);
        pelicula.anioLanzamientoPelicula = Number(pelicula.anioLanzamientoPelicula);
        pelicula.precioPelicula = Number(pelicula.precioPelicula);
        pelicula.ratingPelicula = Number(pelicula.ratingPelicula);

        let peliculaAValidar = new PeliculaCreateDto();

        peliculaAValidar.nombrePelicula = pelicula.nombrePelicula;
        peliculaAValidar.anioLanzamientoPelicula = pelicula.anioLanzamientoPelicula;
        peliculaAValidar.precioPelicula = pelicula.precioPelicula;
        peliculaAValidar.ratingPelicula = pelicula.ratingPelicula;
        peliculaAValidar.sinopsisPelicula = pelicula.sinopsisPelicula;
        peliculaAValidar.actoresPrincipalesPelicula = pelicula.actoresPrincipalesPelicula;

        try{
            const errores = await validate(peliculaAValidar);
            if(errores.length>0){
                console.log(errores);
                res.redirect('/api/pelicula/nueva-pelicula')
            }else {
                const respuesta = this._PeliculaService.crearPelicula(pelicula);
                const url = '/api/pelicula/listar-peliculas/'+pelicula.actor;
                res.redirect(url);
            }
        }catch (e) {
            console.error(e);
            res.status(500);
            res.send({mensaje: 'Error', codigo: 500});
        }
    }

    @Post('nueva-pelicula')
    async postNuevaPelicula(@Body() body, @Res() res) {
        const idActor = body.idActor;
        const actor = await this._ActorService.consultarActorPorId(idActor);
        const nombreActor = actor.nombresActor + " " + actor.apellidosActor;
        res.render('admin/nueva-pelicula',{nombreActor,idActor})
    }

    @Get('listar-peliculas/:idActor')
    async getListarPeliculas(@Param() param,@Res() res){
        const idActor = Number(param.idActor);
        const peliculas = await this._PeliculaService.consultarPeliculasPorActor(idActor);
        res.render('admin/listar-peliculas',{peliculas,idActor});

    }
}