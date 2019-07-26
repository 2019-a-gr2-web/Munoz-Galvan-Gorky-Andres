import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {ActorEntity} from "../actor/actor.entity";

@Entity('db_pelicula')
export class PeliculaEntity {

    @PrimaryGeneratedColumn()
    idPelicula:number;

    @Column({
        type:'varchar',
        length:70,
        name: 'nombre_pelicula',
    })
    nombrePelicula:string;

    @Column({
        type:'int',
        name: 'anio_lanzamiento_pelicula',
    })
    anioLanzamientoPelicula:number;

    @Column({
        type: 'decimal',
        precision: 10,
        scale:2,
        name: 'precio_pelicula',
    })
    precioPelicula:number;

    @Column({
        type:'int',
        name: 'rating_pelicula_pelicula',
    })
    ratingPelicula:number;

    @Column({
        type:'varchar',
        name:'actores_principales_pelicula'
    })
    actoresPrincipalesPelicula:string;

    @Column({
        type:'varchar',
        name:'sinopsis_principales'
    })
    sinopsisPelicula:string;


    @ManyToOne(
        type => ActorEntity,
        actor => actor.pelicula
    )
    actor:number;

}