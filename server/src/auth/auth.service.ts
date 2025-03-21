// src/auth/auth.service.ts

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { PasswordService } from './password/password.service';
import { RefreshTokenService } from './refresh-token/refresh-token.service';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private passwordService: PasswordService,
    private refreshTokenService: RefreshTokenService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (
      user &&
      (await this.passwordService.comparePasswords(pass, user.password))
    ) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.email, loginDto.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { sub: user.id, email: user.email };
    const accessToken = this.jwtService.sign(payload);
    const refreshToken = await this.refreshTokenService.createRefreshToken(
      user.id,
    );

    return {
      access_token: accessToken,
      refresh_token: refreshToken.token,
    };
  }

  async register(registerDto: RegisterDto) {
    const hashedPassword = await this.passwordService.hashPassword(
      registerDto.password,
    );
    const user = await this.prisma.user.create({
      data: {
        email: registerDto.email,
        password: hashedPassword,
      },
    });
    const payload = { sub: user.id, email: user.email };
    const accessToken = this.jwtService.sign(payload);
    const refreshToken = await this.refreshTokenService.createRefreshToken(
      user.id,
    );
    return {
      access_token: accessToken,
      refresh_token: refreshToken.token,
    };
  }

  async refreshToken(refreshTokenDto: RefreshTokenDto) {
    const refreshToken = await this.refreshTokenService.validateRefreshToken(
      refreshTokenDto.refreshToken,
    );
    if (!refreshToken) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const user = await this.prisma.user.findUnique({
      where: { id: refreshToken.userId },
    });

    if (!user) {
      throw new UnauthorizedException('User not found.');
    }

    const payload = { sub: user.id, email: user.email };
    const accessToken = this.jwtService.sign(payload);
    const newRefreshToken = await this.refreshTokenService.createRefreshToken(
      user.id,
    );

    return {
      access_token: accessToken,
      refresh_token: newRefreshToken.token,
    };
  }
}
