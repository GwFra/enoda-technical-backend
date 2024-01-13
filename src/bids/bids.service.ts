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
  private bids: Bid[] = [{ id: 1231, listingId: 1, bidderId: 1 }];

  getBids(userId: number): Bid[] {
    return this.bids.filter(({ bidderId }) => bidderId === userId);
  }

  getBidsForListing(searchId: string): Bid[] {
    return this.bids.filter(({ listingId }) => listingId == searchId);
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
