import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger belgeleri oluşturma
  const swaggerConfig = new DocumentBuilder()
    .setTitle('NestJS API')
    .setDescription('NestJS API Dokümantasyonu')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // bunu dto'da bulunmayan herhangi req parametresini almak istemediğimiz için yazıyoruz.
    }),
  );

  await app.listen(3000);
}
bootstrap();
