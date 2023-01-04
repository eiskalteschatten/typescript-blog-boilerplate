import fastifyPassport from '@fastify/passport';

export const fastifyPreValidationJwt = {
  preValidation: fastifyPassport.authenticate('jwt', { session: false }),
};

export const fastifyPreValidationRefreshToken = {
  preValidation: fastifyPassport.authenticate('jwt-refresh-token', { session: false }),
};
