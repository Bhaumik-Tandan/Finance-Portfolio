import { Module } from '@nestjs/common';
import { PortfoliosService } from './portfolios.service';
import { PortfoliosController } from './portfolios.controller';
import { MongooseModule } from '@nestjs/mongoose';
import TradesSchema from "../trades/trades.schema";
import { TradesService } from 'src/trades/trades.service';
@Module({
  imports: [MongooseModule.forFeature([TradesSchema])],
  controllers: [PortfoliosController],
  providers: [PortfoliosService,TradesService],
})
export class PortfoliosModule {}
