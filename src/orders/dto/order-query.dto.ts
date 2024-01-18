import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
import { PageOptionDto } from 'src/common/dtos/page-option.dto';

export class OrderQueryDto extends PageOptionDto {
  @IsOptional()
  @IsString()
  startDate?: string;

  @IsOptional()
  @IsString()
  endDate?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(1)
  @Type(() => Number)
  orderType?: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  customerId?: number;
}
