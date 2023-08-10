/* eslint-disable no-useless-catch */
import fetch from 'node-fetch';
import * as dotenv from 'dotenv';
import { Planet } from '../model/Planet';

// Load environment variables from .env file
dotenv.config();

export const getPlanetService = async (id: string): Promise<Planet> => {
  try {
    const url = `${process.env.SWAPI_URL}/planets/${id}` || '';
    const response = await fetch(url, {
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await (<Planet>(<unknown>response.json()));
    return data;
  } catch (e) {
    throw e;
  }
};
