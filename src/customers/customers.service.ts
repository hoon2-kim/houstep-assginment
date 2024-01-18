import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import { CustomerEntity } from './entities/customer.entity';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(CustomerEntity)
    private readonly customerRepository: Repository<CustomerEntity>,
  ) {}

  async xlsxCustomersSaveDB(customer: any, qr?: QueryRunner): Promise<void> {
    const customerRepo = this.getCustomerRepository(qr);

    await customerRepo.save({
      id: customer['고객 id'],
      name: customer['고객명'],
      rating: customer['고객등급'],
    });
  }

  private getCustomerRepository(qr?: QueryRunner) {
    return qr
      ? qr.manager.getRepository<CustomerEntity>(CustomerEntity)
      : this.customerRepository;
  }
}
