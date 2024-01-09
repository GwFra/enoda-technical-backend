import { Controller, Get, Param } from '@nestjs/common';
import { BidsService } from './bids.service';

@Controller('bids')
export class BidsController {
  constructor(private readonly bidsService: BidsService) {}

  @Get()
  allBids(): object {
    return this.bidsService.getBids();
  }

  @Get(":id")
  singleBid(@Param("id") searchId): object {
    return this.bidsService.getSingleBid(searchId);
  }

  @Get("history/:id")
  singleBidHistory(@Param("id") searchId): object {
    return this.bidsService.getBidHistory(searchId);
  }
  }
