import { IsNumber, IsString } from 'class-validator';
import { ProductEntity } from '../../product/entities/product.entity';

export class CreateCategoryDto {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  products?: ProductEntity;
}
