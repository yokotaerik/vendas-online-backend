import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Roles } from 'src/decorator/roles.decorator';
import { UserType } from 'src/user/enum/user-type.enum';
import { InsertCartDTO } from './dtos/insertCart.dto';
import { UserId } from 'src/decorator/user-id.decorator';
import { CartEntity } from './entities/cart.entity';
import { CartService } from './cart.service';

@Roles(UserType.User, UserType.Admin)
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @UsePipes(ValidationPipe)
  @Post()
  async inserProduct(
    @Body() insertCartDTO: InsertCartDTO,
    @UserId() userId: number,
  ): Promise<CartEntity> {
    return this.cartService.inserProduct(insertCartDTO, userId);
  }
}
