import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    username: string,
    password: string,
    isGoogle = false,
  ): Promise<any> {
    const user = await this.usersService.findUser(username);
    if (!isGoogle) {
      if (user?.password !== password) {
        throw new UnauthorizedException();
      }
    }
    const payload = { sub: user.id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async registerUser(username, password) {
    this.usersService.createUser(username, password);
  }

  async registerGoogleUser(username) {
    this.usersService.createGoogleUser(username);
  }

  async checkUserExists(username) {
    return this.usersService.findUser(username);
  }
}
