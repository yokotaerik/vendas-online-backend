import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CategoryService } from './category.service.';
import { ReturnCategory } from './dtos/returnCategory.dto';
import { UserType } from 'src/user/enum/user-type.enum';
import { Roles } from 'src/decorator/roles.decorator';
import { CategoryEntity } from './entities/category.entity';
import { CreateCategoryDto } from './dtos/createCategory.dto';

@Roles(UserType.Admin, UserType.User)
@Controller('category')
export class CategoryController {
  constructor(private readonly service: CategoryService) {}

  @Get()
  async findAllCategories(): Promise<ReturnCategory[]> {
    const categories = await this.service.findAllCategories();

    return categories.map((category) => new ReturnCategory(category));
  }

  @UsePipes(ValidationPipe)
  @Roles(UserType.Admin)
  @Post()
  async createCategory(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<CategoryEntity> {
    return this.service.createCategory(createCategoryDto);
  }
}
