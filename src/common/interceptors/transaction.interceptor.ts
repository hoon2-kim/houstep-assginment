import { InternalServerErrorException } from '@nestjs/common';
import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { catchError, tap, Observable } from 'rxjs';
import { DataSource } from 'typeorm';

@Injectable()
export class TransactionInterceptor implements NestInterceptor {
  constructor(private readonly dataSource: DataSource) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();

    // 쿼리러너 생성
    const qr = this.dataSource.createQueryRunner();

    // 쿼리러너 연결
    await qr.connect();

    // 쿼리러너에서 트랜잭션 시작
    await qr.startTransaction();

    request.queryRunner = qr;

    return next.handle().pipe(
      // 오류 처리
      catchError(async (e) => {
        await qr.rollbackTransaction();
        await qr.release();

        throw new InternalServerErrorException(e.message);
      }),

      // 성공했다면
      tap(async () => {
        await qr.commitTransaction();
        await qr.release();
      }),
    );
  }
}
