export interface Bid {
  id: string | number;
  listingId: string | number;
  bidderId: number;
  accepted?: boolean;
}
