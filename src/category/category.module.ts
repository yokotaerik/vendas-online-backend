import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { ProductService } from '../product/product.service';
import { ProductModule } from '../product/product.module';

@Module({
  controllers: [CategoryController],
  providers: [ProductService],
  imports: [ProductModule],
})
export class CategoryModule {}
