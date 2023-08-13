import { Planet } from '../model/Planet';
import { IPlanetRepository } from '../persistence/IPlanetRepository';
import { getPlanetServiceExterno } from '../service/PlanetService';

export class PlanetUC {
  /**
   *
   */
  constructor(private iPlanetRespository: IPlanetRepository) {
    //super();
  }

  async getExterno(id: string): Promise<Planet> {
    return await getPlanetServiceExterno(id);
  }

  async get(id: string): Promise<Planet> {
    return await this.iPlanetRespository.Get(id);
  }

  async add(item: Planet): Promise<string> {
    return await this.iPlanetRespository.Add(item);
  }
}
