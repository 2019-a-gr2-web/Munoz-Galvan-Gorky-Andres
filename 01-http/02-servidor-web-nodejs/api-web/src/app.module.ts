import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TragosModule} from "./tragos/tragos.module";
import { TypeOrmModule } from '@nestjs/typeorm';
import {TragosEntity} from "./tragos/tragos.entity";
import {FiestaEntity} from "./fiesta/fiesta.entity";
import {DistribuidorEntity} from "./distribuidor/distribuidor.entity";
import {DistribuidorModule} from "./distribuidor/distribuidor.module";
import {FiestaModule} from "./fiesta/fiesta.module";
import {ChatModule} from "./chat/chat.module";

@Module({
  imports: [
      ChatModule
      //TragosModule,DistribuidorModule,FiestaModule,
    /*TypeOrmModule.forRoot({
      name: 'default', // Nombre de cadena de conexión
      type: 'mysql',
      host: 'localhost',
      port: 32769,
      username: 'gorky',
      password: '12345678',
      database: 'pruebaweb',
      entities: [
          TragosEntity,
          FiestaEntity,
          DistribuidorEntity,
      ],
      synchronize: true,
      dropSchema:false
    }),*/
  ], //Aquí se ponen los módulos
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
