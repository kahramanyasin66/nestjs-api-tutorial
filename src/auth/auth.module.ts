import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy';

@Module({
  imports: [JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}

// 1) Bu sınıfın başka sınıflardan çağrılmasını sağlamak için app.module içerisinde import olarak eklememiz gerekir.
// 2) Terminalden otomatik olarak module oluşturmak için "nest g module user" user örnek olarak yazılabilir.
// Ama öncesinde package.json 'da scripts içinde {"create-module": "nest g module user"} ekli olması lazım ve daha sonrasında "npm run create-module" kodunu çalıştırmalısın.
// 3) her save'lediğinde otomatik compile etmesi için {npm install ts-node nodemon --save-dev} ardından package.json 'da scripts içinde {"start:dev": "nodemon --exec ts-node src/main.ts"} yazmalısın.
// 4) Prisma : Veritabanına bağlanmayı sağlayan module ORM aracı Hybernate gibi
// Prisma CLI yükleme komutu "npm install --save-dev prisma@latest" ve "npm install prisma@client"
// 5) Schima :
