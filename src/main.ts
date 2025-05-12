import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'https://control-361-frontend.vercel.app/',
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
}
bootstrap();
