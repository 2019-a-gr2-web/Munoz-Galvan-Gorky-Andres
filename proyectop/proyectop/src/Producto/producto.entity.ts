import {Column, Entity, OneToMany} from "typeorm";
import {PrimaryGeneratedColumn} from "typeorm/decorator/columns/PrimaryGeneratedColumn";
import {TragosEntity} from "../../../../01-http/02-servidor-web-nodejs/api-web/src/tragos/tragos.entity";
import {ProductoPromocionEntity} from "../ProductoPromocion/producto.promocion.entity";

@Entity('dbProducto')
export class ProductoEntity {

    @PrimaryGeneratedColumn()
    idProducto:number;

    @Column({
        type: 'varchar',
        length: 70,
        name: 'nombreProducto'
    })
    nombreProducto:string;

    @Column({
        type: 'decimal',
        precision: 10,
        scale:2,
        name: 'precioProducto'
    })
    precioProducto:number;

    @OneToMany(type=> ProductoPromocionEntity,
        producto_promocion => producto_promocion.productoId)
    productoPromocion: ProductoPromocionEntity[];

}