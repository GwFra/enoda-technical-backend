import { Injectable } from '@nestjs/common';
import { randomInt } from 'crypto';

type Users = {
  id: number;
  email: string;
  password?: string;
};

@Injectable()
export class UsersService {
  private readonly users: Users[] = [
    {
      id: 1,
      password: '$2a$10$LIDdJiYyeE.NYzOI0QSVSeyLZsdQrBpdmPVHLYbIgjd17tGX7WqCq',
      email: 'something@123.com',
    },
  ];

  async findUser(email: string): Promise<any> {
    return this.users.find((user) => user.email === email);
  }

  async createUser(email: string, password: string) {
    // Change to something with more options
    this.users.push({ id: randomInt(10), email, password });
  }

  async createGoogleUser(email) {
    this.users.push({ id: randomInt(10), email });
  }
}
