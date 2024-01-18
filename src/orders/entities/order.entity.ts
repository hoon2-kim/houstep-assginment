import { CustomerEntity } from 'src/customers/entities/customer.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum EOrderType {
  ORDER = 'order',
  REFUND = 'refund',
}

@Entity({ name: 'order' })
export class OrderEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'order_date', type: 'date' })
  orderDate: Date;

  @Column({ name: 'order_type', type: 'enum', enum: EOrderType })
  orderType: EOrderType;

  @Column({ type: 'int' })
  amount: number;

  @Column({ type: 'int' })
  fk_customer_id: number;

  @ManyToOne(() => CustomerEntity, (customer) => customer.order)
  @JoinColumn({ name: 'fk_customer_id' })
  customer: CustomerEntity;
}
