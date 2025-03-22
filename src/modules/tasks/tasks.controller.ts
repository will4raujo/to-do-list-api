import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskDto } from './dto/tasks.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(@Body() data: TaskDto) {
    return await this.tasksService.create(data);
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  async findAll() {
    return await this.tasksService.findAll();
  }

  @HttpCode(HttpStatus.OK)
  @Post(':id')
  async update(@Body() data: TaskDto, @Param('id') id: number) {
    return await this.tasksService.update(id, data);
  }

  @HttpCode(HttpStatus.OK)
  @Post(':id/delete')
  async remove(@Param('id') id: number) {
    return await this.tasksService.remove(id);
  }
}
