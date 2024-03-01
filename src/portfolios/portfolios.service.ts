import { Injectable } from '@nestjs/common';
import { TradesService } from 'src/trades/trades.service';

@Injectable()
export class PortfoliosService {
  constructor(private tradesService: TradesService) {}

  private async processTrades(trades, callback) {
    const result = {};

    for (const stock of trades) {
      const stockName = stock.stock[0].name;
      const stockTrades = stock.trades;
      const value = await this.getAverageBuyingPriceAndHoldingQuantity(stockTrades);
      result[stockName] = callback(value);
    }

    return result;
  }

  private getAverageBuyingPriceAndHoldingQuantity(stockTrades) {
    let totalHolding = 0;
    let totalBoughtPrice = 0;
    let totalBought = 0;

    stockTrades.forEach((trade) => {
      const { type, price, quantity } = trade;
      if (type === 'BUY') {
        totalBought += quantity;
        totalHolding += quantity;
        totalBoughtPrice += quantity * price;
      } else if (type === 'SELL') totalHolding -= quantity;
    });

    const averageBuyingPrice = totalBoughtPrice / totalBought;

    return { averageBuyingPrice, totalHolding };
  }

  async calculatePortfolio(trades) {
    return this.processTrades(trades, (value) => ({ trades: value.trades, holding: value }));
  }

  async calculateHoldings(trades) {
    return this.processTrades(trades, (value) => value);
  }

  async calculateReturns(trades) {
    return this.processTrades(trades, (value) => (100 - value.averageBuyingPrice) * value.totalHolding);
  }

  async getPortfolio() {
    const trades = await this.tradesService.getAllTradesGroupedByStockId();
    return this.calculatePortfolio(trades);
  }

  async getHoldings() {
    const trades = await this.tradesService.getAllTradesGroupedByStockId();
    return this.calculateHoldings(trades);
  }

  async getReturns() {
    const trades = await this.tradesService.getAllTradesGroupedByStockId();
    return this.calculateReturns(trades);
  }

  async updateTrade(tradeId, updatedTrade) {
    return this.tradesService.update(tradeId, updatedTrade);
  }

  async deleteTrade(tradeId) {
    return this.tradesService.delete(tradeId);
  }
}
