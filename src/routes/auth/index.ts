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

  app.post<{ Body: RegistrationData }>('/register', async (req: FastifyRequest, reply: FastifyReply) => {
    const registrationData = req.body;

    const userService = new UserService();
    await userService.register(registrationData);

    // TODO: return if there's an error with the view
    // TODO: log the user in

    reply.redirect('/');
  });

  app.post('/logout', (req: FastifyRequest, reply: FastifyReply) => {
    req.logout();
    reply.redirect('/auth/login');
  });
};
