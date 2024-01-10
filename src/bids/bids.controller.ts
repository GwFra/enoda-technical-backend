import {
  Body,
  Controller,
  Get,
  Param,
  // Post,
  Put,
  UseGuards,
  Request,
  Post,
} from '@nestjs/common';
import { BidsService } from './bids.service';
// import { AuthGuard } from 'src/auth/auth.guard';
import { randomUUID } from 'crypto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
// import { Bid } from './types/bid';

@Controller('bids')
export class BidsController {
  constructor(private readonly bidsService: BidsService) {}
  @Get()
  findAll(): object {
    return this.bidsService.getBids();
  }

  @UseGuards(JwtAuthGuard)
  @Get('history')
  bidHistory(@Request() req) {
    return this.bidsService.getBidHistory(req.sub);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bidsService.getSingleBid(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id')
  placeBid(@Param() bidId: string, @Request() req) {
    this.bidsService.placeBid(bidId, req.sub);
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  createBid(@Body() body, @Request() req) {
    const { cost, start, end } = body;
    const bid = {
      id: randomUUID(),
      supplierId: req.user.sub,
      cost,
      start,
      end: start + end,
    };
    this.bidsService.createBid(bid);
  }
}
