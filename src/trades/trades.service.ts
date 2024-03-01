import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import TradesSchema from './trades.schema';
import { Model } from 'mongoose';

@Injectable()
export class TradesService {
  constructor(
    @InjectModel(TradesSchema.name)
    private tradeModel: Model<typeof TradesSchema>,
  ) {}

  create(createTradeDto) {
    const trade = new this.tradeModel(createTradeDto);
    return trade.save();
  }

  findAll() {
    return this.tradeModel.find().exec();
  }

  async getAllTradesGroupedByStockId() {
    try {
      const trades = await this.tradeModel
        .aggregate([
          {
            $group: {
              _id: '$stockId',
              trades: { $push: '$$ROOT' },
            },
          },
          {
            $lookup: {
              from: 'stocks',
              localField: '_id',
              foreignField: '_id',
              as: 'stock',
            },
          },
        ])
        .exec();
      return trades;
    } catch (error) {
      throw new Error(`Error while fetching trades: ${error}`);
    }
  }

  findOne(id: number) {
    return this.tradeModel.findById(id).exec();
  }

  update(id: number, updateTradeDto) {
    return this.tradeModel.findByIdAndUpdate(id, updateTradeDto);
  }

  delete(id: number) {
    return this.tradeModel.deleteOne({ _id: id });
  }
}
