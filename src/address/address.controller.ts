import {
  Body,
  Controller,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dtos/CreateAddress.dto';
import { AddressEntity } from './entities/address.entity';

@Controller('address')
export class AddressController {
  constructor(private readonly adressService: AddressService) {}

  @Post('/:userId')
  @UsePipes(ValidationPipe)
  async createAdress(
    @Body() createAdressDTO: CreateAddressDto,
    @Param('userId') userId: number,
  ): Promise<AddressEntity> {
    return await this.adressService.createAddress(createAdressDTO, userId);
  }
}
