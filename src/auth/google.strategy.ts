import { Injectable } from '@nestjs/common';
// import { ConfigType } from '@nestjs/con'
import { PassportStrategy } from '@nestjs/passport';
// import { In}
import { Strategy, VerifyCallback } from 'passport-google-oauth2';
import 'dotenv/config';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/auth/google/callback',
      scope: ['profile', 'email'],
    });
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile,
    done: VerifyCallback,
  ): Promise<any> {
    // name
    const { id, emails } = profile;
    const user = {
      provider: 'google',
      providerId: id,
      email: emails[0].value,
    };
    done(null, user);
  }
}
