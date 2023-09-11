import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { categoryMock } from '../../category/__mocks__/category.mock';
import { Repository } from 'typeorm';
import { ProductEntity } from '../entities/product.entity';
import { ProductService } from '../product.service';
import { CategoryService } from '../../category/category.service.';
import { ProductMock } from '../__mocks__/product.mock';
import { CreateProductMock } from '../__mocks__/createProduct.mock';
import { ReturnDeleteMock } from '../__mocks__/returnDelete.mock';
import { updateProductMock } from '../__mocks__/updateProduct.mock';

describe('ProductService', () => {
  let service: ProductService;
  let productRepository: Repository<ProductEntity>;
  let categoryService: CategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: CategoryService,
          useValue: {
            findCategoryById: jest.fn().mockResolvedValue(categoryMock),
          },
        },
        {
          provide: getRepositoryToken(ProductEntity),
          useValue: {
            find: jest.fn().mockResolvedValue([ProductMock]),
            findOne: jest.fn().mockResolvedValue(ProductMock),
            save: jest.fn().mockResolvedValue(ProductMock),
            delete: jest.fn().mockResolvedValue(ReturnDeleteMock),
          },
        },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
    categoryService = module.get<CategoryService>(CategoryService);
    productRepository = module.get<Repository<ProductEntity>>(
      getRepositoryToken(ProductEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(categoryService).toBeDefined();
    expect(productRepository).toBeDefined();
  });

  it('should return all products', async () => {
    const products = await service.findAllProducts();
    expect(products).toEqual([ProductMock]);
  });
  it('should return error if products empty', async () => {
    jest.spyOn(productRepository, 'find').mockResolvedValue([]);
    expect(service.findAllProducts()).rejects.toThrowError();
  });
  it('should return error in exception', async () => {
    jest.spyOn(productRepository, 'find').mockRejectedValue(new Error());

    expect(service.findAllProducts()).rejects.toThrowError();
  });

  it('should return product after insert in DB', async () => {
    const product = await service.createProduct(CreateProductMock);

    expect(product).toEqual(ProductMock);
  });

  it('should return product after insert in DB', async () => {
    jest
      .spyOn(categoryService, 'findCategoryById')
      .mockRejectedValue(new Error());

    expect(service.createProduct(CreateProductMock)).rejects.toThrowError();
  });

  it('should return product by id', async () => {
    const product = await service.findProductById(ProductMock.id);

    expect(product).toEqual(ProductMock);
  });

  it('should return error in find by id', async () => {
    jest.spyOn(productRepository, 'findOne').mockRejectedValue(new Error());

    expect(service.findProductById(ProductMock.id)).rejects.toThrowError();
  });

  it('should delete a product by id', async () => {
    const product = await service.deleteProduct(ProductMock.id);

    expect(product).toEqual(ReturnDeleteMock);
  });

  it('should throw a error on delete a product by id', async () => {
    jest.spyOn(productRepository, 'delete').mockRejectedValue(new Error());

    expect(service.deleteProduct(ProductMock.id)).rejects.toThrowError();
  });

  it('should update a product by id', async () => {
    const product = await service.updateProduct(
      updateProductMock,
      ProductMock.id,
    );

    expect(product).toEqual(ProductMock);
  });

  // it('should return error on update product by id because its not found', async () => {
  //   jest
  //     .spyOn(categoryService, 'findCategoryById')
  //     .mockRejectedValue(new Error());

  //   expect(
  //     service.updateProduct(updateProductMock, ProductMock.id),
  //   ).rejects.toThrowError();
  // });

  it('should return error on save update on DB', async () => {
    jest.spyOn(productRepository, 'save').mockRejectedValue(new Error());

    expect(
      service.updateProduct(updateProductMock, ProductMock.id),
    ).rejects.toThrowError();
  });
});
