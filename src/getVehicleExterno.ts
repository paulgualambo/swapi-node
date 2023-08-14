import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
// import middy from '@middy/core';
// import httpErrorHandler from '@middy/http-error-handler';
// import { idTokenMiddleware } from './middleware/idTokenMiddleware';
import { VehicleUC } from './useCase/VehicleUC';
import { VehicleRepositoryDynamo } from './persistence/dynamo/VehicleRepositoryDynamo';
import { transformPropertiesVehicle } from './util/PropertiesMaps';

class Id {
  id: string = '';
}

export const getVehicleExterno = async (
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
  const { id } = event.pathParameters as unknown as Id;

  const uc = new VehicleUC(new VehicleRepositoryDynamo());
  const result = transformPropertiesVehicle(await uc.getExterno(id));

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
  getVehicleExterno: getVehicleExterno,
  //middy(getToken).use(idTokenMiddleware()).use(httpErrorHandler()),
};
