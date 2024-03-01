import { Injectable } from '@nestjs/common';
import { TradesService } from 'src/trades/trades.service';
@Injectable()
export class PortfoliosService {
  constructor(private tradesService: TradesService) {}
  addTrade(trade) {
    return this.tradesService.create(trade);
  }

  async calculateTotalValues(stockTrades) {
    let totalQuantity = 0;
    let totalValue = 0;

    stockTrades.forEach((trade) => {
      const { type, price, quantity } = trade;
      if (type === 'BUY') {
        totalQuantity += quantity;
        totalValue += quantity * price;
      } else if (type === 'SELL') {
        totalQuantity -= quantity;
        totalValue -= quantity * price;
      }
    });

    return { totalQuantity, totalValue };
  }

  getAverageBuyingPriceAndHoldingQuantity(stockTrades) {
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
    const portfolio = {};

    for (const stock of trades) {
      const stockName = stock.stock[0].name;
      const stockTrades = stock.trades;

      const holding=
        await this.getAverageBuyingPriceAndHoldingQuantity(stockTrades);

      portfolio[stockName] = {
        trades: stockTrades,
        holding
      };
    }

    return portfolio;
  }

  async calculateHoldings(trades) {
    const holdings = {};

    for (const stock of trades) {
      const stockName = stock.stock[0].name;
      const stockTrades = stock.trades;

      const { totalQuantity, totalValue } =
        await this.calculateTotalValues(stockTrades);

      if (totalQuantity !== 0) {
        const avgPrice = totalValue / totalQuantity;
        holdings[stockName] = {
          quantity: totalQuantity,
          avgPrice: avgPrice.toFixed(2),
        };
      }
    }

    return holdings;
  }

  async calculateReturns(trades) {
    const portfolio = {};

    for (const stock of trades) {
      const stockName = stock.stock[0].name;
      const stockTrades = stock.trades;

      let totalQuantity = 0;
      let totalInvestment = 0;

      stockTrades.forEach((trade) => {
        if (trade.type === 'BUY') {
          totalQuantity += trade.quantity;
          totalInvestment += trade.price * trade.quantity;
        }
      });

      if (totalQuantity > 0) {
        const averageBuyingPrice = totalInvestment / totalQuantity;
        const initialPrice = stockTrades[0].price;
        const finalPrice = 100;
        const cumulativeReturn =
          ((finalPrice - initialPrice) * totalQuantity) / initialPrice;

        portfolio[stockName] = {
          averageBuyingPrice: averageBuyingPrice.toFixed(2),
          cumulativeReturn: cumulativeReturn.toFixed(2),
        };
      }
    }

    return portfolio;
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
