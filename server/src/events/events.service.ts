import { Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class EventsService {
  constructor(private prisma: PrismaService) {}

  async create(createEventDto: CreateEventDto) {
    const { userId, name, start, end, organizer, location } = createEventDto;

    const startDate = new Date(start);
    const endDate = new Date(end);

    // check start and end date
    if (start < Date.now()) {
      throw new Error('Start date must be in the future');
    }
    
    if (end < Date.now()) {
      throw new Error('End date must be in the future');
    }

    if (start > end) {
      throw new Error('End date must be later than start date');
    }

    const event = await this.prisma.event.create({
      data: {
        createdBy: {
          connect: {
            id: userId,
          },
        },
        eventName: name,
        startDate,
        endDate,
        organizer,
        location,
      },
    });

    return event;
  }

  findAll() {
    return this.prisma.event.findMany({});
  }

  async findOne(id: number) {
    const event = await this.prisma.event.findUnique({
      where: {
        id,
      },
    });

    if (!event) throw new Error('Event not found, id ' + id);

    return event;
  }

  update(id: number, updateEventDto: UpdateEventDto) {
    return `This action updates a #${id} event`;
  }

  remove(id: number) {
    return `This action removes a #${id} event`;
  }
}
