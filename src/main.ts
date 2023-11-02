import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist:true, // bunu dto'da bulunmayan herhangi req parametresini almak istemediğimiz için yazıyoruz.
  }));
  
  await app.listen(3000);
}
bootstrap();
