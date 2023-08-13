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
      message: 'nuevo registro de token',
      token: result,
    }),
  };
};

// const eventSchema = {
//   type: 'object',
//   properties: {
//     body: {
//       type: 'object',
//       properties: {
//         card_number: {
//           type: 'string',
//           minLength: 12,
//           maxLength: 19,
//           pattern: '\\d+',
//         },
//         expiration_month: { type: 'integer', minimum: 1, maximum: 12 },
//         expiration_year: { type: 'integer', minimum: 2023, maximum: 2028 }, //Mas cinco años
//         cvv: { type: 'string', minLength: 3, maxLength: 4, pattern: '\\d+' },
//         email: { type: 'string' },
//       },
//       required: ['card_number'],
//     },
//   },
// };

module.exports = {
  addPlanet: middy(addPlanet)
    //.use(idTokenMiddleware())
    .use(jsonBodyParser())
    //.use(validator({ eventSchema }))
    .use(httpErrorHandler()),
};
