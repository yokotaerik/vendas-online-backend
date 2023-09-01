import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDTO } from './dtos/createUser.dto';
import { UserService } from './user.service';
import UserEntity from './interfaces/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUsers(): Promise<UserEntity[]> {
    return this.userService.getAllUsers();
  }
  @Post()
  async createUsers(@Body() createUser: CreateUserDTO): Promise<UserEntity> {
    return this.userService.createUser(createUser);
  }
}
