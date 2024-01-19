import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
import { PageOptionDto } from 'src/common/dtos/page-option.dto';

export class OrderQueryDto extends PageOptionDto {
  @ApiPropertyOptional({
    description: '시작일',
    type: 'string',
    example: '2023-01-01',
  })
  @IsOptional()
  @IsString()
  startDate?: string;

  @ApiPropertyOptional({
    description: '종료일',
    type: 'string',
    example: '2023-01-31',
  })
  @IsOptional()
  @IsString()
  endDate?: string;

  @ApiPropertyOptional({
    description: '주문타입(0:주문, 1:반품, 미입력:모두)',
    type: 'number',
    example: 0,
    minimum: 0,
    maximum: 1,
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(1)
  @Type(() => Number)
  orderType?: number;

  @ApiPropertyOptional({
    description: '주문고객 id',
    type: 'number',
    example: 1,
  })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  customerId?: number;
}
