import fastifyPassport from '@fastify/passport';

export const fastifyPreValidationLocal = {
  preValidation: fastifyPassport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/auth/login',
  }),
};

export const fastifyPreValidationLocalAdmin = {
  preValidation: fastifyPassport.authenticate('localAdmin', {
    successRedirect: '/admin',
    failureRedirect: '/auth/login',
  }),
};
