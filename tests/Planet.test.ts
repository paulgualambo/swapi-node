import { getPlanetServiceExterno } from '../src/service/PlanetService';
import { PlanetRepositoryDynamo } from '../src/persistence/dynamo/PlanetRepositoryDynamo';
import { IPlanetRepository } from '../src/persistence/IPlanetRepository';
import { PlanetUC } from '../src/useCase/PlanetUC';
import { Planet } from '../src/model/Planet';

jest.mock('../src/service/PlanetService');

beforeEach(() => {
  jest.clearAllMocks();
});

test('should return a planet from api', async () => {
  (getPlanetServiceExterno as jest.Mock).mockReturnValue({ name: 'name_test' });

  const obj = new PlanetUC(new PlanetRepositoryDynamo());
  const result = await obj.getExterno('1');

  expect(result.name).toBe('name_test');
});

//mock interface
const mockedImplementation: IPlanetRepository = {
  Get: jest.fn().mockImplementation(() =>
    Promise.resolve({
      name: 'name-test',
    }),
  ),
  Add: jest
    .fn()
    .mockImplementation(() =>
      Promise.resolve('5e83f08a-218c-4094-be4d-0beb85211ade'),
    ),
};

test('should return a planet from aws', async () => {
  const obj = new PlanetUC(mockedImplementation);
  const result = await obj.get('1');

  expect(result.name).toBe('name-test');
});

test('should insert a planet to aws and return a string id', async () => {
  const obj = new PlanetUC(mockedImplementation);
  const result = await obj.add({
    climate: 'Arid',
    created: '2014-12-09T13:50:49.641000Z',
    diameter: '10465',
    edited: '2014-12-15T13:48:16.167217Z',
    gravity: '1',
    name: 'Tatooine',
    orbital_period: '304',
    population: '120000',
    rotation_period: '23',
    surface_water: '1',
    terrain: 'Dessert',
    url: 'https://swapi.py4e.com/api/planets/1/',
  } as Planet);

  expect(result).toBe('5e83f08a-218c-4094-be4d-0beb85211ade');
});
