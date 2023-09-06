import { cityMock } from '../../city/__mocks__/city.mock';
import { AddressEntity } from '../entities/address.entity';

export const AddressMock: AddressEntity = {
  createdAt: new Date(),
  id: 432432,
  userId: 1,
  complement: 'complementMock',
  numberAddress: 1,
  cep: '123',
  cityId: cityMock.id,
  updatedAt: new Date(),
};
