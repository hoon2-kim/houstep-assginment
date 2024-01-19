import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
} from '@nestjs/swagger';

export const ApiXlsxUploadSwagger = (summary: string) => {
  return applyDecorators(
    ApiOperation({ summary }),
    ApiConsumes('multipart/form-data'),
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          file: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    }),
    ApiCreatedResponse({
      description: '영상 업로드 성공',
      schema: {
        type: 'object',
        properties: {
          message: { type: 'string' },
        },
      },
    }),
    ApiBadRequestResponse({
      description: '파일이 없는 경우,확장자가 잘못된 경우',
    }),
    ApiInternalServerErrorResponse({ description: '서버 오류' }),
  );
};
