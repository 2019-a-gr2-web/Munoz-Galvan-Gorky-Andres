import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TragosModule} from "./tragos/tragos.module";
import { TypeOrmModule } from '@nestjs/typeorm';
import {TragosEntity} from "./tragos/tragos.entity";

@Module({
  imports: [TragosModule,
    TypeOrmModule.forRoot({
      name: 'default', // Nombre de cadena de conexión
      type: 'mysql',
      host: 'localhost',
      port: 32773,
      username: 'gorky',
      password: '12345678',
      database: 'pruebaweb',
      entities: [
          TragosEntity,
      ],
      synchronize: true,
    }),
  ], //Aquí se ponen los módulos
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
