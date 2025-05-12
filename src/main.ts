import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: (origin, callback) => {
      const allowedOrigins = [
        'https://control-361-frontend.vercel.app',
        'http://localhost:3000',
      ];
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  });
  const config = new DocumentBuilder()
    .setTitle('API de Locação de Veículos')
    .setDescription(
      'Documentação da API do desafio técnico para  a control 361, consiste basicamente numa api intermediária para gerenciar o cache das requests da aplicação.',
    )
    .setVersion('1.0')
    .addTag('vehicles')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  await app.listen(process.env.PORT ?? 3000);
  const SELF_URL: string = process.env.API_URL ?? 'http://localhost:3000';
  setInterval(() => {
    fetch(SELF_URL)
      .then((res) => console.log(`[AutoPing] Status: ${res.status}`))
      .catch((err) => console.error('[AutoPing] Erro:', err));
  }, 40000);
}
bootstrap();
