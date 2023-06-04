import { FastifyReply, FastifyRequest } from 'fastify';

import { FastifyInstanceWithView, FastifyReplyWithView } from '~/interfaces/fastify';

export default async (app: FastifyInstanceWithView) => {
  app.get('/', (req: FastifyRequest, reply: FastifyReply) => {
    reply.redirect('/auth/login');
  });

  app.get('/login', (req: FastifyRequest, reply: FastifyReplyWithView) => {
    if (req.isAuthenticated()) {
      reply.redirect('/');
      return;
    }

    reply.auth('login.ejs', {
      title: 'Login',
    });
  });

  app.get('/register', (req: FastifyRequest, reply: FastifyReplyWithView) => {
    if (req.isAuthenticated()) {
      reply.redirect('/');
      return;
    }

    reply.auth('register.ejs', {
      title: 'Create an Account',
    });
  });

  app.post('/logout', (req: FastifyRequest, reply: FastifyReply) => {
    req.logout();
    reply.redirect('/auth/login');
  });
};
