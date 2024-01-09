import { Injectable, NotFoundException } from '@nestjs/common';
import { Bid, BidHistory } from './types/bid';
import { randomUUID } from 'crypto';
import _ from 'lodash';

@Injectable()
export class BidsService {
  private bids: Bid[] = [];
  private bidsHistory: BidHistory[] = [];

  getBids() {
    return this.bids;
  }

  getSingleBid(searchId: string) {
    return this.bids.find(({ id }) => id === searchId);
  }

  getBidHistory(bidderId: string) {
    console.log(_.filter(this.bidsHistory, ['bidderId', bidderId]));
  }

  createBid(bid: Bid) {
    this.bids.push(bid);
  }

  placeBid(bidId: string, bidderId: string) {
    const exists = this.bids.find(({ id }) => id === bidId);
    if (!exists) {
      throw new NotFoundException();
    }
    this.bidsHistory.push({
      id: randomUUID(),
      bidId,
      bidderId,
      time: Date.now(),
    });
  }
}
