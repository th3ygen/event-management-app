import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

const SALT_ROUNDS = parseInt(process.env.PASSWORD_HASH_SALT_ROUNDS || '10');

@Injectable()
export class PasswordService {
  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, SALT_ROUNDS);
  }

  async comparePasswords(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
}
