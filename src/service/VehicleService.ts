/* eslint-disable no-useless-catch */
import axios from 'axios';

import * as dotenv from 'dotenv';
import { Vehicle } from '../model/Vehicle';

// Load environment variables from .env file
dotenv.config();

//
export const getVehicleServiceExterno = async (
  id: string,
): Promise<Vehicle> => {
  try {
    const url = `${process.env.SWAPI_URL}vehicles/${id}` || '';
    const { data } = await axios.get<Vehicle>(url, {
      headers: {
        Accept: 'application/json',
      },
    });
    return data;
  } catch (e) {
    throw e;
  }
};
