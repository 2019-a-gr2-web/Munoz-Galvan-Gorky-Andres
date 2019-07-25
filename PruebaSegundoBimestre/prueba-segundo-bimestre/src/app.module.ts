import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {UsuarioModule} from "./usuario/usuario.module";
import {PeliculaModule} from "./pelicula/pelicula.module";
import {ActorModule} from "./actor/actor.module";
import { TypeOrmModule } from '@nestjs/typeorm';
import {ActorEntity} from "./actor/actor.entity";
import {PeliculaEntity} from "./pelicula/pelicula.entity";
import {UsuarioEntity} from "./usuario/usuario.entity";
import {PedidoEntity} from "./pedido/pedido.entity";
import {PedidoModule} from "./pedido/pedido.module";

@Module({
  imports: [
      UsuarioModule, PeliculaModule, ActorModule,PedidoModule,
    TypeOrmModule.forRoot({
      name: 'default', // Nombre de cadena de conexión
      type: 'mysql',
      host: 'localhost',
      port: 32769,
      username: 'gorky',
      password: '12345678',
      database: 'examenweb',
      entities: [
          ActorEntity,
          PeliculaEntity,
          UsuarioEntity,
          PedidoEntity
      ],
      synchronize: true,
      dropSchema:false
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
