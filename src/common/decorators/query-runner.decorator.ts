import { InternalServerErrorException } from '@nestjs/common';
import { createParamDecorator } from '@nestjs/common';
import { ExecutionContext } from '@nestjs/common';

export const QueryRunnerDeco = createParamDecorator(
  (data, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    if (!request.queryRunner) {
      throw new InternalServerErrorException(
        `QueryRunnerDeco(데코레이터)를 사용하려면 TransactionInterceptor를 적용해주세요.`,
      );
    }

    return request.queryRunner;
  },
);
