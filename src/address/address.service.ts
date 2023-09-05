import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddressEntity } from './entities/address.entity';
import { Repository } from 'typeorm';
import { CreateAddressDto } from './dtos/CreateAddress.dto';
import { UserService } from 'src/user/user.service';
import { CityService } from 'src/city/city.service';

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
}
