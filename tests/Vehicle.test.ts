import { getVehicleServiceExterno } from '../src/service/VehicleService';
import { VehicleRepositoryDynamo } from '../src/persistence/dynamo/VehicleRepositoryDynamo';
import { IVehicleRepository } from '../src/persistence/IVehicleRepository';
import { VehicleUC } from '../src/useCase/VehicleUC';
import { Vehicle } from '../src/model/Vehicle';

jest.mock('../src/service/VehicleService');

beforeEach(() => {
  jest.clearAllMocks();
});

test('should return a Vehicle from api', async () => {
  (getVehicleServiceExterno as jest.Mock).mockReturnValue({
    name: 'name_test',
  });

  const obj = new VehicleUC(new VehicleRepositoryDynamo());
  const result = await obj.getExterno('1');

  expect(result.name).toBe('name_test');
});

//mock interface
const mockedImplementation: IVehicleRepository = {
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

test('should return a Vehicle from aws', async () => {
  const obj = new VehicleUC(mockedImplementation);
  const result = await obj.get('1');

  expect(result.name).toBe('name-test');
});

test('should insert a Vehicle to aws and return a string id', async () => {
  const obj = new VehicleUC(mockedImplementation);
  const result = await obj.add({
    cargo_capacity: '50000',
    consumables: '2 months',
    cost_in_credits: '150000',
    created: '2014-12-10T15:36:25.724000Z',
    crew: '46',
    edited: '2014-12-10T15:36:25.724000Z',
    length: '36.8',
    manufacturer: 'Corellia Mining Corporation',
    max_atmosphering_speed: '30',
    model: 'Digger Crawler',
    name: 'Sand Crawler',
    passengers: '30',
    url: 'https://swapi.py4e.com/api/vehicles/4/',
    vehicle_class: 'wheeled',
  } as Vehicle);

  expect(result).toBe('5e83f08a-218c-4094-be4d-0beb85211ade');
});
