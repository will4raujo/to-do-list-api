import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaClient) {}

  findOne(email: string) {
    return this.prisma.users.findFirst({
      where: {
        email,
      },
    });
  }
}
