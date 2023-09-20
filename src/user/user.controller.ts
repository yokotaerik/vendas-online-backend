import {
  Body,
  Controller,
  Get,
  Patch,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDTO } from './dtos/createUser.dto';
import { UserService } from './user.service';
import UserEntity from './entities/user.entity';
import { ReturnUserDto } from './dtos/returnUser.dto';
import { UpdatePasswordDTO } from './dtos/updatePassword.dto';
import { UserId } from '../decorator/user-id.decorator';
import { Roles } from '../decorator/roles.decorator';
import { UserType } from './enum/user-type.enum';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UsePipes(ValidationPipe)
  @Post()
  async createUsers(@Body() createUser: CreateUserDTO): Promise<UserEntity> {
    return this.userService.createUser(createUser);
  }

  @Roles(UserType.Admin)
  @Get()
  async getAllUsers(): Promise<ReturnUserDto[]> {
    return (await this.userService.getAllUsers()).map(
      (UserEntity) => new ReturnUserDto(UserEntity),
    );
  }

  @Roles(UserType.Admin)
  @Get('/:userId')
  async getUserById(@Param('userId') userId: number): Promise<ReturnUserDto> {
    return new ReturnUserDto(
      await this.userService.getUserIdUsingRelations(userId),
    );
  }

  @Roles(UserType.User, UserType.Admin)
  @Patch()
  @UsePipes(ValidationPipe)
  async updateUserPassword(
    @Body() updatePasswordDTO: UpdatePasswordDTO,
    @UserId() userId: number,
  ): Promise<ReturnUserDto> {
    const user = await this.userService.updateUserPassword(
      updatePasswordDTO,
      userId,
    );
    return new ReturnUserDto(user);
  }

  // @Get('/:userId')
  // async getUserById(@Param('userId') userId: number): Promise<UserEntity> {
  //   return await this.userService.getUserIdUsingRelations(userId);
  // }
}
