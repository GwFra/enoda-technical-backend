import { Injectable } from '@nestjs/common';

@Injectable()
export class BidsService {
  private bids = [
    { id: 1, owner: '', start: 111 },
    { id: 2, owner: '1', start: 111 },
  ];

  private bidsHistory = [
    { id: 1, history: [{ a: 1 }] },
    { id: 2, history: [{ a: 1 }] },
    { id: 3, history: [{ a: 1 }] },
  ];

  findBid(searchId: number, isHistorical = false) {
    const searchObj = isHistorical ? this.bidsHistory : this.bids;
    return searchObj.find(({ id }) => id === searchId);
  }

  getBids() {
    return this.bids;
  }

  getSingleBid(searchId: number) {
    return this.findBid(searchId);
  }

  getBidHistory(searchId: number) {
    return this.findBid(searchId, true);
  }

  createBid(bid) {
    this.bids.push(bid);
  }

  placeBid(searchId: number, bid) {
    const updatedBids = this.bidsHistory.map((existingBid) => {
      if (existingBid.id === searchId) {
        existingBid.history.push({ ...bid, time: Date.now() });
      }
    });
    this.bidsHistory = updatedBids as any;
  }
}
