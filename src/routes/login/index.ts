import { FastifyRequest } from 'fastify';

import { FastifyInstanceWithView, FastifyReplyWithView } from '~/interfaces/fastify';

export default async (app: FastifyInstanceWithView) => {
  app.get('/login', (req: FastifyRequest, reply: FastifyReplyWithView) => {
    reply.blog('login.ejs');
  });
};
