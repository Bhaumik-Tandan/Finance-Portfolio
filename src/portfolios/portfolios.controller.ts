import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { PortfoliosService } from './portfolios.service';

@Controller('portfolio')
export class PortfoliosController {
  constructor(private readonly portfoliosService: PortfoliosService) {}

  @Get()
  getPortfolio() {
    return this.portfoliosService.getPortfolio();
  }

  @Post('addTrade')
  createTrade(@Body() tradeBody) {
    return this.portfoliosService.addTrade(tradeBody);
  }

  @Get('holdings')
  getTrade() {
    return this.portfoliosService.getHoldings();
  }

  @Put('updateTrade/:id')
  updateTrade(@Body() updatedTradeBody, @Param('id') tradeId) {
    return this.portfoliosService.updateTrade(tradeId, updatedTradeBody);
  }
  @Delete('removeTrade/:id')
  deleteTrade(@Param('id') tradeId) {
    return this.portfoliosService.deleteTrade(tradeId);
  }
}
