import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private readonly users = [{ id: 1, username: 'admin', password: '123' }];

  async findUser(username: string): Promise<any> {
    return this.users.find((user) => user.username === username);
  }
}
