import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { TaskDto } from './dto/tasks.dto';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaClient) {}
  async create(data: TaskDto) {
    return await this.prisma.tasks.create({ data });
  }

  async findAll() {
    return await this.prisma.tasks.findMany();
  }

  async update(id: number, data: TaskDto) {
    return await this.prisma.tasks.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    return await this.prisma.tasks.delete({
      where: { id },
    });
  }
}
