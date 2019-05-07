import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {NestExpressApplication} from "@nestjs/platform-express";
import {join} from "path";
import * as express from 'express';
import * as path from "path";
import * as favicon from "serve-favicon"



const cookieParser = require('cookie-parser');


async function bootstrap() {
  const app = await NestFactory
      .create(AppModule) as NestExpressApplication; //Casteo
  app.use(favicon(path.join(__dirname,'..','publico','imagenes','planetexpress.ico')));

  app.use(cookieParser('secreto'));
  //Implementación EJS
  app.setViewEngine('ejs');
  app.setBaseViewsDir(join(__dirname,'..','views'));
  app.use(express.static('publico'));
  await app.listen(3000);
}
bootstrap();
