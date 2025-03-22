import { TaskStatus } from '@prisma/client';

export interface TaskDto {
  id?: number;
  title: string;
  content: string;
  status: TaskStatus;
  userId: number;
}
