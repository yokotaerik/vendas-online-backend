import UserEntity from '../entities/user.entity';

export const userEntityMock: UserEntity = {
  name: 'erik',
  email: 'erik@gmail.com',
  cpf: '123456789-99',
  typeUser: 1,
  id: 1,
  phone: '(99)99999999',
  password: '123',
  createdAt: new Date(),
  updatedAt: new Date(),
};
