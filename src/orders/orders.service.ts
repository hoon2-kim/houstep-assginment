import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { convertToKST } from 'src/common/utils/moment';
import { Between, FindOptionsWhere, QueryRunner, Repository } from 'typeorm';
import { OrderQueryDto } from './dto/order-query.dto';
import { EOrderType, OrderEntity } from './entities/order.entity';
import { PageMetaDto } from 'src/common/dtos/page-meta.dto';
import { PageDto } from 'src/common/dtos/page.dto';
import {
  IFindMonthlyOrderStatistics,
  IFindOrderList,
} from './interface/orders.interface';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
  ) {}

  private getOrderRepository(qr?: QueryRunner) {
    return qr
      ? qr.manager.getRepository<OrderEntity>(OrderEntity)
      : this.orderRepository;
  }

  async findOrderList(q: OrderQueryDto): Promise<PageDto<IFindOrderList>> {
    const { startDate, endDate, customerId, orderType, skip, take } = q;

    const whereOptions: FindOptionsWhere<OrderEntity> = {
      orderDate:
        startDate && endDate
          ? Between(new Date(startDate), new Date(endDate))
          : null,
      fk_customer_id: customerId ? customerId : null,
      orderType:
        orderType === 0
          ? EOrderType.ORDER
          : orderType === 1
          ? EOrderType.REFUND
          : null,
    };

    const [result, count] = await this.orderRepository.findAndCount({
      relations: { customer: true },
      where: whereOptions,
      take,
      skip,
      order: { orderDate: 'desc' },
    });

    const pageMeta = new PageMetaDto({ pageOptionDto: q, itemCount: count });

    return new PageDto(
      result.map((r) => ({
        order_date: r.orderDate,
        order_type: r.orderType,
        amount: r.amount,
        customer_name: r.customer.name,
        customer_rating: r.customer.rating,
      })),
      pageMeta,
    );
  }

  async findMonthlyOrderStatistics(): Promise<
    Promise<IFindMonthlyOrderStatistics[]>
  > {
    const result = await this.orderRepository
      .createQueryBuilder('order')
      .select([
        `DATE_FORMAT(order.orderDate, '%Y-%m') AS date`,
        `SUM(CASE WHEN order.orderType = 'order' THEN order.amount ELSE 0 END) AS order_amount`,
        `SUM(CASE WHEN order.orderType = 'refund' THEN order.amount ELSE 0 END) AS refund_amount`,
        `SUM(CASE WHEN order.orderType = 'order' THEN order.amount WHEN order.orderType = 'refund' THEN -order.amount ELSE 0 END) AS total_amount`,
      ])
      .groupBy('date')
      .orderBy('date', 'ASC')
      .getRawMany();

    return result.map((r) => ({
      [`${r.date} 주문액`]: `${Number(r.order_amount).toLocaleString()}원`,
      [`${r.date} 반품액`]: `${Number(r.refund_amount).toLocaleString()}원`,
      [`${r.date} 매출`]: `${Number(r.total_amount).toLocaleString()}원`,
    }));
  }

  async xlsxOrdersSaveDB(order: any, qr?: QueryRunner): Promise<void> {
    const customerRepo = this.getOrderRepository(qr);

    await customerRepo.save({
      orderDate: convertToKST(order['주문일자']),
      orderType: order['주문타입'],
      amount: order['주문금액'],
      fk_customer_id: order['주문고객 id'],
    });
  }
}
