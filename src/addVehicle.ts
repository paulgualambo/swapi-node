import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import middy from '@middy/core';
import jsonBodyParser from '@middy/http-json-body-parser';
import httpErrorHandler from '@middy/http-error-handler';
import { VehicleUC } from './useCase/VehicleUC';
import { VehicleRepositoryDynamo } from './persistence/dynamo/VehicleRepositoryDynamo';
import { Vehicle } from './model/Vehicle';

const addVehicle = async (
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
  const uc = new VehicleUC(new VehicleRepositoryDynamo());
  const result = await uc.add(<Vehicle>(<unknown>event.body));

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'nuevo registro de vehicle',
      token: result,
    }),
  };
};

module.exports = {
  addVehicle: middy(addVehicle)
    //.use(idTokenMiddleware())
    .use(jsonBodyParser())
    //.use(validator({ eventSchema }))
    .use(httpErrorHandler()),
};
