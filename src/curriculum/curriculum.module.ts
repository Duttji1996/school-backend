import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SchoolClass } from './entities/school-class.entity';
import { Subject } from './entities/subject.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SchoolClass, Subject])],
  exports: [TypeOrmModule],
})
export class CurriculumModule {}
