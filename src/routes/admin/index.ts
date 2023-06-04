import { FastifyRequest } from 'fastify';

import { FastifyInstanceWithView, FastifyReplyWithView } from '~/interfaces/fastify';
import { fastifyPreValidationLocalAdmin } from '~/auth/fastify';

export default async (app: FastifyInstanceWithView) => {
  app.get('/', fastifyPreValidationLocalAdmin, (req: FastifyRequest, reply: FastifyReplyWithView) => {
    reply.admin('home.ejs');
  });
};
