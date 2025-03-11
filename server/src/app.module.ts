import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { PasswordService } from './auth/password/password.service';
import { PasswordModule } from './auth/password/password.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule,
    PrismaModule,
    PasswordModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService, PasswordService],
})
export class AppModule {}
