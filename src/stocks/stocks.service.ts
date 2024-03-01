import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import StocksSchema from './stocks.schema';
import { Model } from 'mongoose';

@Injectable()
export class StocksService {
  constructor(
    @InjectModel(StocksSchema.name)
    private stocksModel: Model<typeof StocksSchema>,
  ) {}
  create(createStockDto) {
    const stock = new this.stocksModel(createStockDto);
    stock.save();
    return stock;
  }

  findAll() {
    return `This action returns all stocks`;
  }

  findOne(id: number) {
    return `This action returns a #${id} stock`;
  }

  update(id: number, updateStockDto) {
    return `This action updates a #${id} stock`;
  }

  remove(id: number) {
    return `This action removes a #${id} stock`;
  }
}
