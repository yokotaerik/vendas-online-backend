import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Roles } from 'src/decorator/roles.decorator';
import { UserType } from 'src/user/enum/user-type.enum';
import { InsertCartDTO } from './dtos/insertCart.dto';
import { UserId } from 'src/decorator/user-id.decorator';
import { CartService } from './cart.service';
import { ReturnCartDTO } from './dtos/returnCart.dto';
import { DeleteResult } from 'typeorm';
import { UpdateCartDTO } from './dtos/updateCart.dto';

@Roles(UserType.User, UserType.Admin)
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @UsePipes(ValidationPipe)
  @Post()
  async inserProduct(
    @Body() insertCartDTO: InsertCartDTO,
    @UserId() userId: number,
  ): Promise<ReturnCartDTO> {
    const cart = await this.cartService.inserProduct(insertCartDTO, userId);
    return new ReturnCartDTO(cart);
  }

  @UsePipes(ValidationPipe)
  @Get()
  async findActiveCart(@UserId() userId: number): Promise<ReturnCartDTO> {
    const cart = await this.cartService.findActiveCart(userId, true);
    return new ReturnCartDTO(cart);
  }

  @Delete()
  async clearCart(@UserId() userId: number) {
    return await this.cartService.clearCart(userId);
  }

  @Delete('/product/:productId')
  async deleteProductCart(
    @Param('productId') productId: number,
    @UserId() userId: number,
  ): Promise<DeleteResult> {
    return this.cartService.deleteProductCart(productId, userId);
  }

  @UsePipes(ValidationPipe)
  @Patch()
  async updateCart(
    @Body() updateCart: UpdateCartDTO,
    @UserId() userId: number,
  ): Promise<ReturnCartDTO> {
    return new ReturnCartDTO(
      await this.cartService.updateProductInCart(updateCart, userId),
    );
  }
}
