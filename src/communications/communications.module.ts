import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Circular } from './entities/circular.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Circular])],
  exports: [TypeOrmModule],
})
export class CommunicationsModule {}
