import { Controller, Get, Query } from '@nestjs/common';
import { PageDto } from 'src/common/dtos/page.dto';
import { OrderQueryDto } from './dto/order-query.dto';
import {
  IFindMonthlyOrderStatistics,
  IFindOrderList,
} from './interface/orders.interface';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  async findOrderLists(
    @Query() q: OrderQueryDto,
  ): Promise<PageDto<IFindOrderList>> {
    return await this.ordersService.findOrderList(q);
  }

  @Get('/statistics/monthly')
  async findMonthlyOrderStatistics(): Promise<
    Promise<IFindMonthlyOrderStatistics[]>
  > {
    return await this.ordersService.findMonthlyOrderStatistics();
  }
}
