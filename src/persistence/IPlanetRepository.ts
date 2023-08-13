import { Planet } from '../model/Planet';

export interface IPlanetRepository {
  Add(req: Planet): Promise<string>;
  Get(id: string): Promise<Planet>;
}
