import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dtos/CreateAddress.dto';
import { AddressEntity } from './entities/address.entity';
import { Roles } from 'src/decorator/roles.decorator';
import { UserType } from 'src/user/enum/user-type.enum';
import { UserId } from 'src/decorator/user-id.decorator';

@Controller('address')
export class AddressController {
  constructor(private readonly adressService: AddressService) {}

  @Roles(UserType.User)
  @Post()
  @UsePipes(ValidationPipe)
  async createAdress(
    @Body() createAdressDTO: CreateAddressDto,
    @UserId() userId: number,
  ): Promise<AddressEntity> {
    return await this.adressService.createAddress(createAdressDTO, userId);
  }
}
