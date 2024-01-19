import { applyDecorators } from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  getSchemaPath,
} from '@nestjs/swagger';
import { PageMetaDto } from 'src/common/dtos/page-meta.dto';

export const ApiFindOrderLists = (summary: string) => {
  return applyDecorators(
    ApiOperation({ summary }),
    ApiOkResponse({
      description: '조회 성공',
      schema: {
        properties: {
          data: {
            type: 'array',
            items: {
              properties: {
                order_date: { type: 'string', format: 'date' },
                order_type: { type: 'string' },
                amount: { type: 'number' },
                customer_name: { type: 'string' },
                customer_rating: { type: 'string' },
              },
            },
          },
          meta: { $ref: getSchemaPath(PageMetaDto) },
        },
      },
    }),
    ApiInternalServerErrorResponse({ description: '서버 오류' }),
  );
};

export const ApiFindMonthlyOrderStatistics = (summary: string) => {
  return applyDecorators(
    ApiOperation({ summary }),
    ApiOkResponse({
      description: '조회 성공',
      schema: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            '연도-날짜 주문액': { type: 'string' },
            '연도-날짜 반품액': { type: 'string' },
            '연도-날짜 매출': { type: 'string' },
          },
        },
      },
    }),
    ApiInternalServerErrorResponse({ description: '서버 오류' }),
  );
};
