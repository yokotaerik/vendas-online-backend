import { ReturnCityDto } from 'src/city/dtos/returnCity.dto';
import { AddressEntity } from '../entities/address.entity';

export class ReturnAddressDto {
  complement: string;
  numberAdress: number;
  cep: string;
  city?: ReturnCityDto;

  constructor(address: AddressEntity) {
    this.complement = address.complement;
    this.numberAdress = address.numberAddress;
    this.cep = address.cep;
    this.city = address.city ? new ReturnCityDto(address.city) : undefined;
  }
}
