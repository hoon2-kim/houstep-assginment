import {
  BadRequestException,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { QueryRunnerDeco } from 'src/common/decorators/query-runner.decorator';
import { TransactionInterceptor } from 'src/common/interceptors/transaction.interceptor';
import { xlsxFileFilter } from 'src/common/utils/fileFilter';
import { QueryRunner } from 'typeorm';
import { XlsxUploadService } from './excel.service';

@Controller('xlsx-upload')
export class XlsxUploadController {
  constructor(private readonly xlsxUploadService: XlsxUploadService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: xlsxFileFilter,
    }),
    TransactionInterceptor,
  )
  async uploadExcelDataToDB(
    @UploadedFile() file: Express.Multer.File, //
    @QueryRunnerDeco() qr: QueryRunner,
  ) {
    if (!file) {
      throw new BadRequestException('파일이 없습니다.');
    }

    return await this.xlsxUploadService.uploadToDB(file, qr);
  }
}
