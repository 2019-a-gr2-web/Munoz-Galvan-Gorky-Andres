import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {ProductoEntity} from "../Producto/producto.entity";
import {PromocionEntity} from "../Promocion/promocion.entity";

@Entity('bdProductoPromocion')
export class ProductoPromocionEntity {

    @PrimaryGeneratedColumn()
    id:number;


    @ManyToOne(type => ProductoEntity,
        producto=>producto.productoPromocion)
    producto: number

    @ManyToOne(type => PromocionEntity,
        promocion=>promocion.productoPromocion)
    promocion: number

}