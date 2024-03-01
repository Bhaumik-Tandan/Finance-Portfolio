import { Module } from '@nestjs/common';
import { TradesService } from './trades.service';
import { MongooseModule } from '@nestjs/mongoose';
import TradesSchema from './trades.schema';
@Module({
  imports: [MongooseModule.forFeature([TradesSchema])],
  providers: [TradesService],
})
export class TradesModule {}
