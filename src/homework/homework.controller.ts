import { Controller, Post, Get, Body, Param, UseGuards } from '@nestjs/common';
import { HomeworkService } from './homework.service';

@Controller('homework')
export class HomeworkController {
  constructor(private readonly homeworkService: HomeworkService) {}

  @Post()
  create(@Body() homeworkData: any) {
    return this.homeworkService.create(homeworkData);
  }

  @Get('class/:classId')
  findByClass(@Param('classId') classId: number) {
    return this.homeworkService.findByClass(classId);
  }
}
