import { Module } from '@nestjs/common';
import { XlsxUploadService } from './xlsx-upload.service';
import { XlsxUploadController } from './xlsx-upload.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerEntity } from 'src/customers/entities/customer.entity';
import { OrderEntity } from 'src/orders/entities/order.entity';
import { CustomersModule } from 'src/customers/customers.module';
import { OrdersModule } from 'src/orders/orders.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CustomerEntity, OrderEntity]),
    CustomersModule,
    OrdersModule,
  ],
  controllers: [XlsxUploadController],
  providers: [XlsxUploadService],
})
export class XlsxUploadModule {}
