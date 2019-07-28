import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import {NestExpressApplication} from "@nestjs/platform-express";

async function bootstrap() {
  const app = await NestFactory
      .create(AppModule) as NestExpressApplication; //Casteo
  app.use(express.static('publico'));
  await app.listen(3000);

}
bootstrap();
