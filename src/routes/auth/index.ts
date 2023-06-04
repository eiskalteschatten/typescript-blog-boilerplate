import { FastifyReply, FastifyRequest } from 'fastify';

import { FastifyInstanceWithView, FastifyReplyWithView } from '~/interfaces/fastify';
import UserService, { RegistrationData } from '~/services/UserService';

export default async (app: FastifyInstanceWithView) => {
  app.get('/', (req: FastifyRequest, reply: FastifyReply) => {
    reply.redirect('/auth/login');
  });

  app.get('/login', (req: FastifyRequest, reply: FastifyReplyWithView) => {
    if (req.isAuthenticated()) {
      reply.redirect('/');
      return;
    }

    const csrfToken = reply.generateCsrf();

    reply.auth('login.ejs', {
      title: 'Login',
      csrfToken,
    });
  });

  app.get('/register', (req: FastifyRequest, reply: FastifyReplyWithView) => {
    if (req.isAuthenticated()) {
      reply.redirect('/');
      return;
    }

    const csrfToken = reply.generateCsrf();

    reply.auth('register.ejs', {
      title: 'Create an Account',
      csrfToken,
    });
  });

  app.post('/register', { preValidation: app.csrfProtection }, async (req: FastifyRequest, reply: FastifyReplyWithView) => {
    const registrationData = req.body as RegistrationData;

    try {
      const userService = new UserService();
      await userService.register(registrationData);

      // TODO: log the user in

      return reply.redirect('/');
    }
    catch (error) {
      const csrfToken = reply.generateCsrf();

      return reply.auth('register.ejs', {
        title: 'Create an Account',
        csrfToken,
        error: error.message,
      });
    }
  });

  app.post('/logout', (req: FastifyRequest, reply: FastifyReply) => {
    req.logout();
    reply.redirect('/auth/login');
  });
};
