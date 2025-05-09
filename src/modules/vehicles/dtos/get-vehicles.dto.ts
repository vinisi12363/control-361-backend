import { IsOptional, IsIn, IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export class GetVehiclesDto {
  @IsOptional()
  @IsIn(['others', 'tracked'], {
    message: 'type must be either "others" or "tracked"',
  })
  type?: 'others' | 'tracked';

  @IsOptional()
  @IsInt({ message: 'page must be an integer' })
  @Type(() => Number)
  page?: number;

  @IsOptional()
  @IsInt({ message: 'perPage must be an integer' })
  @Type(() => Number)
  perPage?: number;
}
