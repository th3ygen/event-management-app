import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PasswordModule } from 'src/auth/password/password.module';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [PrismaModule, PasswordModule],
})
export class UsersModule {}
