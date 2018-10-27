import * as dotenv from 'dotenv';
dotenv.config();

import { NestFactory } from '@nestjs/core';
import * as cors from 'cors';
import * as express from 'express';
import * as path from 'path';
import { AppModule } from './app.module';
import { NotFoundExceptionFilter } from './filters';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cors());

  // if (process.env.NODE_ENV === 'production') {
  //   app.use(express.static(path.join(__dirname, '../../dist')));
  //   app.use(
  //     '/scripts',
  //   );
  //   app.useGlobalFilters(new NotFoundExceptionFilter());
  // }

  await app.listen(6789);
}
bootstrap();
