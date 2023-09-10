import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { DeleteResult, Repository } from 'typeorm';
import { CreateProductDto } from './dtos/createProduct.dto';
import { CategoryService } from '../category/category.service.';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly ProductRepository: Repository<ProductEntity>,
    private readonly categoryService: CategoryService,
  ) {}

  async findAllProducts(): Promise<ProductEntity[]> {
    const products = await this.ProductRepository.find();

    if (!products || products.length === 0) {
      throw new NotFoundException('Products not found');
    }

    return products;
  }

  async createProduct(
    createProductDto: CreateProductDto,
  ): Promise<ProductEntity> {
    const category = await this.categoryService.findCategoryById(
      createProductDto.categoryId,
    );

    if (!category) {
      throw new NotFoundException('Invalid category');
    }
    return await this.ProductRepository.save({
      ...createProductDto,
    });
  }

  async findProductById(id: number): Promise<ProductEntity> {
    const product = await this.ProductRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!product) {
      throw new NotFoundException('Cannot find product');
    }

    return product;
  }

  async deleteProduct(id: number): Promise<DeleteResult> {
    const product = await this.findProductById(id);

    return this.ProductRepository.delete({ id: product.id });
  }
}
