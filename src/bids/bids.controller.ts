import {
  Body,
  Controller,
  Get,
  // UseGuards,
  // Request,
  Put,
  HttpCode,
  Param,
} from '@nestjs/common';
import { BidsService } from './bids.service';
// import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Bid } from './types/bid';

@Controller('bids')
export class BidsController {
  constructor(private readonly bidsService: BidsService) {}
  // @UseGuards(JwtAuthGuard)
  // @Get()
  // findAll(@Request() req): Bid[] {
  //   return this.bidsService.getBids(req.user.userId);
  // }

  @Get()
  findAll(): Bid[] {
    return this.bidsService.getBids(1);
  }

  @Get(':id')
  getBids(@Param('id') id: string): Bid[] {
    return this.bidsService.getBidsForListing(id);
  }

  @Put()
  @HttpCode(201)
  placeBid(@Body() body: { listingId }) {
    console.log('hmm');
    const { listingId } = body;
    this.bidsService.placeBid(listingId, 1);
  }
}

// @UseGuards(JwtAuthGuard)
// @Put()
// @HttpCode(201)
// placeBid(@Body() body: { listingId }, @Request() req) {
//   const { listingId } = body;
//   this.bidsService.placeBid(listingId, req.user.userId);
// }
