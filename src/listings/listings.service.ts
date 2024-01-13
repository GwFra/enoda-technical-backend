import { NotFoundException } from '@nestjs/common';
import { Listing } from './types/listing';

export class ListingsService {
  private listings: Listing[] = [
    {
      id: 1,
      supplierId: 1000,
      quantity: 19,
      start: Date.now(),
      end: Date.now(),
      cost: 1000,
    },
    {
      id: 2,
      supplierId: 1000,
      quantity: 19,
      cost: 100,
      start: Date.now(),
      end: Date.now(),
    },
    {
      id: 3,
      supplierId: 1000,
      quantity: 19,
      cost: 3000,
      start: Date.now(),
      end: Date.now(),
    },
  ];

  getListings(): Listing[] {
    return this.listings;
  }

  getSingleListing(searchId: string): Listing {
    // only double equals as param searchId comes in as a string
    const listing = this.listings.find(({ id }) => id == searchId);
    if (!listing) {
      throw new NotFoundException();
    } else {
      return listing;
    }
  }

  getUserListings(userId: string): Listing[] {
    const userListings = this.listings.filter(
      ({ supplierId }) => supplierId == userId,
    );
    return userListings;
  }

  createListing(listing: Listing): void {
    this.listings.push(listing);
  }
}
