import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import middy from '@middy/core';
import jsonBodyParser from '@middy/http-json-body-parser';
import httpErrorHandler from '@middy/http-error-handler';
import { PlanetUC } from './useCase/PlanetUC';
import { PlanetRepositoryDynamo } from './persistence/dynamo/PlanetRepositoryDynamo';
import { Planet } from './model/Planet';

const addPlanet = async (
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
  const uc = new PlanetUC(new PlanetRepositoryDynamo());
  const result = await uc.add(<Planet>(<unknown>event.body));

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'nuevo registro de planet',
      token: result,
    }),
  };
};

module.exports = {
  addPlanet: middy(addPlanet)
    //.use(idTokenMiddleware())
    .use(jsonBodyParser())
    //.use(validator({ eventSchema }))
    .use(httpErrorHandler()),
};
