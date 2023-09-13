import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartEntity } from './entities/cart.entity';
import { DeleteResult, Repository } from 'typeorm';
import { InsertCartDTO } from './dtos/insertCart.dto';
import { CartProductService } from 'src/cart-product/cart-product.service';
import { UpdateCartDTO } from './dtos/updateCart.dto';

const rows_affected = 1;

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartEntity)
    private readonly cartRepository: Repository<CartEntity>,
    private readonly cartProductService: CartProductService,
  ) {}

  async findActiveCart(
    userId: number,
    showRelations?: boolean,
  ): Promise<CartEntity> {
    const relations = showRelations
      ? {
          cartProduct: {
            product: true,
          },
        }
      : undefined;

    const cart = await this.cartRepository.findOne({
      where: {
        userId,
        active: true,
      },
      relations,
    });

    if (!cart) {
      throw new NotFoundException('Have no active cart');
    }

    return cart;
  }

  async createCart(userId: number): Promise<CartEntity> {
    return this.cartRepository.save({
      active: true,
      userId,
    });
  }

  async inserProduct(
    insertCartDTO: InsertCartDTO,
    userId: number,
  ): Promise<CartEntity> {
    const cart = await this.findActiveCart(userId, true).catch(async () => {
      await this.createCart(userId);
      return await this.findActiveCart(userId, true);
    });

    await this.cartProductService.inserProduct(insertCartDTO, cart);

    return cart;
  }

  async clearCart(userId: number): Promise<DeleteResult> {
    const cart = await this.findActiveCart(userId);

    await this.cartRepository.save({
      ...cart,
      active: false,
    });

    return {
      raw: [],
      affected: rows_affected,
    };
  }

  async deleteProductCart(
    productId: number,
    userId: number,
  ): Promise<DeleteResult> {
    const cart = await this.findActiveCart(userId);

    return this.cartProductService.deleteProductCart(productId, cart.id);
  }

  async updateProductInCart(
    updateCart: UpdateCartDTO,
    userId: number,
  ): Promise<CartEntity> {
    const cart = await this.findActiveCart(userId, true).catch(async () => {
      await this.createCart(userId);
      return await this.findActiveCart(userId, true);
    });

    await this.cartProductService.updateCartProduct(updateCart, cart);

    return cart;
  }
}
