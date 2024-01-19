import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PageDto } from 'src/common/dtos/page.dto';
import { OrderQueryDto } from './dto/order-query.dto';
import {
  IFindMonthlyOrderStatistics,
  IFindOrderList,
} from './interface/orders.interface';
import { OrdersService } from './orders.service';
import {
  ApiFindMonthlyOrderStatistics,
  ApiFindOrderLists,
} from './orders.swagger';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @ApiFindOrderLists('주문 목록 조회')
  @Get()
  async findOrderLists(
    @Query() q: OrderQueryDto,
  ): Promise<PageDto<IFindOrderList>> {
    return await this.ordersService.findOrderList(q);
  }

  @ApiFindMonthlyOrderStatistics('월별 매출 통계')
  @Get('/statistics/monthly')
  async findMonthlyOrderStatistics(): Promise<
    Promise<IFindMonthlyOrderStatistics[]>
  > {
    return await this.ordersService.findMonthlyOrderStatistics();
  }
}
