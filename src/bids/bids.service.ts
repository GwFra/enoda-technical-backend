import { Injectable } from '@nestjs/common';

@Injectable()
export class BidsService {

    private bids = [
        { id: 1, owner: "", start: 111}
    ]

    private bidsHistory = [
        { id: 1, history: []},
        { id: 2, history: []},
        { id: 3, history: []},
    ]

    findBid(searchId, isHistorical = false) {
        const searchObj =  isHistorical ? this.bids : this.bidsHistory;
        return searchObj.find(({id}) => id === searchId)
    }

    getBids() {
        return this.bids
    }

    getSingleBid(searchId: number) {
        return this.findBid(searchId);
    }

    getBidHistory(searchId: number) {
        return this.findBid(searchId, true);
    }

    createBid(bid) {
        this.bids.push(bid)
    }

    placeBid(searchId: number, bid) {
        const updatedBids = this.bidsHistory.map((existingBid) => {
            if(existingBid.id === searchId) {
                existingBid.history.push({...bid, time: Date.now()})
            }
        })
        this.bidsHistory = updatedBids as any;
    }

}
