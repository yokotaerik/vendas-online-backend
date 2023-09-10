import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserType } from '../user/enum/user-type.enum';
import { ReturnProductDto } from './dtos/returnProduct.dto';
import { Roles } from '../decorator/roles.decorator';
import { ProductService } from './product.service';
import { CreateProductDto } from './dtos/createProduct.dto';
import { ProductEntity } from './entities/product.entity';
import { DeleteResult } from 'typeorm';

@Roles(UserType.Admin, UserType.User)
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async findAllProducts(): Promise<ReturnProductDto[]> {
    const products = await this.productService.findAllProducts();

    return products.map((product) => new ReturnProductDto(product));
  }

  @Roles(UserType.Admin)
  @UsePipes(ValidationPipe)
  @Post()
  async createProduct(
    @Body() createProductDto: CreateProductDto,
  ): Promise<ProductEntity> {
    return await this.productService.createProduct(createProductDto);
  }

  @Roles(UserType.Admin)
  @UsePipes(ValidationPipe)
  @Delete('/:productId')
  async deleteProduct(@Body('productId') id: number): Promise<DeleteResult> {
    return await this.productService.deleteProduct(id);
  }
}
