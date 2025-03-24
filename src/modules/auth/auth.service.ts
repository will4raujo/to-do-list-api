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
    email: string,
    password: string,
  ): Promise<{ access_token: string; user: any }> {
    const user = await this.usersService.findOne(email);
    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    if (user.password !== password) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const payload = { sub: user.id, username: user.name };
    return {
      access_token: await this.jwtService.signAsync(payload),
      user,
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
