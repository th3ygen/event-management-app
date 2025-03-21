// src/auth/refresh-token/refresh-token.module.ts

import { Module } from '@nestjs/common';
import { RefreshTokenService } from './refresh-token.service';
import { PrismaService } from '../../prisma/prisma.service'; // Adjust path as needed

@Module({
  providers: [RefreshTokenService, PrismaService],
  exports: [RefreshTokenService],
})
export class RefreshTokenModule {}
