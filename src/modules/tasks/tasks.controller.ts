import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
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
  @Put(':id')
  async update(@Body() data: TaskDto, @Param('id') id: number) {
    return await this.tasksService.update(Number(id), data);
  }

  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  async remove(@Param('id') id: number) {
    console.log('passou aqui');
    return await this.tasksService.remove(Number(id));
  }
}
