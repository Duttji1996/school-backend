import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Homework } from './entities/homework.entity';
import { HomeworkService } from './homework.service';
import { HomeworkController } from './homework.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Homework])],
  providers: [HomeworkService],
  controllers: [HomeworkController],
  exports: [HomeworkService],
})
export class HomeworkModule {}
