import { FastifyRequest } from 'fastify';

import { FastifyInstanceWithView, FastifyReplyWithView } from '~/interfaces/fastify';

export default async (app: FastifyInstanceWithView) => {
  app.get('/', (req: FastifyRequest, reply: FastifyReplyWithView) => {
    if (req.isAuthenticated()) {
      reply.redirect('/');
      return;
    }

    reply.auth('login.ejs', {
      title: 'Login',
    });
  });
};
