import { categoryMock } from '../../category/__mocks__/category.mock';
import { ProductEntity } from '../entities/product.entity';

export const ProductMock: ProductEntity = {
  id: 1,
  categoryId: categoryMock.id,
  name: 'Caloi 29',
  price: 9999,
  image: 'link da imagem',
  createdAt: new Date(),
  updatedAt: new Date(),
};
