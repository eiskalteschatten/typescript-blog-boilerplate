import fastifyPassport from '@fastify/passport';

export const fastifyPreValidationJwt = {
  preValidation: fastifyPassport.authenticate('local'),
};
