import { PlanetUC } from '../src/useCase/PlanetUC';

//const _NumberFact  = jest.requireActual<typeof NumberFact>("../src/useCase/NumberFact")

beforeEach(() => {
  jest.clearAllMocks();
});

test('should return a planet', async () => {
  const obj = new PlanetUC();
  const result = await obj.get('1');

  console.log(obj);
  console.log(result);
});
