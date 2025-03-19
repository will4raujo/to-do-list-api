import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(
      signInDto.username as string,
      signInDto.password as string,
    );
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(
    @Request() req: { user: { id: string; username: string; email: string } },
  ) {
    return req.user;
  }
}
