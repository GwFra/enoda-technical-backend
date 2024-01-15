import { Module, forwardRef } from '@nestjs/common';
import { ListingsService } from './listings.service';
import { ListingsController } from './listings.controller';
import { BidsModule } from 'src/bids/bids.module';

@Module({
  providers: [ListingsService],
  controllers: [ListingsController],
  exports: [ListingsService],
  imports: [forwardRef(() => BidsModule)],
})
export class ListingsModule {}
