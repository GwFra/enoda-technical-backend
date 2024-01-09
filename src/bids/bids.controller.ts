import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  Request,
} from '@nestjs/common';
import { BidsService } from './bids.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('bids')
export class BidsController {
  constructor(private readonly bidsService: BidsService) {}
  @Get()
  findAll(): object {
    return this.bidsService.getBids();
  }

  @Get('history/:id')
  bidHistory(@Param('id') searchId: string) {
    return this.bidsService.getBidHistory(parseInt(searchId));
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bidsService.getSingleBid(parseInt(id));
  }

  @UseGuards(AuthGuard)
  @Put()
  createBid(@Body() body, @Request() req) {
    // extra decoration of things
    console.log(req.user);
    // const bid = { ...body, time: Date.now() };
    // this.bidsService.createBid(bid);
  }

  @UseGuards(AuthGuard)
  @Post(':id')
  placeBid(@Param('id') searchId, @Body() body) {
    this.bidsService.placeBid(searchId, body);
  }
}
