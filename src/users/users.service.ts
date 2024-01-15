import { Injectable } from '@nestjs/common';
import { randomInt } from 'crypto';
import { Users } from './types/user';

@Injectable()
export class UsersService {
  private readonly users: Users[] = [
    {
      id: 1,
      password: '$2a$10$LIDdJiYyeE.NYzOI0QSVSeyLZsdQrBpdmPVHLYbIgjd17tGX7WqCq',
      email: 'something@123.com',
    },
  ];

  async findUser(email: string) {
    return this.users.find((user) => user.email === email);
  }

  async createUser(email: string, password: string) {
    this.users.push({ id: randomInt(100), email, password });
  }

  async createGoogleUser(email: string) {
    this.users.push({ id: randomInt(100), email });
  }
}
