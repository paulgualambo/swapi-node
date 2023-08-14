import { Vehicle } from '../model/Vehicle';

export interface IVehicleRepository {
  Add(req: Vehicle): Promise<string>;
  Get(id: string): Promise<Vehicle>;
}
