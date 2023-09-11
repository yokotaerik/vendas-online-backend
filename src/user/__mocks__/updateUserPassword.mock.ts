import { UpdatePasswordDTO } from '../dtos/updatePassword.dto';

export const UpdateUserPasswordMock: UpdatePasswordDTO = {
  oldPassword: '123',
  newPassword: 'senha',
};

export const UpdateUserPasswordInvalidMock: UpdatePasswordDTO = {
  oldPassword: 'senhaErrada',
  newPassword: 'senha',
};
