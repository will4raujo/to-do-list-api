import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from '../users/dto/users.dto';
import { PrismaClient } from '@prisma/client';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private prisma: PrismaClient,
  ) {}

  async signIn(
    username: string,
    pass: string,
  ): Promise<{ access_token: string }> {
    const user = this.usersService.findOne(username);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.userId, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(data: UserDto): Promise<UserDto> {
    const user = await this.prisma.users.findUnique({
      where: {
        email: data.email,
      },
    });

    if (user) {
      throw new UnauthorizedException('Este email já está em uso');
    }

    return await this.prisma.users.create({ data });
  }
}
