import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { PrismaClient } from '@prisma/client';

@Module({
  controllers: [TasksController],
  providers: [TasksService, PrismaClient],
})
export class TasksModule {}
