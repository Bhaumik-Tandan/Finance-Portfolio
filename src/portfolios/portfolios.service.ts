import { Injectable } from '@nestjs/common';
import { TradesService } from 'src/trades/trades.service';
@Injectable()
export class PortfoliosService {
  constructor(private tradesService: TradesService) {}
  addTrade(trade) {
    return this.tradesService.create(trade);
  }

  async  getPortfolio() {
    const trades = await this.tradesService.getAllTradesGroupedByStockId();
    
    const portfolio = {};
  
    trades.forEach(stock => {
      const stockName = stock.stock[0].name;
      const stockTrades = stock.trades;
      const tradesFormatted = stockTrades.map(trade => ({
        type: trade.type,
        quantity: trade.quantity,
        price: trade.price,
        date: new Date(trade.createdAt).toLocaleDateString()
      }));
      
      let totalQuantity = 0;
      let totalValue = 0;
      let totalInvestment = 0;
  
      stockTrades.forEach(trade => {
        const { type, price, quantity } = trade;
        if (type === 'BUY') {
          totalQuantity += quantity;
          totalValue += quantity * price;
          totalInvestment += quantity * price;
        } else if (type === 'SELL') {
          totalQuantity -= quantity;
          totalValue -= quantity * price;
        }
      });
  
      const avgPrice = totalInvestment / totalQuantity;
      portfolio[stockName] = {
        trades: tradesFormatted,
        netHoldings: {
          quantity: totalQuantity,
          avgPrice: avgPrice.toFixed(2)
        },
        averagePrice: avgPrice.toFixed(2)
      };
    });
  
    return portfolio;
  }

  async getHoldings() {
    const trades = await this.tradesService.getAllTradesGroupedByStockId();
    
    const holdings = {};
  
    trades.forEach(stock => {
      const stockName = stock.stock[0].name;
      const stockTrades = stock.trades;
  
      let totalQuantity = 0;
      let totalValue = 0;
      let totalInvestment = 0;
  
      stockTrades.forEach(trade => {
        const { type, price, quantity } = trade;
        if (type === 'BUY') {
          totalQuantity += quantity;
          totalValue += quantity * price;
          totalInvestment += quantity * price;
        } else if (type === 'SELL') {
          totalQuantity -= quantity;
          totalValue -= quantity * price;
        }
      });
  
      if (totalQuantity !== 0) {
        const avgPrice = totalInvestment / totalQuantity;
        holdings[stockName] = {
          quantity: totalQuantity,
          avgPrice: avgPrice.toFixed(2)
        };
      }
    });
  
    return holdings;
  }
  
  
  
  

  async updateTrade(tradeId, updatedTrade) {
    return this.tradesService.update(tradeId, updatedTrade);
  }

  async deleteTrade(tradeId) {
    return this.tradesService.delete(tradeId);
  }
}
