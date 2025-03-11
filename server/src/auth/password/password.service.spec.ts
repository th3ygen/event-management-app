import { Test, TestingModule } from '@nestjs/testing';
import { PasswordService } from './password.service';
import * as bcrypt from 'bcrypt';

describe('PasswordService', () => {
  let service: PasswordService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PasswordService],
    }).compile();

    service = module.get<PasswordService>(PasswordService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('hashPassword', () => {
    it('should hash a password', async () => {
      const password = 'testPassword';
      const hashedPassword = await service.hashPassword(password);

      expect(typeof hashedPassword).toBe('string');
      expect(hashedPassword.length).toBeGreaterThan(0);

      // Verify that the hash is valid bcrypt (optional, but good practice)
      expect(bcrypt.getRounds(hashedPassword)).toBeGreaterThan(0);
    });

    it('should generate different hashes for the same password', async () => {
      const password = 'testPassword';
      const hashedPassword1 = await service.hashPassword(password);
      const hashedPassword2 = await service.hashPassword(password);

      expect(hashedPassword1).not.toBe(hashedPassword2);
    });
  });

  describe('comparePasswords', () => {
    it('should return true for matching passwords', async () => {
      const password = 'testPassword';
      const hashedPassword = await service.hashPassword(password);
      const result = await service.comparePasswords(password, hashedPassword);

      expect(result).toBe(true);
    });

    it('should return false for non-matching passwords', async () => {
      const password = 'testPassword';
      const wrongPassword = 'wrongPassword';
      const hashedPassword = await service.hashPassword(password);
      const result = await service.comparePasswords(
        wrongPassword,
        hashedPassword,
      );

      expect(result).toBe(false);
    });

    it('should return false for invalid hash', async () => {
      const password = 'testPassword';
      const invalidHash = 'invalidHash';
      const result = await service.comparePasswords(password, invalidHash);

      expect(result).toBe(false);
    });
  });
});
