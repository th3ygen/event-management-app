import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from '@/prisma/prisma.module';
import { PasswordModule } from '@/auth/password/password.module';
import { PrismaService } from '@/prisma/prisma.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [PrismaModule, PasswordModule],
})
export class UsersModule {}
