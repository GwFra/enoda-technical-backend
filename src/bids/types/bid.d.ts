import { RandomUUID } from 'crypto';

export type Bid = {
  id: typeof RandomUUID;
  listingId: typeof RandomUUID;
  bidderId: number;
  accepted?: boolean;
};
