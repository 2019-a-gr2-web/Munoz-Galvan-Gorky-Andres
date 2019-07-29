import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ProductoModule} from './Producto/producto.module';
import {PromocionModule} from './Promocion/promocion.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import {ProductoEntity} from './Producto/producto.entity';
import {ProductoPromocionEntity} from './ProductoPromocion/producto.promocion.entity';
import {PromocionEntity} from './Promocion/promocion.entity';
@Module({
  imports: [ProductoModule, PromocionModule,
    TypeOrmModule.forRoot({
    name: 'default', //Nombre por defecto del TYPEORM
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'proyectoindividualweb',
    entities: [ProductoEntity,ProductoPromocionEntity, PromocionEntity],





    //  insecureAuth: true
  }),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule{}
