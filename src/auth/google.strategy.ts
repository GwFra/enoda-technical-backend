import { Injectable } from '@nestjs/common';
// import { ConfigType } from '@nestjs/con'
import { PassportStrategy } from '@nestjs/passport';
// import { In}
import { Strategy, VerifyCallback } from 'passport-google-oauth2';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID:
        '807452420141-r11jc2hdpsrv2tqcrlfvjgsghm4uac8b.apps.googleusercontent.com',
      clientSecret: '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',
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
