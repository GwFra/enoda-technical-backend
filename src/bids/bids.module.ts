import { Module } from '@nestjs/common';
import { BidsService } from './bids.service';
import { BidsController } from './bids.controller';
import { ListingsModule } from 'src/listings/listings.module';

@Module({
  controllers: [BidsController],
  providers: [BidsService],
  imports: [ListingsModule],
})
export class BidsModule {}
