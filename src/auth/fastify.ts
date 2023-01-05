import fastifyPassport from '@fastify/passport';

const getFastifyPreValidationLocal = (prefix = '') => ({
  preValidation: fastifyPassport.authenticate('local', {
    successRedirect: `${prefix}/`,
    failureRedirect: `${prefix}/login`,
  }),
});

export const fastifyPreValidationLocal = getFastifyPreValidationLocal();
export const fastifyPreValidationLocalAdmin = getFastifyPreValidationLocal('admin');
