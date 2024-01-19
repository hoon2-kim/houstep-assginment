import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, Max, Min } from 'class-validator';

export class PageOptionDto {
  @ApiPropertyOptional({
    description: '페이지번호',
    type: 'number',
    default: 1,
    minimum: 1,
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  readonly page?: number = 1;

  @ApiPropertyOptional({
    description: '페이지당 아이템 수',
    type: 'number',
    default: 50,
    minimum: 1,
    maximum: 100,
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(100)
  @Type(() => Number)
  take?: number = 50;

  get skip(): number {
    return (this.page - 1) * this.take;
  }
}
