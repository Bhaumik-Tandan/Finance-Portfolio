import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StocksModule } from './stocks/stocks.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { TradesModule } from './trades/trades.module';
import { PortfoliosModule } from './portfolios/portfolios.module';
@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    StocksModule,
    ConfigModule.forRoot({ envFilePath: ['.env'], isGlobal: true }),
    MongooseModule.forRoot(process.env.DATABASE_URL),
    TradesModule,
    PortfoliosModule,
  ],
})
export class AppModule {}
