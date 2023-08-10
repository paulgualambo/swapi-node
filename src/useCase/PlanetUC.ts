import { Planet } from '../model/Planet';
import { getPlanetService } from '../service/PlanetService';

export class PlanetUC {
  /**
   *
   */
  constructor() {
    //super();
  }

  async get(id: string): Promise<Planet> {
    return await getPlanetService(id);
  }
}
