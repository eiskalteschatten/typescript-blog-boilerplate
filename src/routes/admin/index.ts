import { FastifyReply, FastifyRequest } from 'fastify';

import { FastifyInstanceWithView, FastifyReplyWithView } from '~/interfaces/fastify';
import { fastifyPreValidationLocalAdmin } from '~/auth/fastify';

export default async (app: FastifyInstanceWithView) => {
  app.get('/', fastifyPreValidationLocalAdmin, (req: FastifyRequest, reply: FastifyReplyWithView) => {
    reply.admin('home.ejs');
  });

  app.get('/login', (req: FastifyRequest, reply: FastifyReplyWithView) => {
    if (req.isAuthenticated()) {
      reply.redirect('/admin');
      return;
    }

    reply.admin('login.ejs');
  });

  app.post('/logout', (req: FastifyRequest, reply: FastifyReply) => {
    req.logout();
    reply.redirect('/admin/login');
  });
};
