import { RandomUUID } from 'crypto';

export type Listing = {
  id: typeof RandomUUID;
  supplierId: typeof RandomUUID;
  cost: number;
  quantity: number;
  start: number;
  end: number;
};
