import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartEntity } from './entities/cart.entity';
import { Repository } from 'typeorm';
import { InsertCartDTO } from './dtos/insertCart.dto';
import { CartProductService } from 'src/cart-product/cart-product.service';

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
    const cart = await this.findActiveCart(userId).catch(async () => {
      return this.createCart(userId);
    });

    await this.cartProductService.inserProduct(insertCartDTO, cart);

    return this.findActiveCart(userId, true);
  }
}
