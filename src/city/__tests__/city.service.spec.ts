import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CityEntity } from '../entities/city.entity';
import { CityService } from '../city.service';
import { CacheService } from '../../cache/cache.service';
import { cityMock } from '../__mocks__/city.mock';
import { stateMock } from '../../state/__mocks__/state.mock';

describe('CityService', () => {
  let service: CityService;
  let cityRepository: Repository<CityEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CityService,
        {
          provide: CacheService,
          useValue: {
            getCache: jest.fn().mockResolvedValue([cityMock]),
          },
        },
        {
          provide: getRepositoryToken(CityEntity),
          useValue: {
            findOne: jest.fn().mockResolvedValue(cityMock),
          },
        },
      ],
    }).compile();

    service = module.get<CityService>(CityService);
    cityRepository = module.get<Repository<CityEntity>>(
      getRepositoryToken(CityEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(cityRepository).toBeDefined();
  });

  it('should return findOne City', async () => {
    const city = await service.findCityById(cityMock.id);

    expect(city).toEqual(cityMock);
  });

  it('should return a error on findOne City', async () => {
    jest.spyOn(cityRepository, 'findOne').mockRejectedValueOnce(new Error());

    expect(service.findCityById(cityMock.id)).rejects.toThrowError();
  });

  it('should get all cities', async () => {
    const city = await service.getAllCitiesById(stateMock.id);

    expect(city).toEqual([cityMock]);
  });
});
