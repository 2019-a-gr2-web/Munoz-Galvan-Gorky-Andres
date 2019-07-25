import {Entity, OneToMany} from "typeorm";
import {PrimaryGeneratedColumn} from "typeorm/decorator/columns/PrimaryGeneratedColumn";
import {Column} from "typeorm/decorator/columns/Column";
import {PeliculaEntity} from "../pelicula/pelicula.entity";

@Entity('db_actor')
export class ActorEntity {

    @PrimaryGeneratedColumn()
    idActor:number;

    @Column({
        type: 'varchar',
        length: 70,
        name: 'nombres_actor',
    })
    nombresActor: string;

    @Column({
        type: 'varchar',
        length: 70,
        name: 'apellidos_actor',
    })
    apellidosActor: string;

    @Column({
        type: 'date',
        name: 'fecha_nacimiento_actor',
        nullable:true
    })
    fechaNacimientoActor: Date;

    @Column({
        type: 'int',
        name: 'numero_peliculas_actor',
    })
    numeroPeliculasActor: string;

    @Column({
        type:'boolean',
        name:'esta_retirado_actor'
    })
        estaRetiradoActor: boolean;

    @OneToMany(
        type => PeliculaEntity,
        pelicula => pelicula.actorId
    )
    peliculas: PeliculaEntity[]


}