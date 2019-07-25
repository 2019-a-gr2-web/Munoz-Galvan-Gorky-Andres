import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {MayorNumeroModule} from "./mayorNumero/mayornumero.module";

@Module({
  imports: [MayorNumeroModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
