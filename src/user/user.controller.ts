import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDTO } from './dtos/createUser.dto';

@Controller('user')
export class UserController {
  @Get()
  async GetAllUsers() {
    return JSON.stringify({ test: 'abc' });
  }
  @Post()
  async CreateUsers(@Body() createUser: CreateUserDTO) {
    return {
      ...createUser,
      password: undefined,
    };
  }
}
