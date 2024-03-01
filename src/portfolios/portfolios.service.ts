import { Injectable } from '@nestjs/common';
import { TradesService } from 'src/trades/trades.service';
@Injectable()
export class PortfoliosService {
  constructor(
    private tradesService:TradesService
  ) {}
  addTrade(trade)
  {
    return this.tradesService.create(trade);
  }

 async getPortfolio()
  {
    const trades=await this.tradesService.getAllTradesGroupedByStockId();
    return trades;
  }

  async updateTrade(tradeId, updatedTrade) {
    return this.tradesService.update(tradeId, updatedTrade);
  }

  async deleteTrade(tradeId)
  {
    return this.tradesService.delete(tradeId);
  }
}
