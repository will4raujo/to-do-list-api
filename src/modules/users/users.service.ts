import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  findOne(username: string) {
    if (username === '') {
      return null;
    }
    return {
      userId: '1',
      username: 'john',
      password: 'changeme',
    };
  }
}
