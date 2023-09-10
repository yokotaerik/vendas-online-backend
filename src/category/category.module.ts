import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/category.entity';
import { CategoryService } from './category.service.';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryEntity]), CategoryModule],
  controllers: [CategoryController],
  providers: [CategoryService],
  exports: [CategoryService],
})
export class CategoryModule {}
