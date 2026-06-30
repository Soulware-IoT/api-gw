import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  if (!process.env.ALLOWED_ORIGINS) {
    throw new Error('ALLOWED_ORIGINS env var is required');
  }

  const allowedOrigins = process.env.ALLOWED_ORIGINS
    .split(',')
    .map((o) => o.trim())
    .filter(Boolean);

  app.enableCors({
    origin: allowedOrigins,
    allowedHeaders: [
      'Authorization',
      'Content-Type',
      'Accept-Language'
    ],
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
