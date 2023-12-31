import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartProductEntity } from './entities/cart-product.entity';
import { DeleteResult, Repository } from 'typeorm';
import { CartEntity } from '../cart/entities/cart.entity';
import { InsertCartDTO } from '../cart/dtos/insertCart.dto';
import { ProductService } from '../product/product.service';
import { UpdateCartDTO } from '../cart/dtos/updateCart.dto';

@Injectable()
export class CartProductService {
  constructor(
    @InjectRepository(CartProductEntity)
    private readonly cartProductRepository: Repository<CartProductEntity>,
    private readonly productService: ProductService,
  ) {}

  async verifyProductInCart(
    productId: number,
    cartId: number,
  ): Promise<CartProductEntity> {
    await this.productService.findProductById(productId);

    const cartProduct = await this.cartProductRepository.findOne({
      where: {
        productId,
        cartId,
      },
    });

    if (!cartProduct) {
      throw new NotFoundException('Product not found in cart');
    }

    return cartProduct;
  }

  async createCartProduct(
    insertCart: InsertCartDTO,
    cartId: number,
  ): Promise<CartProductEntity> {
    return this.cartProductRepository.save({
      productId: insertCart.productId,
      amount: insertCart.amount,
      cartId: cartId,
    });
  }

  async inserProduct(
    insertCart: InsertCartDTO,
    cart: CartEntity,
  ): Promise<CartProductEntity> {
    await this.productService.findProductById(insertCart.productId);

    const cartProduct = await this.verifyProductInCart(
      insertCart.productId,
      cart.id,
    ).catch(() => undefined);

    if (!cartProduct) {
      return this.createCartProduct(insertCart, cart.id);
    }

    return this.cartProductRepository.save({
      ...cartProduct,
      amount: cartProduct.amount + insertCart.amount,
    });
  }

  async deleteProductCart(
    productId: number,
    cartId: number,
  ): Promise<DeleteResult> {
    await this.productService.findProductById(productId);

    return this.cartProductRepository.delete({ productId, cartId });
  }

  async updateCartProduct(
    updateCart: UpdateCartDTO,
    cart: CartEntity,
  ): Promise<CartProductEntity> {
    await this.productService.findProductById(updateCart.productId);

    const cartProduct = await this.verifyProductInCart(
      updateCart.productId,
      cart.id,
    );

    return this.cartProductRepository.save({
      ...cartProduct,
      amount: updateCart.amount,
    });
  }
}
