import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../../user/user.service';
import { userEntityMock } from '../../user/__mocks__/user.mock';
import { AuthService } from '../auth.service';
import { jwtMock } from '../__mocks__/jwt.mock';
import { LoginDtoMock } from '../__mocks__/loginDto.mock';
import { ReturnUserDto } from '../../user/dtos/returnUser.dto';
import { LoginPayload } from '../dto/loginPaylod.dto';

describe('AuthService', () => {
  let service: AuthService;
  let userService: UserService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: {
            findUserByEmail: jest.fn().mockResolvedValue(userEntityMock),
          },
        },
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn().mockResolvedValue(jwtMock),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(userService).toBeDefined();
    expect(jwtService).toBeDefined();
  });

  it('should login user', async () => {
    const user = await service.login(LoginDtoMock);

    expect(user).toEqual({
      accessToken: await jwtService.signAsync({
        ...new LoginPayload(userEntityMock),
      }),
      user: new ReturnUserDto(userEntityMock),
    });
  });

  it('should return user if password invalid and email valid', async () => {
    expect(
      service.login({ ...LoginDtoMock, password: '4324' }),
    ).rejects.toThrowError();
  });

  it('should return user if email not exist', async () => {
    jest.spyOn(userService, 'findUserByEmail').mockResolvedValue(undefined);

    expect(service.login(LoginDtoMock)).rejects.toThrowError();
  });

  it('should return error in UserService', async () => {
    jest.spyOn(userService, 'findUserByEmail').mockRejectedValue(new Error());

    expect(service.login(LoginDtoMock)).rejects.toThrowError();
  });
});
