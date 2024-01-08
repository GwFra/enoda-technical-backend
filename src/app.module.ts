import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BidsModule } from './bids/bids.module';
import { BidsController } from './bids/bids.controller';
import { BidsService } from './bids/bids.service';

@Module({
  imports: [BidsModule],
  controllers: [AppController, BidsController],
  providers: [AppService, BidsService],
})
export class AppModule {}
