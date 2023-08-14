import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
// import middy from '@middy/core';
// import httpErrorHandler from '@middy/http-error-handler';
// import { idTokenMiddleware } from './middleware/idTokenMiddleware';
import { PlanetUC } from './useCase/PlanetUC';
import { PlanetRepositoryDynamo } from './persistence/dynamo/PlanetRepositoryDynamo';
import { transformPropertiesPlanet } from './util/PropertiesMaps';

class Id {
  id: string = '';
}

export const getPlanetExterno = async (
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
  try {
    const { id } = event.pathParameters as unknown as Id;

    const uc = new PlanetUC(new PlanetRepositoryDynamo());
    const result = transformPropertiesPlanet(await uc.getExterno(id));

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
  } catch (error) {
    return {
      statusCode: 404,
      body: 'No se encontro el planeta',
    };
  }
};

module.exports = {
  getPlanetExterno: getPlanetExterno,
  //middy(getToken).use(idTokenMiddleware()).use(httpErrorHandler()),
};
