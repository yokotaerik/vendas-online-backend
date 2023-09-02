import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddressEntity } from './entities/adress.entity';
import { Repository } from 'typeorm';
import { CreateAddressDto } from './dtos/CreateAddress.dto';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(AddressEntity)
    private readonly addressRepository: Repository<AddressEntity>,
  ) {}

  async createAddress(createAddress: CreateAddressDto, userId: number) {
    return this.addressRepository.save({
      ...createAddress,
      userId,
    });
  }
}
