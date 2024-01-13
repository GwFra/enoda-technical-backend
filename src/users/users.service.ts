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
    { id: 1, password: '123', email: 'something@123.com' },
  ];

  async findUser(email: string): Promise<any> {
    return this.users.find((user) => user.email === email);
  }

  async createUser(email: string, password: string) {
    this.users.push({ id: randomInt(10), email, password });
  }

  async createGoogleUser(email) {
    this.users.push({ id: randomInt(10), email });
  }
}
