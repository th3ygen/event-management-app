import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from './prisma.service';

describe('PrismaService', () => {
  let service: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService],
    }).compile();

    service = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should connect to the database on module init', async () => {
    // Mock the $connect method to avoid actual database connection during testing
    const connectSpy = jest
      .spyOn(service, '$connect')
      .mockResolvedValue(undefined);

    // Trigger the onModuleInit lifecycle hook directly
    await service.onModuleInit();

    expect(connectSpy).toHaveBeenCalled();

    // Restore the original $connect method
    connectSpy.mockRestore();
  });

  it('should disconnect from the database on app close', async () => {
    const disconnectSpy = jest
      .spyOn(service, '$disconnect')
      .mockResolvedValue(undefined);

    await service.$disconnect();

    expect(disconnectSpy).toHaveBeenCalled();

    disconnectSpy.mockRestore();
  });
});
