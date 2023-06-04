import fastifyPassport from '@fastify/passport';

export const fastifyPreValidationLocal = {
  preValidation: fastifyPassport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
  }),
};

export const fastifyPreValidationLocalAdmin = {
  preValidation: fastifyPassport.authenticate('localAdmin', {
    successRedirect: '/admin',
    failureRedirect: '/login',
  }),
};
