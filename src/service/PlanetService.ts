/* eslint-disable no-useless-catch */
import axios from 'axios';

import * as dotenv from 'dotenv';
import { Planet } from '../model/Planet';

// Load environment variables from .env file
dotenv.config();

//
export const getPlanetServiceExterno = async (id: string): Promise<Planet> => {
  try {
    const url = `${process.env.SWAPI_URL}planets/${id}` || '';

    const data = await axios
      .get<Planet>(url)
      .then((response) => {
        // Handle successful response
        return response.data;
        //console.log('Data:', response.data);
      })
      .catch(() => {
        throw new Error('Planet no encontrado');
      });

    return data;
  } catch (e) {
    throw e;
  }
};
