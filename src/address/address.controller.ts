import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dtos/CreateAddress.dto';
import { AddressEntity } from './entities/address.entity';
import { Roles } from '../decorator/roles.decorator';
import { UserType } from '../user/enum/user-type.enum';
import { UserId } from '../decorator/user-id.decorator';
import { ReturnAddressDto } from './dtos/returnAddress.dto';

@Roles(UserType.User, UserType.Admin)
@Controller('address')
export class AddressController {
  constructor(private readonly adressService: AddressService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async createAdress(
    @Body() createAdressDTO: CreateAddressDto,
    @UserId() userId: number,
  ): Promise<AddressEntity> {
    return await this.adressService.createAddress(createAdressDTO, userId);
  }

  @Get('/getAddresses')
  @UsePipes(ValidationPipe)
  async findAddressByUserId(
    @UserId() userId: number,
  ): Promise<ReturnAddressDto[]> {
    return (await this.adressService.findAddressByUserId(userId)).map(
      (address) => new ReturnAddressDto(address),
    );
  }
}
