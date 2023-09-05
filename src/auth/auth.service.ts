import { Injectable, NotFoundException } from '@nestjs/common';
import { compare } from 'bcrypt';
import UserEntity from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { LoginDto } from './dto/login.dto';
import { ReturnUserDto } from '../user/dtos/returnUser.dto';
import { JwtService } from '@nestjs/jwt';
import { ReturnLogin } from './dto/returnLogin.dto';
import { LoginPayload } from './dto/loginPaylod.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto): Promise<ReturnLogin> {
    const user: UserEntity | undefined = await this.userService
      .findUserByEmail(loginDto.email)
      .catch(() => undefined);

    const isMatch = await compare(loginDto.password, user?.password || '');

    if (!user || !isMatch) {
      throw new NotFoundException('Email or passord invalid');
    }

    return {
      accessToken: await this.jwtService.signAsync({
        ...new LoginPayload(user),
      }),
      user: new ReturnUserDto(user),
    };
  }
}
