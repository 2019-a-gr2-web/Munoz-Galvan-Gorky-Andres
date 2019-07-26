import {Body, Controller, Get, Param, Post, Res} from "@nestjs/common";
import {PeliculaService} from "./pelicula.service";
import {ActorService} from "../actor/actor.service";

@Controller('api/pelicula')
export class PeliculaController {

    constructor(private readonly _PeliculaService:PeliculaService,
                private readonly _ActorService:ActorService){}

    @Get('eliminar-pelicula/:idActor/:idPelicula')
    async getEliminarPelicula(@Param() param,@Res() res) {
        await this._PeliculaService.eliminarPelicula(param.idPelicula);
        const url = '/api/pelicula/listar-peliculas/'+param.idActor;
        res.redirect(url);
    }

    @Post('nueva-pelicula')
    async postNuevaPelicula(@Body() body, @Res() res) {
        const idActor = body.idActor;
        const actor = await this._ActorService.consultarActorPorId(idActor);
        const nombreActor = actor.nombresActor + " " + actor.apellidosActor;
        res.render('admin/nueva-pelicula',{nombreActor})
    }

    @Post('listar-peliculas/:idActor')
    async postListarPeliculas(@Param() param,@Res() res){
        const idActor = Number(param.idActor);
        const peliculas = await this._PeliculaService.consultarPeliculasPorActor(idActor);
        res.render('admin/listar-peliculas',{peliculas,idActor});

    }
}