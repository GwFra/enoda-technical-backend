import { Injectable } from '@nestjs/common';
import { randomInt } from 'crypto';

type Users = {
  id: number;
  username: string;
  password?: string;
};

@Injectable()
export class UsersService {
  private readonly users: Users[] = [
    { id: 1, username: 'admin', password: '123' },
  ];

  async findUser(username: string): Promise<any> {
    return this.users.find((user) => user.username === username);
  }

  async createUser(username: string, password: string) {
    this.users.push({ id: randomInt(10), username, password });
  }

  async createGoogleUser(username) {
    this.users.push({ id: randomInt(10), username });
  }
}
