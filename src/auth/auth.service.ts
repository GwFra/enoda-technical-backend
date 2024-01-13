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
    email: string,
    password: string,
    isGoogle = false,
  ): Promise<any> {
    const user = await this.usersService.findUser(email);
    if (!isGoogle) {
      if (user?.password !== password) {
        throw new UnauthorizedException();
      }
    }
    const payload = { sub: user.id, email: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async registerUser(email, password) {
    this.usersService.createUser(email, password);
  }

  async registerGoogleUser(email) {
    this.usersService.createGoogleUser(email);
  }

  async checkUserExists(email) {
    return this.usersService.findUser(email);
  }
}
