import { Vehicle } from '../model/Vehicle';
import { IVehicleRepository } from '../persistence/IVehicleRepository';
import { getVehicleServiceExterno } from '../service/VehicleService';

export class VehicleUC {
  /**
   *
   */
  constructor(private iVehicleRespository: IVehicleRepository) {
    //super();
  }

  async getExterno(id: string): Promise<Vehicle> {
    return await getVehicleServiceExterno(id);
  }

  async get(id: string): Promise<Vehicle> {
    return await this.iVehicleRespository.Get(id);
  }

  async add(item: Vehicle): Promise<string> {
    return await this.iVehicleRespository.Add(item);
  }
}
