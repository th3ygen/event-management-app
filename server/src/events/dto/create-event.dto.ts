import { IsNotEmpty, IsNumber, IsString, IsUrl } from 'class-validator';

export class CreateEventDto {
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  start: number;

  @IsNumber()
  @IsNotEmpty()
  end: number;

  @IsNotEmpty()
  location: string;

  @IsString()
  organizer?: string;

  @IsUrl()
  posterUrl?: string;
}
