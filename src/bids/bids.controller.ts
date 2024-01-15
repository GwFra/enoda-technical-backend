import {
  Body,
  Controller,
  Get,
  Request,
  Put,
  HttpCode,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { BidsService } from './bids.service';
import { Bid } from './types/bid';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('bids')
export class BidsController {
  constructor(private readonly bidsService: BidsService) {}
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Request() req): Bid[] {
    return this.bidsService.getBids(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/:id')
  acceptOffer(@Param('id') id) {
    this.bidsService.acceptOffer(id);
  }

  @Get(':id')
  getBids(@Param('id') id: string): Bid[] {
    return this.bidsService.getBidsForListing(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  @HttpCode(201)
  placeBid(@Body() body: { listingId }, @Request() req) {
    const { listingId } = body;
    this.bidsService.placeBid(listingId, req.user.userId);
  }
}
