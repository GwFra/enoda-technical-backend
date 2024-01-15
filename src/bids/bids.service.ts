import {
  Inject,
  Injectable,
  NotAcceptableException,
  NotFoundException,
  ForbiddenException,
  forwardRef,
} from '@nestjs/common';
import { Bid } from './types/bid';
import { randomUUID } from 'crypto';
import { ListingsService } from 'src/listings/listings.service';

let bids: Bid[] = [{ id: 1, listingId: 1, bidderId: 1 }];

@Injectable()
export class BidsService {
  constructor(
    @Inject(forwardRef(() => ListingsService))
    private readonly listingsService: ListingsService,
  ) {}

  getBids(userId: number): Bid[] {
    return bids.filter(({ bidderId }) => bidderId === userId);
  }

  getOffers(userId: number) {
    const userListings = this.listingsService.getUserListings(userId);
    if (!userListings) {
      throw new NotFoundException();
    } else {
      const allListingIds = userListings.map(({ id }) => id);
      const allBids = bids.filter(({ listingId }) =>
        allListingIds.includes(listingId),
      );
      const allOffers = allBids.map(({ listingId, bidderId, id, accepted }) => {
        return {
          ...userListings.find(({ id }) => id === listingId),
          bidderId,
          bidId: id,
          accepted,
        };
      });
      return allOffers;
    }
  }

  acceptOffer(bidId: number) {
    const selectedBid = bids.find(({ id }) => id == bidId);
    if (selectedBid?.accepted) {
      throw new NotAcceptableException();
    } else {
      const updatedBids = bids.map((bid) =>
        bid.id == bidId ? { ...bid, accepted: true } : bid,
      );
      bids = updatedBids;
    }
  }

  getOfferForListing(userId, searchListingId) {
    const listing = this.listingsService.getSingleListing(searchListingId);
    if (!listing) {
      throw new NotFoundException();
    } else if (userId === listing.supplierId) {
      throw new ForbiddenException();
    } else {
      const listingOffers = bids.filter(
        ({ listingId }) => listingId == searchListingId,
      );
      const mappedOffers = listingOffers.map(({ bidderId, id, accepted }) => ({
        ...listing,
        bidderId,
        bidId: id,
        accepted,
      }));
      return mappedOffers;
    }
  }

  getBidsForListing(searchId: string): Bid[] {
    return bids.filter(({ listingId }) => listingId == searchId);
  }

  placeBid(listingId: string, bidderId: number): void {
    const listings = this.listingsService.getListings();
    const exists = listings.find(({ id }) => id === listingId);
    if (!exists) {
      throw new NotFoundException();
    } else if (bidderId === exists.supplierId) {
      throw new ForbiddenException();
    } else {
      bids.push({
        id: randomUUID(),
        listingId,
        bidderId,
      });
    }
  }
}
