import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaModule } from '../prisma/prisma.module';
import { PasswordModule } from '../auth/password/password.module';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule, PasswordModule],
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
