import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
// import middy from '@middy/core';
// import httpErrorHandler from '@middy/http-error-handler';
// import { idTokenMiddleware } from './middleware/idTokenMiddleware';
import { PlanetUC } from './useCase/PlanetUC';
import { PlanetRepositoryDynamo } from './persistence/dynamo/PlanetRepositoryDynamo';

class Id {
  id: string = '';
}

export const getPlanet = async (
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
  const { id } = event.pathParameters as unknown as Id;

  const uc = new PlanetUC(new PlanetRepositoryDynamo());
  const result = await uc.get(id);

  if (!result) {
    return {
      statusCode: 200,
      body: JSON.stringify({
        exist: false,
        message: 'Planet no existe',
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
  getPlanet: getPlanet,
  //middy(getToken).use(idTokenMiddleware()).use(httpErrorHandler()),
};
