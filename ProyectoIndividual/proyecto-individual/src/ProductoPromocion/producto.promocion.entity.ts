import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {ProductoEntity} from "../Producto/producto.entity";
import {PromocionEntity} from "../Promocion/promocion.entity";

@Entity('bdProductoPromocion')
export class ProductoPromocionEntity {

    @PrimaryGeneratedColumn()
    idProductoPromocion:number;


    @ManyToOne(type => ProductoEntity,
        producto=>producto.productoPromocion)
    productoId: ProductoEntity

    @ManyToOne(type => PromocionEntity,
        promocion=>promocion.productoPromocion)
    promocionId: PromocionEntity

}