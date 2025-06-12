// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitar CORS para tu frontend
  app.enableCors({
    origin: process.env.FRONTEND_ORIGIN?.split(',') ?? ['http://localhost:5173'],
    credentials: true,
  });

  // ValidationPipe global: transforma y valida los DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,             // elimina propiedades no incluidas en el DTO
      forbidNonWhitelisted: true,  // error si llegan campos extra
      transform: true,             // convierte payloads a los tipos de tus DTOs
    }),
  );

  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  console.log(`App listening on http://localhost:${port}`);
}

bootstrap();
