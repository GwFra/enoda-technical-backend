import {
  Inject,
  Injectable,
  NotAcceptableException,
  NotFoundException,
  // UnauthorizedException,
  forwardRef,
} from '@nestjs/common';
import { Bid } from './types/bid';
import { randomUUID } from 'crypto';
import { ListingsService } from 'src/listings/listings.service';

@Injectable()
export class BidsService {
  constructor(
    @Inject(forwardRef(() => ListingsService))
    private readonly listingsService: ListingsService,
  ) {}
  private bids: Bid[] = [{ id: 1231, listingId: 1, bidderId: 1 }];

  getBids(userId: number): Bid[] {
    return this.bids.filter(({ bidderId }) => bidderId === userId);
  }

  getOffers(userId: number) {
    const userListings = this.listingsService.getUserListings(userId);
    if (!userListings) {
      throw new NotFoundException();
    } else {
      const allListingIds = userListings.map(({ id }) => id);
      const allBids = this.bids.filter(({ listingId }) =>
        allListingIds.includes(listingId),
      );
      const allOffers = allBids.map(({ listingId, bidderId }) => {
        return {
          ...userListings.find(({ id }) => id === listingId),
          bidderId,
        };
      });
      return allOffers;
    }
  }

  getOfferForListing(userId, searchListingId) {
    const listing = this.listingsService.getSingleListing(searchListingId);
    if (!listing) {
      throw new NotFoundException();
    }
    // else if (userId === listing.supplierId) {
    //   throw new UnauthorizedException();
    // }
    else {
      const listingOffers = this.bids.filter(
        ({ listingId }) => listingId == searchListingId,
      );
      const mappedOffers = listingOffers.map(({ bidderId }) => ({
        ...listing,
        bidderId,
      }));
      return mappedOffers;
    }
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
