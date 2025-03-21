// src/auth/refresh-token.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class RefreshTokenService {
  constructor(private prisma: PrismaService) {}

  async createRefreshToken(userId: number, ttl: number = 60 * 60 * 24 * 30) {
    // 30 days default TTL
    const expiresAt = new Date();
    expiresAt.setTime(expiresAt.getTime() + ttl * 1000);

    const refreshToken = await this.prisma.refreshToken.create({
      data: {
        token: uuidv4(),
        userId,
        expiresAt,
      },
    });

    return refreshToken;
  }

  async validateRefreshToken(token: string) {
    const refreshToken = await this.prisma.refreshToken.findUnique({
      where: { token },
    });

    if (!refreshToken) {
      return null;
    }

    if (refreshToken.expiresAt < new Date()) {
      await this.prisma.refreshToken.delete({ where: { token } }); // Delete expired token
      return null;
    }

    return refreshToken;
  }

  async deleteRefreshToken(token: string) {
    const refreshToken = await this.prisma.refreshToken.findUnique({
      where: { token },
    });

    if (!refreshToken) {
      throw new NotFoundException('Refresh token not found');
    }

    await this.prisma.refreshToken.delete({ where: { token } });
  }

  async deleteRefreshTokensByUserId(userId: number) {
    await this.prisma.refreshToken.deleteMany({
      where: { userId },
    });
  }
}
