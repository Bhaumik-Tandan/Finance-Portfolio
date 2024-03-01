import { Module } from '@nestjs/common';
import { StocksService } from './stocks.service';
import { MongooseModule } from '@nestjs/mongoose';
import StocksSchema from './stocks.schema';
@Module({
  imports: [MongooseModule.forFeature([StocksSchema])],
  providers: [StocksService],
})
export class StocksModule {}
