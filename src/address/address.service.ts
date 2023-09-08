import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddressEntity } from './entities/address.entity';
import { Repository } from 'typeorm';
import { CreateAddressDto } from './dtos/CreateAddress.dto';
import { UserService } from '../user/user.service';
import { CityService } from '../city/city.service';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(AddressEntity)
    private readonly addressRepository: Repository<AddressEntity>,
    private readonly userService: UserService,
    private readonly cityService: CityService,
  ) {}

  async createAddress(createAddress: CreateAddressDto, userId: number) {
    const user = await this.userService.findUserById(userId);

    const city = await this.cityService.findCityById(createAddress.cityId);

    return this.addressRepository.save({
      ...createAddress,
      userId: user.id,
      cityId: city.id,
    });
  }

  async findAddressByUserId(userId: number): Promise<AddressEntity[]> {
    const adresses = await this.addressRepository.find({
      where: {
        userId,
      },
      relations: {
        city: {
          state: true,
        },
      },
    });

    if (!adresses) {
      throw new NotFoundException(`addresses not found`);
    }

    return adresses;
  }
}
