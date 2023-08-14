import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
// import middy from '@middy/core';
// import httpErrorHandler from '@middy/http-error-handler';
// import { idTokenMiddleware } from './middleware/idTokenMiddleware';
import { VehicleUC } from './useCase/VehicleUC';
import { VehicleRepositoryDynamo } from './persistence/dynamo/VehicleRepositoryDynamo';

class Id {
  id: string = '';
}

export const getVehicle = async (
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
  const { id } = event.pathParameters as unknown as Id;

  const uc = new VehicleUC(new VehicleRepositoryDynamo());
  const result = await uc.get(id);

  if (!result) {
    return {
      statusCode: 200,
      body: JSON.stringify({
        exist: false,
        message: 'Vehicle no existe',
      }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      result,
    }),
  };
};

module.exports = {
  getVehicle: getVehicle,
  //middy(getToken).use(idTokenMiddleware()).use(httpErrorHandler()),
};
