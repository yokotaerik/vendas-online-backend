import { stateMock } from '../../state/__mocks__/state.mock';
import { CityEntity } from '../entities/city.entity';

export const cityMock: CityEntity = {
  createdAt: new Date(),
  id: 1,
  name: 'cityNameMock',
  updatedAt: new Date(),
  stateId: stateMock.id,
};
