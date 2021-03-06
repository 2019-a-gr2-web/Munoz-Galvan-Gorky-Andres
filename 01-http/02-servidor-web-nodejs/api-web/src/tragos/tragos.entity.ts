import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany} from "typeorm";
import {DistribuidorEntity} from "../distribuidor/distribuidor.entity";
import {FiestaEntity} from "../fiesta/fiesta.entity";

@Entity('bd_trago') // Nombre de la tabla
export class TragosEntity{

    @PrimaryGeneratedColumn()
    id:number;

    @Column({
        type: 'varchar',
        length: 70,
        name: 'nombre_trago',
    })
    nombre: string;

    @Column({
        type: 'varchar',
        length: 10,
        name: 'tipo_trago',
    })
    tipo: 'Ron'|'Vodka'|'Whiskey'|'Tequila'|'Puntas'|'Cerveza';

    @Column({
        type: 'int',
        name: 'grados_alcohol',
    })
    gradosAlcohol: number;

    @Column({
        type: 'date',
        name: 'fecha_caducidad',
        nullable:true
    })
    fechaCaducidad: Date;

    @Column({
        type: 'decimal',
        precision: 10,
        scale:2,
        name: 'precio',
        nullable:true
    })
    precio: number;

    @ManyToOne(type => DistribuidorEntity,
            distribuidor=>distribuidor.tragos)
    distribuidorId: DistribuidorEntity;

    @OneToMany(type=> FiestaEntity,
        fiesta => fiesta.tragoId)
    fiesta: FiestaEntity[];

}