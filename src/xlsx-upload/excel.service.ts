import { Injectable } from '@nestjs/common';
import { QueryRunner } from 'typeorm';
import * as XLSX from 'xlsx';
import { CustomersService } from 'src/customers/customers.service';
import { OrdersService } from 'src/orders/orders.service';

@Injectable()
export class XlsxUploadService {
  constructor(
    private readonly customersService: CustomersService,
    private readonly ordersService: OrdersService,
  ) {}

  async uploadToDB(
    file: Express.Multer.File,
    qr?: QueryRunner,
  ): Promise<string> {
    const datas = this.xlsxToJson(file);

    if (datas.has('customer')) {
      const customers = datas.get('customer');

      for (const c of customers) {
        await this.customersService.xlsxCustomersSaveDB(c, qr);
      }
    }

    if (datas.has('order')) {
      const orders = datas.get('order');

      for (const o of orders) {
        await this.ordersService.xlsxOrdersSaveDB(o, qr);
      }
    }

    return '업로드 성공';
  }

  private xlsxToJson(file: Express.Multer.File) {
    const xlsxFile = XLSX.read(file.buffer, {
      type: 'buffer',
      cellNF: true,
    });

    const data = new Map();

    const sheetNames = xlsxFile.SheetNames;

    for (const name of sheetNames) {
      data.set(name, XLSX.utils.sheet_to_json(xlsxFile.Sheets[name]));
    }

    return data;
  }
}
