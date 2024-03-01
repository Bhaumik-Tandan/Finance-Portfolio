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

  findOne(id: number) {
    return this.tradeModel.findById(id).exec();
  }

  update(id: number, updateTradeDto) {
    return this.tradeModel.findByIdAndUpdate(id, updateTradeDto);
  }

  delete(id:number)
  {
    return this.tradeModel.deleteOne({_id:id});
  }

}
