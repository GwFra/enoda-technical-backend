import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { BidsService } from './bids.service';

@Controller('bids')
export class BidsController {
  constructor(private readonly bidsService: BidsService) { }
  @Get()
  findAll(): object {
    return this.bidsService.getBids();
  }

  @Get("history/:id")
  bidHistory(@Param("id") searchId: string) {
    return this.bidsService.getBidHistory(parseInt(searchId));
  }

  @Get(':id')
  findOne(@Param("id") id: string) {
    return this.bidsService.getSingleBid(parseInt(id));
  }
  
  @Put()
  createBid(@Body() body) {
    // extra decoration of things
    const bid = { ...body, time: Date.now() };
    this.bidsService.createBid(bid)
  }

  @Post(":id")
  placeBid(@Param("id") searchId, @Body() body) {
    this.bidsService.placeBid(searchId, body)
  }
}
