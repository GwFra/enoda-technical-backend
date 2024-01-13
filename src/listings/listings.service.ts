import { NotFoundException } from '@nestjs/common';
import { Listing } from './types/listing';

export class ListingsService {
  private listings: Listing[] = [];

  getListings(): Listing[] {
    return this.listings;
  }

  getSingleListing(searchId: string): Listing {
    const listing = this.listings.find(({ id }) => id === searchId);
    if (!listing) {
      throw new NotFoundException();
    } else {
      return listing;
    }
  }

  createListing(listing: Listing): void {
    this.listings.push(listing);
  }
}
