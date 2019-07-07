import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ProductoEntity} from "./Producto/producto.entity";
import {PromocionEntity} from "./Promocion/promocion.entity";
import {ProductoPromocionEntity} from "./ProductoPromocion/producto.promocion.entity";
import {ProductoModule} from "./Producto/producto.module";
import {PromocionModule} from "./Promocion/promocion.module";
import {ProductoPromocionModule} from "./ProductoPromocion/producto.promocion.module";

@Module({
  imports: [
      ProductoModule,
    PromocionModule,
    ProductoPromocionModule,
    TypeOrmModule.forRoot({
      name: 'default', // Nombre de cadena de conexión
      type: 'mysql',
      host: 'localhost',
      port: 32769,
      username: 'gorky',
      password: '12345678',
      database: 'proyectoIndividualWeb',
      entities: [
          ProductoEntity,
          PromocionEntity,
          ProductoPromocionEntity,
      ],
      synchronize: true,
      dropSchema:false
    }),

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
