import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {ProductoPromocionEntity} from "../ProductoPromocion/producto.promocion.entity";

@Entity('dbPromocion')
export class PromocionEntity {

    @PrimaryGeneratedColumn()
    id:number;

    @Column({
        type:'varchar',
        length:70,
        name:'nombrePromocion'
    })
    nombrePromocion:string;

    @Column({
        type: 'date',
        name: 'fechaValidaPromocion',
        nullable:true
    })
    fechaValidaPromocion: Date;

    @OneToMany(type=> ProductoPromocionEntity,
        producto_promocion => producto_promocion.promocion)
    productoPromocion: ProductoPromocionEntity[];
}