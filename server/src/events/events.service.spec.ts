import { Test, TestingModule } from '@nestjs/testing';
import { EventsService } from './events.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEventDto } from './dto/create-event.dto';

describe('EventsService', () => {
  let service: EventsService;
  let prismaService: PrismaService;

  const mockPrismaService = {
    event: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EventsService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<EventsService>(EventsService);
    prismaService = module.get<PrismaService>(PrismaService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create an event', async () => {
      const startTime = Date.now() + 1000000;
      const endTime = Date.now() + 2000000;

      const createEventDto: CreateEventDto = {
        userId: 1,
        name: 'Test Event',
        start: startTime,
        end: endTime,
        location: 'Test Location',
      };

      const expectedEvent = {
        id: 1,
        eventName: 'Test Event',
        startDate: new Date(startTime),
        endDate: new Date(endTime),
        location: 'Test Location',
        createdById: 1,
      };

      (prismaService.event.create as jest.Mock).mockResolvedValue(
        expectedEvent,
      );

      const result = await service.create(createEventDto);

      expect(prismaService.event.create).toHaveBeenCalledWith({
        data: {
          createdBy: { connect: { id: 1 } },
          eventName: 'Test Event',
          startDate: expect.any(Date),
          endDate: expect.any(Date),
          location: 'Test Location',
        },
      });
      expect(result).toEqual(expectedEvent);
    });

    it('should throw an error if end date is before start date', async () => {
      const startTime = Date.now() + 2000000;
      const endTime = Date.now() + 1000000;

      const createEventDto: CreateEventDto = {
        userId: 1,
        name: 'Test Event',
        start: startTime,
        end: endTime,
        location: 'Test Location',
      };

      await expect(service.create(createEventDto)).rejects.toThrow(
        'End date must be later than start date',
      );
    });

    it('should throw an error if start date is in the past', async () => {
      const startTime = Date.now() - 1000000;
      const endTime = Date.now() + 1000000;

      const createEventDto: CreateEventDto = {
        userId: 1,
        name: 'Test Event',
        start: startTime,
        end: endTime,
        location: 'Test Location',
      };

      await expect(service.create(createEventDto)).rejects.toThrow(
        'Start date must be in the future',
      );
    });

    it('should throw an error if end date is in the past', async () => {
      const startTime = Date.now() + 1000000;
      const endTime = Date.now() - 1000000;

      const createEventDto: CreateEventDto = {
        userId: 1,
        name: 'Test Event',
        start: startTime,
        end: endTime,
        location: 'Test Location',
      };

      await expect(service.create(createEventDto)).rejects.toThrow(
        'End date must be in the future',
      );
    });
  });

  describe('findAll', () => {
    it('should return all events', async () => {
      const expectedEvents = [
        { id: 1, eventName: 'Event 1' },
        { id: 2, eventName: 'Event 2' },
      ];

      (prismaService.event.findMany as jest.Mock).mockResolvedValue(
        expectedEvents,
      );

      const result = await service.findAll();

      expect(prismaService.event.findMany).toHaveBeenCalled();
      expect(result).toEqual(expectedEvents);
    });
  });

  describe('findOne', () => {
    it('should return an event by id', async () => {
      const expectedEvent = { id: 1, eventName: 'Test Event' };

      (prismaService.event.findUnique as jest.Mock).mockResolvedValue(
        expectedEvent,
      );

      const result = await service.findOne(1);

      expect(prismaService.event.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      });
      expect(result).toEqual(expectedEvent);
    });

    it('should throw an error if event is not found', async () => {
      (prismaService.event.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(service.findOne(1)).rejects.toThrow('Event not found, id 1');
    });
  });

  describe('update', () => {
    it('should return a string indicating update action', () => {
      expect(service.update(1, {})).toBe('This action updates a #1 event');
    });
  });

  describe('remove', () => {
    it('should return a string indicating remove action', () => {
      expect(service.remove(1)).toBe('This action removes a #1 event');
    });
  });
});
