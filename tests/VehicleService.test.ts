import { getVehicleServiceExterno } from '../src/service/VehicleService';
import axios from 'axios';
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

beforeEach(() => {
  jest.clearAllMocks();
});

test('should return a Vehicle from api', async () => {
  mockedAxios.get.mockResolvedValueOnce({ data: { name: 'name_test' } });

  const result = await getVehicleServiceExterno('1');

  expect(result.name).toBe('name_test');
});
