import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersModule } from './orders/orders.module';
import { OrderEntity } from './orders/entities/order.entity';
import { CustomerEntity } from './customers/entities/customer.entity';
import { XlsxUploadModule } from './xlsx-upload/excel.module';
import { CustomersModule } from './customers/customers.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [OrderEntity, CustomerEntity],
      synchronize: false,
      logging: true,
      timezone: 'Asia/Seoul',
    }),
    CustomersModule,
    OrdersModule,
    XlsxUploadModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
