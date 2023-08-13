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
    const { data } = await axios.get<Planet>(url, {
      headers: {
        Accept: 'application/json',
      },
    });
    return data;
  } catch (e) {
    throw e;
  }
};
