import {
  Put,
  Body,
  Controller,
  Get,
  Param,
  Request,
  UseGuards,
  HttpCode,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import { ListingsService } from './listings.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { BidsService } from 'src/bids/bids.service';
import { Listing } from './types/listing';

@Controller('listings')
export class ListingsController {
  constructor(
    private readonly listingsService: ListingsService,
    @Inject(forwardRef(() => BidsService)) private bidsService: BidsService,
  ) {}
  @Get()
  findAll(): object {
    return this.listingsService.getListings();
  }

  @Get('/offers')
  getOffers(): Listing[] {
    return this.bidsService.getOffers(1000);
  }

  @Get('/offers/:id')
  getListingOffers(@Param('id') id: string): Listing[] {
    return this.bidsService.getOfferForListing(100, id);
  }

  @Get('/user/:id')
  findUserListing(@Param('id') id: string) {
    return this.listingsService.getUserListings(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.listingsService.getSingleListing(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  @HttpCode(201)
  createListing(@Body() body, @Request() req) {
    const { cost, start, end, quantity } = body;
    const listing = {
      id: randomUUID(),
      supplierId: req.user.userId,
      cost,
      quantity,
      start,
      end: start + end,
    };
    this.listingsService.createListing(listing);
  }
}
