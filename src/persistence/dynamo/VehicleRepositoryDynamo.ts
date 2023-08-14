import date from 'date-and-time';

import { v4 as uuidv4 } from 'uuid';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient,
  PutCommand,
  GetCommand,
} from '@aws-sdk/lib-dynamodb';

import { Vehicle } from '../../model/Vehicle';
import { IVehicleRepository } from '../IVehicleRepository';

export class VehicleRepositoryDynamo implements IVehicleRepository {
  private _nameTable: string = 'VehicleTable';

  async Add(req: Vehicle): Promise<string> {
    const client = new DynamoDBClient({});
    const ddbDocClient = DynamoDBDocumentClient.from(client);

    const id = uuidv4();

    const now = new Date();
    const format = 'YYYY/MM/DD HH:mm:ss';
    const createdAt = date.format(now, format);

    //const newItem = [id, createdAt, ...req];
    req['id'] = id;
    req['createdAt'] = createdAt;

    await ddbDocClient.send(
      new PutCommand({
        TableName: this._nameTable,
        Item: req,
      }),
    );

    return id;
  }

  async Get(id: string): Promise<Vehicle> {
    const client = new DynamoDBClient({});
    const ddbDocClient = DynamoDBDocumentClient.from(client);

    const result = await ddbDocClient.send(
      new GetCommand({
        TableName: this._nameTable,
        Key: {
          id,
        },
      }),
    );

    return result.Item as Vehicle;
  }
}
