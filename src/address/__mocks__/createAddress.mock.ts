import { cityMock } from '../../city/__mocks__/city.mock';
import { CreateAddressDto } from '../dtos/CreateAddress.dto';
import { AddressMock } from './address.mock';

export const CreateAddressMock: CreateAddressDto = {
  complement: AddressMock.complement,
  numberAddress: AddressMock.numberAddress,
  cep: AddressMock.cep,
  cityId: cityMock.id,
};
