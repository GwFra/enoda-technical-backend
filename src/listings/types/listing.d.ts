import { RandomUUID } from 'crypto';

export type Listing = {
  id: typeof RandomUUID;
  supplierId: number;
  start: number;
  end: number;
  cost: number;
};
