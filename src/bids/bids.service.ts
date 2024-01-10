import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { Bid } from './types/bid';
import { randomUUID } from 'crypto';
import { ListingsService } from 'src/listings/listings.service';

@Injectable()
export class BidsService {
  constructor(private readonly listingsService: ListingsService) {}
  private bids: Bid[] = [];

  getBids(userId: number): Bid[] {
    return this.bids.filter(({ bidderId }) => bidderId === userId);
  }

  placeBid(listingId: string, bidderId: number): void {
    const listings = this.listingsService.getListings();
    const exists = listings.find(({ id }) => id === listingId);
    if (!exists) {
      throw new NotFoundException();
    } else if (bidderId === exists.supplierId) {
      throw new NotAcceptableException();
    } else {
      this.bids.push({
        id: randomUUID(),
        listingId,
        bidderId,
      });
    }
  }
}
