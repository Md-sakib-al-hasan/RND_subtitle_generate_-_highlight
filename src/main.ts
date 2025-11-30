import { join } from 'path';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({ origin: '*' });

  // Serve uploaded files
  app.use('/uploads', express.static(join(__dirname, '../uploads')));

  await app.listen(3001);
}
bootstrap();
