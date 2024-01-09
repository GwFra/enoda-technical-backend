import { RandomUUID } from 'crypto';

export type Bid = {
  id: typeof RandomUUID;
  supplierId: 1;
  start: number;
  end: number;
  cost: number;
};

export type BidHistory = {
  id: typeof RandomUUID;
  bidId: typeof RandomUUID;
  bidderId: typeof RandomUUID;
  time: number;
};
