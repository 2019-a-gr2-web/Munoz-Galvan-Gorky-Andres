import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {NestExpressApplication} from "@nestjs/platform-express";
import * as express from 'express';
import {join} from "path";

async function bootstrap() {
  const app = await NestFactory
      .create(AppModule) as NestExpressApplication; //Casteo
  app.setViewEngine('ejs');
  app.setBaseViewsDir(join(__dirname,'..','views'));
  app.use(express.static('publico'));
  await app.listen(3000);
}
bootstrap();
