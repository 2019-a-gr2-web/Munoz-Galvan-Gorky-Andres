import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {MayornumeroModule} from "./mayorNumero/mayornumero.module";

@Module({
  imports: [MayornumeroModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
