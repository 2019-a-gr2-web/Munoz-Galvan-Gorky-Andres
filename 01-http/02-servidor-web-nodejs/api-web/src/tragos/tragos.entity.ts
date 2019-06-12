import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";

@Entity('bd_trago') // Nombre de la tabla
export class TragosEntity{

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    nombre:string;
}