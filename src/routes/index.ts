import { FastifyReply, FastifyRequest } from 'fastify';

import { FastifyInstanceWithView, FastifyReplyWithView } from '~/interfaces/fastify';

export default async (app: FastifyInstanceWithView) => {
  app.get('/', (req: FastifyRequest, reply: FastifyReplyWithView) => {
    reply.blog('home.ejs');
  });

  app.post('/logout', (req: FastifyRequest, reply: FastifyReply) => {
    req.logout();
    reply.redirect('/login');
  });
};
