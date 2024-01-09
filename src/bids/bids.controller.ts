import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
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

  @Put()
  createBid(@Body() body) {
    // extra decoration of things
    const bid = { ...body, time: Date.now()};
    this.bidsService.createBid(bid)
  }

  @Post(":id")
  placeBid(@Param("id") searchId, @Body() body) {
    this.bidsService.placeBid(searchId, body)
  }
  }
