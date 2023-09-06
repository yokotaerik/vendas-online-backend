import { userEntityMock } from '../../user/__mocks__/user.mock';
import { LoginDto } from '../dto/login.dto';

export const LoginDtoMock: LoginDto = {
  email: userEntityMock.email,
  password: '123',
};
