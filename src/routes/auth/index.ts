import { FastifyReply, FastifyRequest } from 'fastify';

import { FastifyInstanceWithView } from '~/interfaces/fastify';

export default async (app: FastifyInstanceWithView) => {
  app.post('/logout', (req: FastifyRequest, reply: FastifyReply) => {
    req.logout();
    reply.redirect('/login');
  });
};
