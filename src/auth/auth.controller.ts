import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Put,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signIn) {
    return this.authService.signIn(signIn.email, signIn.isGoogle);
  }

  @Post('login/token')
  getToken(@Body() signIn) {
    return this.authService.getToken(signIn.email, signIn.password);
  }

  @Put('signup')
  signUp(@Body() signup) {
    return this.authService.registerUser(signup.email, signup.password);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user.email;
  }

  @Get('google')
  @UseGuards(JwtAuthGuard)
  async googleAuth(@Req() req) {
    const exists = await this.authService.checkUserExists(req.user.email);
    if (!exists) {
      this.authService.registerGoogleUser(req.user.email);
      return await this.authService.signIn(req.user.email, true);
    }
    return await this.authService.signIn(req.user.email, true);
  }
}
