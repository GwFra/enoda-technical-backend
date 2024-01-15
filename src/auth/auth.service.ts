import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, isGoogle = false) {
    const user = await this.usersService.findUser(email);
    if (isGoogle) {
      let payload;
      if (!user) {
        this.registerGoogleUser(email);
        const newUser = await this.checkUserExists(email);
        payload = { sub: newUser.id, email: newUser.email };
      } else {
        payload = { sub: user.id, email: user.email };
      }
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    }
    return user?.password;
  }

  async getToken(email: string, password: string) {
    const user = await this.usersService.findUser(email);
    if (password !== user?.password) {
      throw new UnauthorizedException();
    } else {
      const payload = { sub: user.id, email: user.email };
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    }
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
