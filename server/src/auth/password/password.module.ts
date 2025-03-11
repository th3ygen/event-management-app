import { Module } from '@nestjs/common';
import { PasswordService } from './password.service';

@Module({
  providers: [PasswordService],
  exports: [PasswordService], // Make the service available to other modules
})
export class PasswordModule {}
