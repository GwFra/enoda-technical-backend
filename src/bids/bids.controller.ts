import {
  Body,
  Controller,
  Get,
  UseGuards,
  Request,
  Put,
  HttpCode,
} from '@nestjs/common';
import { BidsService } from './bids.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Bid } from './types/bid';

@Controller('bids')
export class BidsController {
  constructor(private readonly bidsService: BidsService) {}
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Request() req): Bid[] {
    return this.bidsService.getBids(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  @HttpCode(201)
  placeBid(@Body() body: { listingId }, @Request() req) {
    const { listingId } = body;
    this.bidsService.placeBid(listingId, req.user.userId);
  }
}
