import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BidsModule } from './bids/bids.module';
import { BidsController } from './bids/bids.controller';
import { BidsService } from './bids/bids.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [BidsModule, AuthModule, UsersModule],
  controllers: [AppController, BidsController],
  providers: [AppService, BidsService],
})
export class AppModule {}
